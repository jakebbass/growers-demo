import { RetailerShell } from '@/components/retailer-shell';
import { getRetailerDashboard } from '@/lib/db';
import { formatCurrency, formatPercent, formatDeltaPercent } from '@/lib/utils';
import { KpiCard } from '@/components/kpi-card';
import { EngagementChart } from '@/components/engagement-chart';
import Link from 'next/link';

export default function RetailerDashboardPage() {
  const dashboard = getRetailerDashboard();
  const { activeCampaign } = dashboard;

  return (
    <RetailerShell
      title="Intelligence dashboard"
      description="Track incremental revenue, re-enrollment lift, and churn reduction powered by aGEnt."
      actions={
        <Link
          href="/retailer/agent"
          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand/90"
        >
          View aGEnt signals
        </Link>
      }
    >
      <section className="grid gap-4 md:grid-cols-3">
        <KpiCard
          title="Incremental revenue"
          value={formatCurrency(dashboard.kpis.incrementalRevenueUSD)}
          helper="Projected from active outreach"
        />
        <KpiCard
          title="Re-enrollment rate"
          value={formatPercent(dashboard.kpis.reEnrollRate)}
          helper="Up +6 pts vs last quarter"
        />
        <KpiCard
          title="Churn reduced"
          value={formatDeltaPercent(-dashboard.kpis.churnReducedPct / 100)}
          helper="Last 90 days"
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Installs & Re-enrollments (last 12 weeks)</h3>
            <p className="text-sm text-slate-500">
              Agcor Xplor AI aggregates signals from Clay, Salesfinity, and AgVend to keep installs and re-enrollments growing.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <EngagementChart data={dashboard.timeline} />
        </div>
      </section>

      {activeCampaign ? (
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Active campaign</p>
              <h3 className="text-lg font-semibold text-slate-900">{activeCampaign.name}</h3>
              <p className="text-sm text-emerald-700">
                Installs {activeCampaign.metrics.clicks} · Re-enrolls {activeCampaign.metrics.reenrolls} · Incremental revenue{' '}
                {formatCurrency(activeCampaign.metrics.incrementalRevenueUSD)}
              </p>
            </div>
            <Link
              href={`/retailer/campaigns/${activeCampaign.id}`}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800"
            >
              View details
            </Link>
          </div>
        </section>
      ) : null}
    </RetailerShell>
  );
}
