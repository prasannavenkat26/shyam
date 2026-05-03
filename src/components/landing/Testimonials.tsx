const items = [
  { quote: "ReLink turned our office cleanup into a measurable sustainability win — with certificates we now share in our CSR report.", name: "Anika Rao", role: "Head of Sustainability, Northwind Inc." },
  { quote: "I scheduled a pickup in under a minute, the collector arrived next day, and I earned points to gift my kid an eco kit.", name: "Marco Bellini", role: "Resident, Milan" },
  { quote: "The route optimization alone doubled our daily pickups. The dashboard is genuinely a game-changer.", name: "Priya Sharma", role: "Operations Lead, GreenCycle" },
];

export const Testimonials = () => (
  <section className="py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-sm font-medium text-primary uppercase tracking-widest">Loved by changemakers</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Real stories. <span className="text-gradient">Real impact.</span></h2>
      </div>
      <div className="mt-12 grid md:grid-cols-3 gap-4">
        {items.map((t) => (
          <figure key={t.name} className="glass rounded-2xl p-6 flex flex-col">
            <blockquote className="text-sm leading-relaxed text-foreground/90">"{t.quote}"</blockquote>
            <figcaption className="mt-6 pt-6 border-t border-border/50">
              <p className="font-semibold text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);
