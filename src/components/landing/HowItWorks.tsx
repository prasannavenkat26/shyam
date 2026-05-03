import { CheckCircle } from "lucide-react";

const steps = [
  { step: 1, title: "Sign Up", desc: "Create your account to get started with our AI healthcare platform." },
  { step: 2, title: "Monitor Your Health", desc: "Track your health metrics in real-time with our advanced tools." },
  { step: 3, title: "Book Appointments", desc: "Schedule appointments with healthcare professionals easily." },
  { step: 4, title: "Get Insights", desc: "Receive detailed medical reports and actionable insights." },
];

export const HowItWorks = () => (
  <section className="py-24 bg-muted">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-primary uppercase tracking-widest">How It Works</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
          Your journey to better health
        </h2>
        <p className="mt-4 text-muted-foreground">
          Follow these simple steps to start your personalized healthcare experience.
        </p>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s) => (
          <div key={s.step} className="glass rounded-2xl p-6 text-center transition-smooth hover:-translate-y-1 hover:shadow-lg">
            <div className="h-12 w-12 mx-auto rounded-full bg-gradient-primary flex items-center justify-center glow">
              <CheckCircle className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Step {s.step}: {s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);