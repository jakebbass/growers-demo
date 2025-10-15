import { RetailerShell } from '@/components/retailer-shell';
import { AgentSignalList } from '@/components/agent-signal-list';
import { getAgentSignals } from '@/lib/db';

export default function AgentPage() {
  const signals = getAgentSignals();
  return (
    <RetailerShell
      title="aGEnt by Agcor Xplor AI"
      description="The value of the app isn’t the technology, it is the intelligence guiding targeted outreach."
    >
      <AgentSignalList signals={signals} />
    </RetailerShell>
  );
}
