import { FarmerShell } from '@/components/farmer-shell';
import { getFarmer } from '@/lib/db';
import { ACTIVE_FARMER_ID } from '@/lib/session';

const insights = [
  {
    title: 'Yield trend: +4% vs 5-year average',
    body: 'Agcor Xplor AI sees moisture resilience improving. Re-invest incremental revenue into higher coverage tiers.'
  },
  {
    title: 'Soil organic matter rising',
    body: 'Agerpoint imagery shows a 0.6% lift year-over-year. Consider diversifying coverage products to keep loyalty benefits.'
  },
  {
    title: 'Weather window for fungicide',
    body: 'Clay weather stack surfaces a 3-day calm window. Schedule now to reduce claim probability later.'
  }
];

export default function InsightsPage() {
  const farmer = getFarmer(ACTIVE_FARMER_ID);
  if (!farmer) {
    throw new Error('Farmer not found');
  }

  return (
    <FarmerShell
      title="Insights"
      subtitle="The value of the app isn’t the technology—it’s the intelligence in your pocket."
    >
      <div className="space-y-4">
        {insights.map((insight) => (
          <article key={insight.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{insight.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{insight.body}</p>
          </article>
        ))}
        <div className="rounded-2xl border border-dashed border-brand/40 bg-brand/5 p-5 text-sm text-slate-600">
          Soon this space will host field maps and autonomous recommendations that tie directly to re-enrollment nudges.
        </div>
      </div>
    </FarmerShell>
  );
}
