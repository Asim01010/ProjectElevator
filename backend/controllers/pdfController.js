import PDFDocument from "pdfkit";
import sharp from "sharp";
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Adjust this to point at your frontend public/ folder ──────────────────
const PUBLIC_DIR = path.resolve(__dirname, "../../client/public");

// ─── Brand constants (matches the reference Forms+Surfaces PDF) ──────────
const BRAND_NAME = "ELEVATOR DESIGN STUDIO";
const BRAND_SUBTITLE = "A FORMS+SURFACES DESIGN TOOL";
const INTRO_TEXT =
  "The following pages provide a complete overview of the elevator interior you designed using the Elevator Design Studio. It includes material and finish information as well as the project-related details you supplied.";
const CONTACT_LINE = "T 1.800.451.0410  |  F 412.385.4715  |  www.forms-surfaces.com";
const COPYRIGHT_LINE = `© ${new Date().getFullYear()} Forms+Surfaces® | All dimensions are nominal. Specifications and pricing subject to change without notice.`;

const PAGE_MARGIN = 40;
const FOOTER_BLOCK_HEIGHT = 46;
const OPENING_LABELS = { 1: "Front", 2: "Straight", 3: "Back" };

// ─── Fetch a buffer — disk for skeleton files, HTTP for S3 ───────────────
async function fetchBuffer(urlOrPath) {
  const staticProxyPattern = /^https?:\/\/[^/]+\/static-proxy(\/.*)/;
  const proxyMatch = urlOrPath.match(staticProxyPattern);

  if (proxyMatch) {
    const relativePath = decodeURIComponent(proxyMatch[1]);
    const filePath = path.join(PUBLIC_DIR, relativePath);

    if (!filePath.startsWith(PUBLIC_DIR)) {
      throw new Error(`Forbidden path: ${filePath}`);
    }
    if (!fs.existsSync(filePath)) {
      throw new Error(`Skeleton file not found: ${filePath}`);
    }
    return fs.promises.readFile(filePath);
  }

  const response = await axios.get(urlOrPath, {
    responseType: "arraybuffer",
    maxRedirects: 5,
    timeout: 15000,
  });
  return Buffer.from(response.data, "binary");
}

// ─── Composite ordered PNG buffers into one image ─────────────────────────
async function compositeBuffers(buffers) {
  if (buffers.length === 0) return null;

  let base = await sharp(buffers[0]).png().toBuffer();
  const { width, height } = await sharp(base).metadata();

  for (let i = 1; i < buffers.length; i++) {
    try {
      const overlay = await sharp(buffers[i])
        .resize(width, height, { fit: "fill", kernel: "lanczos3" })
        .png()
        .toBuffer();

      base = await sharp(base)
        .composite([{ input: overlay, blend: "over" }])
        .png()
        .toBuffer();
    } catch (err) {
      console.warn(`[PDF] Composite failed for layer ${i}:`, err.message);
    }
  }

  return base;
}

// ─── Small helper: fetch + presign a single key (mirrors /api/presign-single) ──
async function presignKey(req, key) {
  try {
    // Reuses the same host so relative-style keys resolve through your existing
    // presign endpoint/logic — swap this for a direct S3 presign call if you'd
    // rather not round-trip through HTTP here.
    const protocol = req.protocol;
    const host = req.get("host");
    const url = `${protocol}://${host}/api/presign-single?key=${encodeURIComponent(key)}`;
    const res = await axios.get(url, { timeout: 15000 });
    return res.data?.url || null;
  } catch (err) {
    console.warn(`[PDF] Presign failed for key: ${key}`, err.message);
    return null;
  }
}

// ─── Date formatting to match "07.09.2026 12:17:24 AM" ────────────────────
function formatRevisionTimestamp(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${month}.${day}.${year} ${pad(hours)}:${minutes}:${seconds} ${ampm}`;
}

// ─── Derive a human-readable label from a stored material keyPrefix ───────
function parseMaterialLabel(keyPrefix = "") {
  const gaf = keyPrefix.match(/GAF-\d{3}/i);
  if (gaf) return gaf[0].toUpperCase();
  if (keyPrefix.includes("goldenLayers")) return "Golden Accent Panel";
  if (keyPrefix.includes("blackLayers")) return "Black Base Panel";
  if (keyPrefix.includes("silverReveals")) return "Silver Reveal";
  if (keyPrefix.includes("blackReveals")) return "Black Reveal";
  return "Custom Finish";
}

// ─── Rebuild the S3 key for a single applied wall-panel material ─────────
function swatchKeyForPanel(applied, panelNum) {
  if (!applied?.keyPrefix) return null;
  if (
    applied.keyPrefix.includes("blackLayers") ||
    applied.keyPrefix.includes("goldenLayers")
  ) {
    return `${applied.keyPrefix}/V1/${panelNum}.png`;
  }
  if (applied.keyPrefix.includes("Reveals")) {
    return `${applied.keyPrefix}/V1/1.png`;
  }
  return `${applied.keyPrefix}/V1/${panelNum}.png`;
}

// ─── Flatten appliedMaterials into per-panel rows ─────────────────────────
function buildPanelRows(appliedMaterials = {}) {
  const rows = [];
  Object.entries(appliedMaterials).forEach(([zone, panels]) => {
    Object.entries(panels || {}).forEach(([panelNum, applied]) => {
      const key = swatchKeyForPanel(applied, panelNum);
      if (!key) return;
      rows.push({ zone, panelNum, label: parseMaterialLabel(applied.keyPrefix), key });
    });
  });
  return rows;
}

// ─── Collect the non-panel elements (handrail, ceiling, floor, light, door) ──
function buildOtherElements({
  appliedHandrail,
  appliedSubHandrail,
  appliedCeiling,
  appliedFloor,
  appliedLight,
  appliedDoor,
}) {
  const items = [];
  if (appliedHandrail)
    items.push({ label: `Handrail — Style ${appliedHandrail}`, key: `SubMaterial/handrails/V1/${appliedHandrail}.png` });
  if (appliedSubHandrail)
    items.push({ label: "Secondary Handrail", key: `SubMaterial/subhandrail/V1/1.png` });
  if (appliedCeiling)
    items.push({ label: `Ceiling — Style ${appliedCeiling}`, key: `SubMaterial/ceiling/V1/${appliedCeiling}.png` });
  if (appliedFloor)
    items.push({ label: `Flooring — Style ${appliedFloor}`, key: `SubMaterial/floor/V1/${appliedFloor}.png` });
  if (appliedLight)
    items.push({ label: `Lighting — Style ${appliedLight}`, key: `SubMaterial/lights/V1/${appliedLight}.png` });
  if (appliedDoor)
    items.push({ label: `Door — Style ${appliedDoor}`, key: `SubMaterial/doors/${appliedDoor}.png` });
  return items;
}

// ─── Group panel rows by unique material key and letter them A, B, C… ────
function buildLetteredGroups(panelRows, otherItems) {
  let letterCode = 65; // 'A'
  const groups = [];
  const groupByKey = {};

  panelRows.forEach((row) => {
    if (!groupByKey[row.key]) {
      const letter = String.fromCharCode(letterCode++);
      groupByKey[row.key] = { letter, label: row.label, key: row.key, refs: [] };
      groups.push(groupByKey[row.key]);
    }
    groupByKey[row.key].refs.push(`${row.zone}${row.panelNum}`);
  });

  const otherGroups = otherItems.map((item) => ({
    letter: String.fromCharCode(letterCode++),
    label: item.label,
    key: item.key,
    refs: [],
  }));

  return { panelGroups: groups, otherGroups };
}

// ══════════════════════════════════════════════════════════════════════════
// Header / footer, drawn identically on every page
// ══════════════════════════════════════════════════════════════════════════
function drawHeader(doc, { projectLabel }) {
  const left = PAGE_MARGIN;
  const top = PAGE_MARGIN;
  const contentWidth = doc.page.width - PAGE_MARGIN * 2;

  doc
    .font("Helvetica")
    .fontSize(26)
    .fillColor("#9a958a")
    .text(BRAND_NAME, left, top, { characterSpacing: 2 });

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#8a8680")
    .text(BRAND_SUBTITLE, left, doc.y + 4, { characterSpacing: 1 });

  const lineY = doc.y + 10;
  doc
    .moveTo(left, lineY)
    .lineTo(left + contentWidth, lineY)
    .lineWidth(1)
    .strokeColor("#c9c4b8")
    .stroke();

  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor("#2C2822")
    .text(projectLabel || "Untitled Project", left, top + 2, {
      width: contentWidth,
      align: "right",
    });

  return lineY + 18; // Y cursor for page content to start at
}

function drawFooter(doc, { pageNum, totalPages, designId, userEmail }) {
  const left = PAGE_MARGIN;
  const contentWidth = doc.page.width - PAGE_MARGIN * 2;
  const bottom = doc.page.height - PAGE_MARGIN;
  const lineY = bottom - FOOTER_BLOCK_HEIGHT;

  doc
    .moveTo(left, lineY)
    .lineTo(left + contentWidth, lineY)
    .lineWidth(0.75)
    .strokeColor("#d9d5c9")
    .stroke();

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor("#8a8680")
    .text(CONTACT_LINE, left, lineY + 8);

  doc
    .font("Helvetica")
    .fontSize(7.5)
    .fillColor("#8a8680")
    .text(
      `${COPYRIGHT_LINE}${userEmail ? "  " + userEmail : ""}`,
      left,
      lineY + 20
    );

  doc
    .font("Helvetica")
    .fontSize(7.5)
    .fillColor("#8a8680")
    .text(`design # ${designId || "N/A"}`, left, lineY + 34);

  doc
    .font("Helvetica")
    .fontSize(7.5)
    .fillColor("#8a8680")
    .text(
      `Page ${pageNum} of ${totalPages} | Rev. ${formatRevisionTimestamp()}`,
      left,
      lineY + 34,
      { width: contentWidth, align: "right" }
    );
}

// ─── Left-hand labeled info block used on pages 1-3 ───────────────────────
function drawInfoBlock(doc, x, y, width, sections) {
  let cursor = y;
  sections.forEach((section) => {
    doc
      .font("Helvetica-Bold")
      .fontSize(8.5)
      .fillColor("#2C2822")
      .text(section.heading, x, cursor, { width });
    cursor = doc.y + 3;

    (section.lines || []).forEach((line) => {
      doc
        .font("Helvetica")
        .fontSize(8.5)
        .fillColor("#5C4A26")
        .text(line || "", x, cursor, { width });
      cursor = doc.y + 2;
    });

    cursor += 9;
  });
  return cursor;
}

// ══════════════════════════════════════════════════════════════════════════
// Pages 1–3: one per view (Front / Straight / Back)
// ══════════════════════════════════════════════════════════════════════════
async function drawDetailPage(doc, opts) {
  const {
    projectLabel,
    imageBuffer,
    infoSections,
    pageNum,
    totalPages,
    designId,
    userEmail,
  } = opts;

  doc.addPage({ size: "A4", margin: 0 });

  let cursorY = drawHeader(doc, { projectLabel });
  const left = PAGE_MARGIN;
  const contentWidth = doc.page.width - PAGE_MARGIN * 2;

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#5C4A26")
    .text(INTRO_TEXT, left, cursorY, { width: contentWidth, lineGap: 2 });

  cursorY = doc.y + 18;

  const infoColWidth = 150;
  const gap = 20;
  const imageColX = left + infoColWidth + gap;
  const imageColWidth = contentWidth - infoColWidth - gap;
  const footerTop = doc.page.height - PAGE_MARGIN - FOOTER_BLOCK_HEIGHT;
  const availableHeight = footerTop - cursorY - 10;

  drawInfoBlock(doc, left, cursorY, infoColWidth, infoSections);

  if (imageBuffer) {
    doc.image(imageBuffer, imageColX, cursorY, {
      fit: [imageColWidth, availableHeight],
      align: "center",
      valign: "top",
    });
  }

  drawFooter(doc, { pageNum, totalPages, designId, userEmail });
}

// ══════════════════════════════════════════════════════════════════════════
// Page 4: Configuration Overview grid (all swatches, lettered)
// ══════════════════════════════════════════════════════════════════════════
async function drawOverviewGridPage(doc, opts) {
  const { req, projectLabel, panelGroups, otherGroups, pageNum, totalPages, designId, userEmail } = opts;

  doc.addPage({ size: "A4", margin: 0 });
  let cursorY = drawHeader(doc, { projectLabel });
  const left = PAGE_MARGIN;
  const contentWidth = doc.page.width - PAGE_MARGIN * 2;

  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#2C2822")
    .text("CONFIGURATION OVERVIEW", left, cursorY, { characterSpacing: 1 });
  cursorY = doc.y + 14;

  const allGroups = [...panelGroups, ...otherGroups];
  const cols = 4;
  const cellWidth = (contentWidth - (cols - 1) * 16) / cols;
  const swatchSize = cellWidth - 10;

  let x = left;
  let y = cursorY;
  let colIndex = 0;

  for (const group of allGroups) {
    const swatchUrl = await presignKey(req, group.key);
    let buffer = null;
    if (swatchUrl) {
      try {
        buffer = await fetchBuffer(swatchUrl);
      } catch (err) {
        console.warn(`[PDF] Overview swatch fetch failed for ${group.key}:`, err.message);
      }
    }

    if (buffer) {
      try {
        doc.image(buffer, x, y, { fit: [swatchSize, swatchSize] });
      } catch (err) {
        console.warn(`[PDF] Overview swatch render failed:`, err.message);
      }
    } else {
      doc.rect(x, y, swatchSize, swatchSize).fillAndStroke("#f2efe6", "#d9d5c9");
    }

    doc
      .font("Helvetica-Bold")
      .fontSize(8.5)
      .fillColor("#2C2822")
      .text(`${group.letter} — ${group.label}`, x, y + swatchSize + 4, { width: cellWidth });

    if (group.refs.length) {
      doc
        .font("Helvetica")
        .fontSize(7.5)
        .fillColor("#8a8680")
        .text(`Panels: ${group.refs.join(", ")}`, x, doc.y + 1, { width: cellWidth });
    }

    colIndex++;
    if (colIndex >= cols) {
      colIndex = 0;
      x = left;
      y += swatchSize + 46;
    } else {
      x += cellWidth + 16;
    }
  }

  if (allGroups.length === 0) {
    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor("#8a8680")
      .text("No wall panel finishes or other elements were selected for this design.", left, cursorY + 10);
  }

  drawFooter(doc, { pageNum, totalPages, designId, userEmail });
}

// ══════════════════════════════════════════════════════════════════════════
// Pages 5–6: large closeups of the same lettered swatches, split across two pages
// ══════════════════════════════════════════════════════════════════════════
async function drawCloseupPage(doc, opts) {
  const { req, projectLabel, groups, pageNum, totalPages, designId, userEmail } = opts;

  doc.addPage({ size: "A4", margin: 0 });
  let cursorY = drawHeader(doc, { projectLabel });
  const left = PAGE_MARGIN;
  const contentWidth = doc.page.width - PAGE_MARGIN * 2;

  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#2C2822")
    .text("CONFIGURATION OVERVIEW", left, cursorY, { characterSpacing: 1 });
  cursorY = doc.y + 16;

  const footerTop = doc.page.height - PAGE_MARGIN - FOOTER_BLOCK_HEIGHT;
  const rowHeight = (footerTop - cursorY - 20) / Math.max(groups.length, 1);
  const imageWidth = 260;

  let y = cursorY;

  if (groups.length === 0) {
    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor("#8a8680")
      .text("No additional finishes to display on this page.", left, y);
  }

  for (const group of groups) {
    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor("#2C2822")
      .text(`${group.letter} : ${group.refs.length ? "Panels " + group.refs.join(", ") : "All"}`, left, y);

    doc
      .font("Helvetica")
      .fontSize(8.5)
      .fillColor("#5C4A26")
      .text(`Material: ${group.label}`, left, doc.y + 2);

    const swatchUrl = await presignKey(req, group.key);
    let buffer = null;
    if (swatchUrl) {
      try {
        buffer = await fetchBuffer(swatchUrl);
      } catch (err) {
        console.warn(`[PDF] Closeup fetch failed for ${group.key}:`, err.message);
      }
    }

    const imageY = y;
    if (buffer) {
      try {
        doc.image(buffer, left, imageY, { fit: [imageWidth, rowHeight - 20], align: "center" });
      } catch (err) {
        console.warn(`[PDF] Closeup render failed:`, err.message);
      }
    } else {
      doc.rect(left, imageY, imageWidth, rowHeight - 20).fillAndStroke("#f2efe6", "#d9d5c9");
    }

    y += rowHeight;
  }

  drawFooter(doc, { pageNum, totalPages, designId, userEmail });
}

// ══════════════════════════════════════════════════════════════════════════
// Main handler
// ══════════════════════════════════════════════════════════════════════════
export const generateModelPDF = async (req, res) => {
  try {
    const {
      imageUrlsGroups,
      modelName,
      projectName,
      selectedView,
      dimensions = {},
      jobType,
      elevatorType,
      cabShellMaterial,
      quantity,
      comments,
      designId,
      userEmail,
      appliedMaterials = {},
      appliedHandrail,
      appliedSubHandrail,
      appliedCeiling,
      appliedFloor,
      appliedLight,
      appliedDoor,
    } = req.body;

    if (!imageUrlsGroups || imageUrlsGroups.length === 0) {
      return res.status(400).json({ message: "No image groups provided" });
    }

    const viewGroups = imageUrlsGroups.slice(0, 3);
    const viewLabels = ["Front View", "Side View", "Back View"];
    const projectLabel = projectName ? `${projectName} - ${modelName || "Custom"}` : modelName || "Custom";

    // Pre-composite the 3 detail-page images
    const compositeImages = [];
    for (let i = 0; i < viewGroups.length; i++) {
      const urls = viewGroups[i];
      const results = await Promise.allSettled(urls.map((url) => fetchBuffer(url)));
      const buffers = results.filter((r) => r.status === "fulfilled").map((r) => r.value);
      compositeImages.push(buffers.length ? await compositeBuffers(buffers) : null);
    }

    // Build the lettered configuration-overview groups from applied materials
    const panelRows = buildPanelRows(appliedMaterials);
    const otherItems = buildOtherElements({
      appliedHandrail,
      appliedSubHandrail,
      appliedCeiling,
      appliedFloor,
      appliedLight,
      appliedDoor,
    });
    const { panelGroups, otherGroups } = buildLetteredGroups(panelRows, otherItems);
    const allGroups = [...panelGroups, ...otherGroups];
    const mid = Math.ceil(allGroups.length / 2);
    const closeupBatch1 = allGroups.slice(0, mid);
    const closeupBatch2 = allGroups.slice(mid);

    const totalPages = viewGroups.length + 3; // 3 detail + grid + 2 closeup pages

    const doc = new PDFDocument({ autoFirstPage: false });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${(modelName || "Elevator-Design").replace(/[^a-z0-9\-_]/gi, "_")}.pdf"`
    );
    doc.pipe(res);

    // ── Pages 1–3: detail pages ──
    for (let i = 0; i < viewGroups.length; i++) {
      const openingOption = OPENING_LABELS[selectedView] || OPENING_LABELS[i + 1] || "Front";

      const infoSections = [
        { heading: "Configuration", lines: [modelName || "—"] },
        { heading: "Opening Option", lines: [openingOption] },
        {
          heading: "Dimensions",
          lines: [
            `D1: ${dimensions.D1 || ""}`,
            `W1: ${dimensions.W1 || ""}`,
            `H1: ${dimensions.H1 || ""}`,
            `H2: ${dimensions.H2 || ""}`,
          ],
        },
        {
          heading: "Additional Details",
          lines: [
            `Job Type: ${jobType || ""}`,
            `Elevator Type: ${elevatorType || ""}`,
            `Cab Shell Material: ${cabShellMaterial || ""}`,
            `Quantity: ${quantity || 1}`,
          ],
        },
        {
          heading: "Comments:",
          lines: comments ? comments.split("\n") : [""],
        },
      ];

      await drawDetailPage(doc, {
        projectLabel,
        imageBuffer: compositeImages[i],
        infoSections,
        pageNum: i + 1,
        totalPages,
        designId,
        userEmail,
      });
    }

    // ── Page 4: overview grid ──
    await drawOverviewGridPage(doc, {
      req,
      projectLabel,
      panelGroups,
      otherGroups,
      pageNum: viewGroups.length + 1,
      totalPages,
      designId,
      userEmail,
    });

    // ── Pages 5–6: closeups ──
    await drawCloseupPage(doc, {
      req,
      projectLabel,
      groups: closeupBatch1,
      pageNum: viewGroups.length + 2,
      totalPages,
      designId,
      userEmail,
    });

    await drawCloseupPage(doc, {
      req,
      projectLabel,
      groups: closeupBatch2,
      pageNum: viewGroups.length + 3,
      totalPages,
      designId,
      userEmail,
    });

    doc.end();
  } catch (error) {
    console.error("[PDF] Generation error:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Failed to generate PDF", error: error.message });
    }
  }
};