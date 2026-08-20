// Process.jsx - "A Better Way to Design, Build & Deliver" cards section
const cards = [
  {
    title: '(Users) ARCHITECTS & CONSULTANTS',
    desc: 'Design stunning spaces with confidence.',
    img: 'Elevators/V1/GAF-001v2.jpg',
  },
  {
    title: 'FABRICATORS',
    desc: 'Win more projects and streamline production.',
    img: 'Elevators/V1/GAF-004 v2.jpg',
  },
  {
    title: 'SUPPLIERS',
    desc: 'Get your products specified and chosen more often.',
    img: 'Elevators/V1/GAF-005 v2.jpg',
  },
];

export default function Process() {
  return (
    <section className="w-full py-14 px-6 lg:px-16" style={{ backgroundColor: '#F2EFE8' }}>
      <div className="max-w-7xl mx-auto">
        {/* small heading */}
        <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-[#A17C50] mb-3">
          One Platform. Everyone Connected.
        </p>

        {/* big heading */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-[#2A2520] mb-10">
          A Better Way to Design,
          <br />
          Build &amp; Deliver Elevator Interiors.
        </h2>

        {/* Three perfectly centered cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {cards.map((card, idx) => (
            <div key={idx} className="flex flex-col w-full rounded-md overflow-hidden bg-white shadow-sm">
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-40 object-cover"
              />
              <div className="flex flex-col flex-1 p-5">
                <h3 className="font-bold text-sm text-[#2A2520] mb-1.5">{card.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{card.desc}</p>
                <button className="group flex items-center gap-2 text-xs font-bold tracking-wide text-[#1C1C1C] w-fit">
                  LEARN MORE
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}