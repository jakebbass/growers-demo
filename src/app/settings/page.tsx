import { FarmerShell } from '@/components/farmer-shell';
import { SettingsPanel } from '@/components/settings-panel';
import { getFarmer } from '@/lib/db';
import { ACTIVE_FARMER_ID } from '@/lib/session';

export default function SettingsPage() {
  const farmer = getFarmer(ACTIVE_FARMER_ID);
  if (!farmer) {
    throw new Error('Farmer not found');
  }

  return (
    <FarmerShell title="Settings" subtitle="Control how intelligence reaches you.">
      <SettingsPanel />
    </FarmerShell>
  );
}
