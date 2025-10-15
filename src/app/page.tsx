import { FarmerShell } from '@/components/farmer-shell';
import { PolicyCard } from '@/components/policy-card';
import { AlertCard } from '@/components/alert-card';
import { ReenrollAction } from '@/components/reenroll-action';
import { getAlertsForFarmer, getFarmer, getPoliciesForFarmer, getRetailer } from '@/lib/db';
import { ACTIVE_FARMER_ID } from '@/lib/session';
import { nextExpiringPolicy } from '@/lib/utils';

export default function FarmerHomePage() {
  const farmer = getFarmer(ACTIVE_FARMER_ID);
  if (!farmer) {
    throw new Error('Farmer not found');
  }
  const policies = getPoliciesForFarmer(farmer.id);
  const alerts = getAlertsForFarmer(farmer.id);
  const retailer = getRetailer();
  const primaryPolicy = nextExpiringPolicy(policies);

  return (
    <FarmerShell
      title={farmer.name}
      subtitle={`Powered by ${retailer.name} intelligence to reduce churn and boost re-enrollment.`}
    >
      {primaryPolicy ? (
        <div className="rounded-3xl bg-gradient-to-r from-brand to-emerald-500 p-6 text-white shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">Next best action</p>
          <h2 className="mt-2 text-xl font-semibold">Renew your {primaryPolicy.crop} coverage</h2>
          <p className="mt-2 text-sm text-emerald-50">
            The value of the app isn’t the technology, it is the intelligence guiding you to capture incremental revenue and
            reduce risk.
          </p>
          <div className="mt-4">
            <ReenrollAction policyId={primaryPolicy.id} />
          </div>
        </div>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Policies</h2>
        <div className="space-y-4">
          {policies.map((policy) => (
            <PolicyCard key={policy.id} policy={policy} cta={<ReenrollAction policyId={policy.id} />} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Alerts & nudges</h2>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </section>
    </FarmerShell>
  );
}
