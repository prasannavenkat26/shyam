import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 54000, suffix: "+", label: "Tonnes recycled" },
  { value: 128000, suffix: "+", label: "Active users" },
  { value: 1240, suffix: "", label: "Certified partners" },
  { value: 96, suffix: "%", label: "Material recovery" },
];

const useCounter = (target: number, active: boolean) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return v;
};

const Stat = ({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) => {
  const v = useCounter(value, active);
  return (
    <div className="glass rounded-2xl p-6 text-center transition-smooth hover:-translate-y-1">
      <p className="text-3xl sm:text-4xl font-bold text-gradient">{v.toLocaleString()}{suffix}</p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export const Stats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setActive(true), { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section ref={ref} className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => <Stat key={s.label} {...s} active={active} />)}
      </div>
    </section>
  );
};
