import { PageShell, PageHeader } from "@/components/landing/PageShell";
import { Impact as ImpactSection } from "@/components/landing/Impact";

const Impact = () => (
  <PageShell>
    <PageHeader eyebrow="Sustainability" title="Measurable environmental impact" subtitle="Live numbers. Verified outcomes. Transparent reports." />
    <ImpactSection />
  </PageShell>
);
export default Impact;
