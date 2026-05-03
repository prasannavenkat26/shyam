import { Star, Trophy, Gift, Crown } from "lucide-react";

const tiers = [
  { icon: Star, name: "Eco Seedling", points: "0 – 500", perks: "Welcome rewards, eco tips, badge" },
  { icon: Trophy, name: "Green Guardian", points: "500 – 2,500", perks: "10% partner discounts, free pickups" },
  { icon: Gift, name: "Planet Hero", points: "2,500 – 10k", perks: "Exclusive merch, donation matching" },
  { icon: Crown, name: "Earth Champion", points: "10k+", perks: "Carbon offset gifts, VIP events" },
];

export const Rewards = () => (
  <section className="py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-sm font-medium text-primary uppercase tracking-widest">Rewards</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Recycle. Earn. <span className="text-gradient">Repeat.</span></h2>
        <p className="mt-4 text-muted-foreground">Every kilogram recycled earns ReLink points — redeem with eco-brand partners or donate to climate causes.</p>
      </div>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiers.map((t, i) => (
          <div key={t.name} className="glass rounded-2xl p-6 transition-smooth hover:-translate-y-1 hover:glow">
            <div className="h-12 w-12 rounded-2xl bg-gradient-primary flex items-center justify-center">
              <t.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="mt-4 font-semibold">{t.name}</h3>
            <p className="mt-1 text-xs text-primary">{t.points} pts</p>
            <p className="mt-3 text-sm text-muted-foreground">{t.perks}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
