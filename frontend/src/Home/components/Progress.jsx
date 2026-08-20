// Footer.jsx - Black "Crafted with Purpose" section with animated counters
import { useEffect, useRef, useState } from 'react';
import { FaCube, FaTools, FaIndustry, FaFileContract } from 'react-icons/fa';

const stats = [
  { id: 1, value: 600, suffix: '+', label: 'Design Combinations', icon: FaCube },
  { id: 2, value: 10000, suffix: '+', label: 'Materials & Finishes', icon: FaTools },
  { id: 3, value: null, display: 'Built for', sub: 'The Industry', label: '', icon: FaIndustry },
  { id: 4, value: null, display: 'Patent-Pending', sub: 'Technology', label: '', icon: FaFileContract },
];

// Counts a number up from 0 to target once the element is visible on screen
function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (target === null) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(target);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return [count, ref];
}

function StatItem({ stat }) {
  const Icon = stat.icon;
  const [count, ref] = useCountUp(stat.value);

  return (
    <div ref={ref} className="flex items-center gap-4">
      <Icon className="text-3xl md:text-4xl text-[#A17C50] shrink-0" />
      <div>
        {stat.value !== null ? (
          <>
            <p className="text-2xl md:text-3xl font-bold text-white tabular-nums">
              {count.toLocaleString()}
              {stat.suffix}
            </p>
            <p className="text-xs md:text-sm text-gray-400">{stat.label}</p>
          </>
        ) : (
          <>
            <p className="text-base md:text-lg font-bold text-white leading-tight">{stat.display}</p>
            <p className="text-xs md:text-sm text-gray-400">{stat.sub}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function Progress() {
  return (
    <section className="w-full px-6 lg:px-16 py-14" style={{ backgroundColor: '#1C1C1C' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left - script heading + description */}
        <div>
          <p className="font-serif italic text-2xl md:text-3xl text-[#A17C50] mb-3">
            Crafted with Purpose
          </p>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-md">
            Born from real industry experience and a passion for design,
            My Elevator Design Studio is redefining the standard for
            elevator interiors.
          </p>
          <button className="mt-5 text-xs font-bold tracking-widest text-white border-b border-[#A17C50] pb-1 hover:text-[#A17C50] transition-colors">
            OUR STORY
          </button>
        </div>

        {/* Right - stats grid with animated counters */}
        <div className="grid grid-cols-2 gap-y-8 gap-x-6">
          {stats.map((stat) => (
            <StatItem key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}