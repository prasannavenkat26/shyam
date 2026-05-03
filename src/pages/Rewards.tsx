import { PageShell, PageHeader } from "@/components/landing/PageShell";
import { Rewards as R } from "@/components/landing/Rewards";

const RewardsPage = () => (
  <PageShell>
    <PageHeader eyebrow="Rewards" title="Get rewarded for doing good" />
    <R />
  </PageShell>
);
export default RewardsPage;
