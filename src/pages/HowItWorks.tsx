import { PageShell, PageHeader } from "@/components/landing/PageShell";
import { HowItWorks as HW } from "@/components/landing/Features";

const HowItWorks = () => (
  <PageShell>
    <PageHeader eyebrow="How it works" title="Four simple steps. Massive impact." />
    <HW />
  </PageShell>
);
export default HowItWorks;
