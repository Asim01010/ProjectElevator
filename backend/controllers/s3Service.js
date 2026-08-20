  import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
  import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
  import { s3 } from "../config/s3.js";

  // Get ALL images under a given prefix with presigned URLs
// s3Service.js - Replace getImagesByPrefix with this
export const getImagesByPrefix = async (prefix) => {
  try {
    const normalizedPrefix = prefix.endsWith("/") ? prefix : `${prefix}/`;
    let images = [];
    let continuationToken = undefined;
    let page = 1;

    do {
      console.log(`[S3] Fetching page ${page} for prefix: ${normalizedPrefix}`);

      const listCommand = new ListObjectsV2Command({
        Bucket: process.env.S3_BUCKET_NAME,
        Prefix: normalizedPrefix,
        ContinuationToken: continuationToken,
      });

      const data = await s3.send(listCommand);

      console.log(`[S3] Page ${page}: KeyCount=${data.KeyCount}, IsTruncated=${data.IsTruncated}`);

      if (data.Contents && data.Contents.length > 0) {
        const pageImages = await Promise.all(
          data.Contents.filter((obj) => obj.Key.endsWith(".png")).map(async (obj) => {
            const getCommand = new GetObjectCommand({
              Bucket: process.env.S3_BUCKET_NAME,
              Key: obj.Key,
            });
            const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
            return { key: obj.Key, url };
          })
        );
        images = [...images, ...pageImages];
      }

      continuationToken = data.NextContinuationToken;
      page++;
    } while (continuationToken);

    console.log(`[S3] Total images fetched: ${images.length}`);

    return images;
  } catch (error) {
    console.error(`[S3 ERROR] Prefix "${prefix}":`, error.name, error.message);
    throw error;
  }
};

  // Keep the old function for backward compatibility (Model_1)
export const getModelImages = async () => {
  return getImagesByPrefix("Designs/");
};

  // Single key presign (unchanged)
  export const getPresignedUrl = async (key) => {
    try {
      const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
      });

      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      return { url };
    } catch (error) {
      console.error(`Presign error for key ${key}:`, error);
      throw error;
    }
  };
// s3Service.js

// ✅ NEW: Fetch images for only one DESIGN folder
export const getDesignImages = async (designNum) => {
  const prefix = `Designs/DESIGN ${designNum}/`;

  try {
    const normalizedPrefix = prefix.endsWith("/") ? prefix : `${prefix}/`;
    let images = [];
    let continuationToken = undefined;
    let page = 1;

    do {
      console.log(`[S3] Fetching DESIGN ${designNum} - Page ${page}`);

      const listCommand = new ListObjectsV2Command({
        Bucket: process.env.S3_BUCKET_NAME,
        Prefix: normalizedPrefix,
        ContinuationToken: continuationToken,
      });

      const data = await s3.send(listCommand);

      if (data.Contents && data.Contents.length > 0) {
        const pageImages = await Promise.all(
          data.Contents
            .filter((obj) => obj.Key.endsWith(".png"))
            .map(async (obj) => {
              const getCommand = new GetObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: obj.Key,
              });
              const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
              return { key: obj.Key, url };
            })
        );
        images = [...images, ...pageImages];
      }

      continuationToken = data.NextContinuationToken;
      page++;
    } while (continuationToken);

    console.log(`✅ DESIGN ${designNum} loaded: ${images.length} images`);
    return images;
  } catch (error) {
    console.error(`[S3 ERROR] DESIGN ${designNum}:`, error);
    throw error;
  }
};