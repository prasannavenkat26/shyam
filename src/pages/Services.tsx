import { PageShell, PageHeader } from "@/components/landing/PageShell";
import { Truck, Building2, GraduationCap, Recycle, Factory, BarChart3 } from "lucide-react";

const services = [
  { icon: Truck, title: "Doorstep pickup", desc: "Schedule e-waste pickups for any device, any time." },
  { icon: Building2, title: "Office programs", desc: "Recurring enterprise pickups with CSR reporting." },
  { icon: GraduationCap, title: "Institution drives", desc: "Campus-wide recycling drives with leaderboards." },
  { icon: Recycle, title: "Certified recycling", desc: "Authorized recyclers with full chain-of-custody." },
  { icon: Factory, title: "Material recovery", desc: "Recovered metals and plastics back into supply chains." },
  { icon: BarChart3, title: "Impact reporting", desc: "Live dashboards and certificates for stakeholders." },
];

const Services = () => (
  <PageShell>
    <PageHeader eyebrow="Services" title="Everything e-waste, end to end" subtitle="From a single phone to enterprise asset disposition — ReLink does it all." />
    <section className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-24">
      {services.map((s) => (
        <div key={s.title} className="glass rounded-2xl p-6 transition-smooth hover:-translate-y-1">
          <div className="h-11 w-11 rounded-xl bg-gradient-primary flex items-center justify-center"><s.icon className="h-5 w-5 text-primary-foreground" /></div>
          <h3 className="mt-4 font-semibold">{s.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
        </div>
      ))}
    </section>
  </PageShell>
);
export default Services;
