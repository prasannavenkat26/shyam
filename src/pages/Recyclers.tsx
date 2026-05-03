import { PageShell, PageHeader } from "@/components/landing/PageShell";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, ShieldCheck, Star } from "lucide-react";

const recyclers = [
  { name: "GreenCycle Industries", city: "Bengaluru", rating: 4.9, certs: ["CPCB", "ISO 14001"] },
  { name: "EcoLoop Recyclers", city: "Mumbai", rating: 4.8, certs: ["CPCB", "R2"] },
  { name: "ReNew Materials", city: "Delhi", rating: 4.7, certs: ["CPCB"] },
  { name: "Circular Tech Co", city: "Pune", rating: 4.9, certs: ["R2", "ISO 14001"] },
  { name: "PlanetWorks", city: "Hyderabad", rating: 4.6, certs: ["CPCB"] },
  { name: "Zero-E Solutions", city: "Chennai", rating: 4.8, certs: ["R2"] },
];

const Recyclers = () => (
  <PageShell>
    <PageHeader eyebrow="Directory" title="Certified recyclers near you" subtitle="Browse vetted, authorized recyclers. Filter by city or certification." />
    <section className="mx-auto max-w-7xl px-4 pb-24">
      <Input placeholder="Search by city or name..." className="max-w-md mx-auto mb-10" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recyclers.map((r) => (
          <div key={r.name} className="glass rounded-2xl p-6 transition-smooth hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{r.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {r.city}</p>
              </div>
              <span className="flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-primary text-primary" /> {r.rating}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {r.certs.map((c) => (
                <Badge key={c} variant="outline" className="border-primary/40 text-primary"><ShieldCheck className="h-3 w-3 mr-1" />{c}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  </PageShell>
);
export default Recyclers;
