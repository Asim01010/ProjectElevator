const GradientGallery = () => {
const gradients = [
  // ===== Navy & Silver =====
  "bg-gradient-to-br from-[#06152B] via-[#0B2748] to-[#A3AFBF]",
  "bg-gradient-to-br from-[#041421] via-[#0D3556] to-[#D6DCE5]",
  "bg-gradient-to-r from-[#071A2F] via-[#204A70] to-[#BCC5D2]",
  "bg-gradient-to-tr from-[#020817] via-[#12345B] to-[#E5E7EB]",
  "bg-gradient-to-br from-[#081A2D] via-[#1C4367] to-[#9CA8B7]",
  "bg-gradient-to-r from-[#031223] via-[#1D3E63] to-[#C8D0DA]",
  "bg-gradient-to-br from-[#0A1B2F] via-[#294F74] to-[#EEF2F7]",
  "bg-gradient-to-r from-[#07172B] via-[#2F5C83] to-[#D4D9E1]",
  "bg-gradient-to-tr from-[#04101F] via-[#315A84] to-[#B7C2D0]",
  "bg-gradient-to-br from-[#021321] via-[#204A76] to-[#F4F6F9]",

  // ===== Luxury Brown =====
  "bg-gradient-to-br from-[#3E2723] via-[#6D4C41] to-[#D7CCC8]",
  "bg-gradient-to-r from-[#4E342E] via-[#8D6E63] to-[#EFEBE9]",
  "bg-gradient-to-br from-[#5D4037] via-[#A1887F] to-[#F5F5F5]",
  "bg-gradient-to-tr from-[#6D4C41] via-[#BCAAA4] to-[#FAF7F2]",
  "bg-gradient-to-r from-[#4B2E2A] via-[#8B6B61] to-[#E9DDD6]",

  // ===== Wood & Walnut =====
  "bg-gradient-to-br from-[#4E342E] via-[#795548] to-[#D7CCC8]",
  "bg-gradient-to-r from-[#5C4033] via-[#A67B5B] to-[#F3E9DC]",
  "bg-gradient-to-br from-[#654321] via-[#B08968] to-[#F8F1E7]",
  "bg-gradient-to-tr from-[#7B4F35] via-[#C19A6B] to-[#FFF8F0]",
  "bg-gradient-to-r from-[#593C2C] via-[#B68D5A] to-[#F4EDE4]",

  // ===== Champagne Gold =====
  "bg-gradient-to-br from-[#7B6A58] via-[#CBB68A] to-[#FFF8E7]",
  "bg-gradient-to-r from-[#8C7853] via-[#D6C49B] to-[#FDF6EC]",
  "bg-gradient-to-br from-[#9F8B6D] via-[#E3D5B8] to-[#FFFFFF]",
  "bg-gradient-to-tr from-[#B08D57] via-[#E8D9B5] to-[#FFFDF8]",
  "bg-gradient-to-r from-[#8B7355] via-[#DCCCA3] to-[#FAF8F2]",

  // ===== Beige & Cream =====
  "bg-gradient-to-br from-[#F5F1EA] via-[#E8DDD0] to-[#D8C3A5]",
  "bg-gradient-to-r from-[#FFFDF8] via-[#F3E8D5] to-[#D9C2A3]",
  "bg-gradient-to-br from-[#FCF9F5] via-[#EADBC8] to-[#CBB89D]",
  "bg-gradient-to-tr from-[#FFF8F0] via-[#EAD7C0] to-[#C8AD7F]",
  "bg-gradient-to-r from-[#FDFBF7] via-[#E8DCC8] to-[#BFA58A]",

  // ===== Modern Stone =====
  "bg-gradient-to-br from-[#F8F9FA] via-[#DADDE2] to-[#A9B4C2]",
  "bg-gradient-to-r from-[#FFFFFF] via-[#E6E8EB] to-[#BEC7D0]",
  "bg-gradient-to-br from-[#F5F6F8] via-[#D3D8DE] to-[#9EAAB8]",
  "bg-gradient-to-tr from-[#FAFAFA] via-[#E3E7EC] to-[#B0BAC5]",
  "bg-gradient-to-r from-[#FFFFFF] via-[#EEF2F5] to-[#CBD5DF]",

  // ===== Soft Luxury =====
  "bg-gradient-to-br from-[#FFFDFB] via-[#F6EFE7] to-[#CBB79C]",
  "bg-gradient-to-r from-[#FDFCF9] via-[#EEE2D3] to-[#BFA183]",
  "bg-gradient-to-br from-[#FFF8F5] via-[#F4E5D5] to-[#C59D7B]",
  "bg-gradient-to-tr from-[#FAF7F3] via-[#EEDCC9] to-[#B58C67]",
  "bg-gradient-to-r from-[#FFFCF8] via-[#F0E2D0] to-[#C7A27C]",
];

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="mb-8 text-4xl font-bold text-slate-800">
        Premium Navy & Silver Gradients
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {gradients.map((gradient, index) => (
          <div
            key={index}
            className={`${gradient} h-60 rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-[0_30px_60px_rgba(0,0,0,0.35)]`}
          >
            <div className="flex h-full items-end rounded-3xl bg-black/10 p-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Gradient {index + 1}
                </h2>
                <p className="mt-2 text-sm text-gray-200">
                  Dark Navy • Silver • Enterprise
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradientGallery;