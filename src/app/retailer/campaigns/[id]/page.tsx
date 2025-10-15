import { notFound } from 'next/navigation';
import { RetailerShell } from '@/components/retailer-shell';
import { getCampaignById, getAgentSignals } from '@/lib/db';
import { formatCurrency, formatDeltaPercent } from '@/lib/utils';

interface CampaignPageProps {
  params: { id: string };
}

export default function CampaignPage({ params }: CampaignPageProps) {
  const campaign = getCampaignById(params.id);
  if (!campaign) {
    return notFound();
  }
  const signals = getAgentSignals().filter((signal) => campaign.signalsUsed.includes(signal.id));

  return (
    <RetailerShell title={campaign.name} description="Campaign performance modeled by aGEnt intelligence.">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sent</p>
          <p className="text-2xl font-semibold text-slate-900">{campaign.metrics.sent}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Installs</p>
          <p className="text-2xl font-semibold text-slate-900">{campaign.metrics.clicks}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Re-enrolls</p>
          <p className="text-2xl font-semibold text-slate-900">{campaign.metrics.reenrolls}</p>
        </div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Financial impact</h3>
        <dl className="mt-4 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">Incremental revenue</dt>
            <dd className="text-xl font-semibold text-slate-900">
              {formatCurrency(campaign.metrics.incrementalRevenueUSD)}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">CAC delta</dt>
            <dd className="text-xl font-semibold text-emerald-600">
              {formatDeltaPercent(campaign.metrics.cacDeltaPct / 100)}
            </dd>
          </div>
        </dl>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Signals used</h3>
        <div className="mt-4 space-y-4">
          {signals.map((signal) => (
            <div key={signal.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">{signal.segment}</p>
              <p className="mt-2 text-slate-700">{signal.rationale}</p>
            </div>
          ))}
        </div>
      </section>
    </RetailerShell>
  );
}
