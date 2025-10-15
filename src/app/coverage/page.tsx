import { FarmerShell } from '@/components/farmer-shell';
import { CoverageCalculator } from '@/components/coverage-calculator';
import { getFarmer } from '@/lib/db';
import { ACTIVE_FARMER_ID } from '@/lib/session';

export default function CoveragePage() {
  const farmer = getFarmer(ACTIVE_FARMER_ID);
  if (!farmer) {
    throw new Error('Farmer not found');
  }

  return (
    <FarmerShell
      title="Coverage calculator"
      subtitle={`Model coverage options for ${farmer.name} with intelligence-first recommendations.`}
    >
      <CoverageCalculator />
    </FarmerShell>
  );
}
