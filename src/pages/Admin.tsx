import { PageShell, PageHeader } from "@/components/landing/PageShell";
import { Card } from "@/components/ui/card";
import { Users, Truck, BarChart3, DollarSign } from "lucide-react";

const bars = [40, 65, 50, 80, 72, 95, 88, 76, 90, 82, 100, 92];

const Admin = () => (
  <PageShell>
    <PageHeader eyebrow="Admin panel" title="Network performance & analytics" />
    <section className="mx-auto max-w-7xl px-4 pb-24 space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[{i:Users,k:"Active users",v:"128,402"},{i:Truck,k:"Collectors",v:"3,217"},{i:BarChart3,k:"Pickups (mo)",v:"42,180"},{i:DollarSign,k:"Revenue (mo)",v:"$184k"}].map((s)=>(
          <Card key={s.k} className="glass border-border/60 p-6"><s.i className="h-5 w-5 text-primary" /><p className="mt-3 text-2xl font-bold text-gradient">{s.v}</p><p className="text-sm text-muted-foreground">{s.k}</p></Card>
        ))}
      </div>
      <Card className="glass border-border/60 p-6">
        <h3 className="font-semibold">Pickups · last 12 weeks</h3>
        <div className="mt-6 h-48 flex items-end gap-2">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-t-lg bg-gradient-primary opacity-80 hover:opacity-100 transition-smooth" style={{ height: `${h}%` }} />
          ))}
        </div>
      </Card>
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="glass border-border/60 p-6">
          <h3 className="font-semibold">E-waste heatmap (preview)</h3>
          <div className="mt-4 grid grid-cols-12 gap-1">
            {Array.from({length:96}).map((_,i)=>(
              <div key={i} className="aspect-square rounded-sm" style={{background:`hsl(152 76% ${30 + Math.random()*40}% / ${0.2 + Math.random()*0.8})`}} />
            ))}
          </div>
        </Card>
        <Card className="glass border-border/60 p-6">
          <h3 className="font-semibold">Top recyclers</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {["GreenCycle","EcoLoop","Circular Tech","ReNew Materials"].map((n,i)=>(
              <li key={n} className="flex items-center justify-between"><span>{i+1}. {n}</span><span className="text-primary">{(98 - i*4)}%</span></li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  </PageShell>
);
export default Admin;
