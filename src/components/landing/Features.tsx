import { Brain, BarChart3, Calendar, Award, Trophy, QrCode, MapPin, Recycle, Truck, ShieldCheck, Bell, Bot, Leaf } from "lucide-react";

const features = [
  { icon: Brain, title: "AI Health Analysis", desc: "Get personalized health insights powered by AI." },
  { icon: BarChart3, title: "Real-Time Monitoring", desc: "Track your health metrics in real-time with advanced analytics." },
  { icon: Calendar, title: "Appointment Scheduling", desc: "Easily manage and schedule your medical appointments." },
  { icon: Award, title: "Medical Reports & Insights", desc: "Access detailed medical reports and actionable insights." },
];

export const Features = () => (
  <section className="py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-primary uppercase tracking-widest">Features</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
          Transforming <span className="text-gradient">Healthcare with AI</span>
        </h2>
        <p className="mt-4 text-muted-foreground">Discover the power of AI-driven healthcare solutions for a healthier future.</p>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div key={f.title} className="glass rounded-2xl p-6 transition-smooth hover:-translate-y-1 hover:shadow-lg group" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center glow group-hover:animate-glow-pulse">
              <f.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const HowItWorks = () => {
  const steps = [
    { icon: Recycle, title: "Book pickup", desc: "Add devices, photos and pickup time in seconds." },
    { icon: Truck, title: "Collector arrives", desc: "Verified collector verifies via QR and picks up." },
    { icon: ShieldCheck, title: "Certified recycling", desc: "Authorized recycler safely processes materials." },
    { icon: Leaf, title: "Earn & track impact", desc: "Get reward points and a transparent impact report." },
  ];
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">How it works</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            From doorstep to <span className="text-gradient">circular economy</span>
          </h2>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {steps.map((s, i) => (
            <div key={s.title} className="relative glass rounded-2xl p-6">
              <span className="absolute top-4 right-4 text-5xl font-bold text-primary/10">0{i + 1}</span>
              <div className="h-11 w-11 rounded-xl bg-gradient-primary flex items-center justify-center">
                <s.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
