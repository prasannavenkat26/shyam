import { PageShell, PageHeader } from "@/components/landing/PageShell";
import { Leaf, Globe2, Users } from "lucide-react";

const About = () => (
  <PageShell>
    <PageHeader eyebrow="About ReLink" title="Closing the loop on electronic waste" subtitle="ReLink is a sustainability-tech platform born from one belief: every device deserves a second life, and every recycler deserves transparency." />
    <section className="mx-auto max-w-5xl px-4 grid md:grid-cols-3 gap-4 pb-20">
      {[
        { icon: Leaf, title: "Mission", body: "Make responsible recycling effortless, transparent and rewarding for everyone." },
        { icon: Globe2, title: "Vision", body: "A circular electronics economy powering smart, sustainable cities worldwide." },
        { icon: Users, title: "Team", body: "Engineers, sustainability scientists, and city-scale logistics operators." },
      ].map((c) => (
        <div key={c.title} className="glass rounded-2xl p-6">
          <c.icon className="h-6 w-6 text-primary" />
          <h3 className="mt-3 font-semibold">{c.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
        </div>
      ))}
    </section>
  </PageShell>
);
export default About;
