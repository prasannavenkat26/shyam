import { PageShell, PageHeader } from "@/components/landing/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, DollarSign, MapPin, QrCode, CheckCircle2 } from "lucide-react";

const Collector = () => (
  <PageShell>
    <PageHeader eyebrow="Collector dashboard" title="Today's pickups & earnings" />
    <section className="mx-auto max-w-7xl px-4 pb-24 space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        {[{i:Truck,k:"Pickups today",v:"14"},{i:DollarSign,k:"Earnings (week)",v:"$842"},{i:MapPin,k:"Optimized km",v:"38 km"}].map((s)=>(
          <Card key={s.k} className="glass border-border/60 p-6"><s.i className="h-5 w-5 text-primary" /><p className="mt-3 text-2xl font-bold text-gradient">{s.v}</p><p className="text-sm text-muted-foreground">{s.k}</p></Card>
        ))}
      </div>
      <Card className="glass border-border/60 p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Route queue</h3>
          <Button size="sm" variant="outline">Optimize route</Button>
        </div>
        <ul className="mt-4 divide-y divide-border/60">
          {[
            { addr: "12 Park Ave, Sector 5", w: "Laptops × 3", s: "Next" },
            { addr: "84 Linden Rd", w: "Mixed e-waste", s: "Queued" },
            { addr: "Garden Heights, Tower B", w: "Appliances", s: "Queued" },
            { addr: "King St 220", w: "Mobile devices", s: "Queued" },
          ].map((r, i) => (
            <li key={i} className="py-3 flex items-center justify-between text-sm gap-3">
              <span className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" />{r.addr}</span>
              <span className="text-muted-foreground hidden sm:inline">{r.w}</span>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost"><QrCode className="h-4 w-4" /></Button>
                <Button size="sm" className="bg-gradient-primary text-primary-foreground"><CheckCircle2 className="h-4 w-4 mr-1" />Verify</Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  </PageShell>
);
export default Collector;
