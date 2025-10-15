import { AgentSignal } from '@/lib/types';
import { formatCurrency, formatDeltaPercent } from '@/lib/utils';

interface SignalCardProps {
  signal: AgentSignal;
  onLaunch?: (id: string) => void;
  isLaunching?: boolean;
}

export function SignalCard({ signal, onLaunch, isLaunching }: SignalCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand/60">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">Segment</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">{signal.segment}</h3>
          <p className="mt-2 text-sm text-slate-600">
            <span className="font-medium text-slate-700">Why now: </span>
            {signal.rationale}
          </p>
        </div>
        {onLaunch ? (
          <button
            type="button"
            onClick={() => onLaunch(signal.id)}
            disabled={isLaunching}
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand/90 disabled:cursor-not-allowed disabled:bg-brand/60"
          >
            {isLaunching ? 'Launching…' : 'Launch outreach'}
          </button>
        ) : null}
      </div>
      <div className="mt-4 rounded-xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Recommended copy</p>
        <p className="mt-1 text-sm font-medium text-slate-700">Subject: {signal.recommendedCopy.subject}</p>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">{signal.recommendedCopy.message}</p>
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-600 sm:grid-cols-4">
        <div>
          <dt className="font-medium text-slate-500">Installs</dt>
          <dd className="text-lg font-semibold text-slate-900">{signal.projectedLift.installs}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500">Re-enrolls</dt>
          <dd className="text-lg font-semibold text-slate-900">{signal.projectedLift.reEnrolls}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500">Incremental revenue</dt>
          <dd className="text-lg font-semibold text-slate-900">
            {formatCurrency(signal.projectedLift.incrementalRevenueUSD)}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500">CAC impact</dt>
          <dd className="text-lg font-semibold text-emerald-600">
            {formatDeltaPercent(signal.projectedLift.cacDeltaPct / 100)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
