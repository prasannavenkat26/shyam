import { PageShell, PageHeader } from "@/components/landing/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CalendarClock, MapPin, Smartphone } from "lucide-react";

const Pickup = () => (
  <PageShell>
    <PageHeader eyebrow="Schedule pickup" title="Book your e-waste pickup" subtitle="Tell us what you've got — we'll handle the rest." />
    <section className="mx-auto max-w-4xl px-4 pb-24 grid lg:grid-cols-3 gap-6">
      <form onSubmit={(e)=>{e.preventDefault();toast.success("Pickup scheduled! Check your dashboard.");}} className="glass rounded-2xl p-6 lg:col-span-2 space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <div><Label>Full name</Label><Input required /></div>
          <div><Label>Phone</Label><Input required type="tel" /></div>
        </div>
        <div><Label>Pickup address</Label><Input required placeholder="Street, City" /></div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div><Label>Date</Label><Input required type="date" /></div>
          <div><Label>Device category</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="mobile">Mobile / Tablet</SelectItem>
                <SelectItem value="laptop">Laptop / Desktop</SelectItem>
                <SelectItem value="appliance">Home appliance</SelectItem>
                <SelectItem value="battery">Batteries</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div><Label>Device details</Label><Textarea rows={4} placeholder="Brand, quantity, condition..." /></div>
        <Button className="w-full bg-gradient-primary text-primary-foreground glow">Confirm pickup</Button>
      </form>
      <aside className="space-y-3">
        {[{icon:CalendarClock,k:"Flexible windows",v:"Mon–Sat, 9am–8pm"},{icon:MapPin,k:"Live tracking",v:"Real-time collector ETA"},{icon:Smartphone,k:"AI classifier",v:"Snap a photo to auto-detect"}].map((c)=>(
          <div key={c.k} className="glass rounded-2xl p-5"><c.icon className="h-5 w-5 text-primary" /><p className="mt-3 font-semibold text-sm">{c.k}</p><p className="text-sm text-muted-foreground">{c.v}</p></div>
        ))}
      </aside>
    </section>
  </PageShell>
);
export default Pickup;
