// Features.jsx - Three highlight boxes
import { FaLightbulb, FaIndustry, FaBoxOpen, FaArrowRight } from 'react-icons/fa';

const boxes = [
  {
    title: 'GET INSPIRED',
    desc: 'Explore stunning elevator interiors and trend ideas.',
    icon: FaLightbulb,
    bg: '#E8DCC4',
    text: '#2A2520',
    iconBg: 'rgba(42,37,32,0.08)',
  },
  {
    title: 'FOR FABRICATORS',
    desc: 'Access projects, review specs and submit pricing.',
    icon: FaIndustry,
    bg: '#1C1C1C',
    text: '#FFFFFF',
    iconBg: 'rgba(255,255,255,0.1)',
  },
  {
    title: 'FOR SUPPLIERS',
    desc: 'Showcase your products, get leads and grow.',
    icon: FaBoxOpen,
    bg: '#A17C50',
    text: '#FFFFFF',
    iconBg: 'rgba(255,255,255,0.15)',
  },
];

export default function Features() {
  return (
    <section className="w-full py-10 px-6 lg:px-16" style={{ backgroundColor: '#F2EFE8' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        {boxes.map((box, idx) => {
          const Icon = box.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-5 p-6 rounded-md transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-lg cursor-pointer"
              style={{ backgroundColor: box.bg, color: box.text }}
            >
              {/* icon child */}
              <div
                className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-xl"
                style={{ backgroundColor: box.iconBg }}
              >
                <Icon />
              </div>

              {/* text + arrow child */}
              <div className="flex-1">
                <h3 className="font-bold text-sm tracking-wide mb-1">{box.title}</h3>
                <p className="text-xs opacity-80 leading-relaxed mb-2">{box.desc}</p>
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}