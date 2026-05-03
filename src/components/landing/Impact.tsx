import { Globe2, Leaf, Target } from "lucide-react";

export const Impact = () => (
  <section className="py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="glass rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden />
        <div className="relative p-8 sm:p-12 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-widest">Sustainability</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Aligned with <span className="text-gradient">UN SDG 11 & 12</span></h2>
            <p className="mt-4 text-muted-foreground">We power smart, sustainable cities through responsible consumption and production — closing the loop on electronic waste.</p>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {[
                { icon: Globe2, k: "Cities served", v: "42" },
                { icon: Leaf, k: "CO₂ avoided", v: "1.2M kg" },
                { icon: Target, k: "Recovery rate", v: "96%" },
              ].map((s) => (
                <div key={s.k} className="rounded-xl bg-muted/40 border border-border/60 p-4">
                  <s.icon className="h-4 w-4 text-primary" />
                  <p className="mt-2 text-xl font-bold">{s.v}</p>
                  <p className="text-xs text-muted-foreground">{s.k}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-72 lg:h-96">
            <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-20 blur-3xl" />
            <div className="relative h-full w-full rounded-2xl glass flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 grid-pattern opacity-50" />
              <div className="relative h-56 w-56 rounded-full border border-primary/40 animate-spin-slow flex items-center justify-center">
                <div className="h-40 w-40 rounded-full border border-secondary/40 flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-gradient-primary glow animate-glow-pulse flex items-center justify-center">
                    <Globe2 className="h-10 w-10 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
