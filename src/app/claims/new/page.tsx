import { FarmerShell } from '@/components/farmer-shell';
import { ClaimForm } from '@/components/claim-form';
import { getFarmer, getPoliciesForFarmer } from '@/lib/db';
import { ACTIVE_FARMER_ID } from '@/lib/session';

export default function NewClaimPage() {
  const farmer = getFarmer(ACTIVE_FARMER_ID);
  if (!farmer) {
    throw new Error('Farmer not found');
  }
  const policies = getPoliciesForFarmer(farmer.id);

  return (
    <FarmerShell
      title="File a claim"
      subtitle="Intelligence-backed review keeps your coverage responsive and reduces churn during tough seasons."
    >
      <ClaimForm policies={policies} />
    </FarmerShell>
  );
}
