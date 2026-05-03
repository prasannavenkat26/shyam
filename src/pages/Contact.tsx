import { PageShell, PageHeader } from "@/components/landing/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

const Contact = () => (
  <PageShell>
    <PageHeader eyebrow="Contact" title="Let's talk recycling" subtitle="Whether you're an enterprise, recycler or curious citizen — we'd love to chat." />
    <section className="mx-auto max-w-5xl px-4 grid md:grid-cols-2 gap-6 pb-24">
      <div className="glass rounded-2xl p-6 space-y-4">
        {[{icon:Mail,k:"hello@relink.eco"},{icon:Phone,k:"+1 (415) 000-0000"},{icon:MapPin,k:"Stockholm · Bengaluru · NYC"}].map((c)=>(
          <div key={c.k} className="flex items-center gap-3"><span className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center"><c.icon className="h-4 w-4 text-primary-foreground" /></span><span className="text-sm">{c.k}</span></div>
        ))}
      </div>
      <form className="glass rounded-2xl p-6 space-y-4" onSubmit={(e)=>{e.preventDefault();toast.success("Thanks! We'll be in touch shortly.");}}>
        <div className="grid sm:grid-cols-2 gap-3">
          <div><Label>Name</Label><Input required placeholder="Jane Doe" /></div>
          <div><Label>Email</Label><Input required type="email" placeholder="jane@example.com" /></div>
        </div>
        <div><Label>Message</Label><Textarea required rows={5} placeholder="How can we help?" /></div>
        <Button className="w-full bg-gradient-primary text-primary-foreground glow">Send message</Button>
      </form>
    </section>
  </PageShell>
);
export default Contact;
