import { Policy } from '@/lib/types';
import { formatCurrency, policyExpiresInDays } from '@/lib/utils';
import { ReactNode } from 'react';

interface PolicyCardProps {
  policy: Policy;
  cta?: ReactNode;
}

export function PolicyCard({ policy, cta }: PolicyCardProps) {
  const expiresIn = policyExpiresInDays(policy);
  const urgency = expiresIn <= 30 ? 'text-amber-600' : 'text-slate-500';

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{policy.crop}</p>
          <h3 className="text-lg font-semibold text-slate-900">{policy.acres} acres protected</h3>
          <p className={`mt-2 text-sm font-medium ${urgency}`}>
            {expiresIn > 0 ? `Expires in ${expiresIn} days` : 'Expired'}
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          {policy.status}
        </span>
      </div>
      <dl className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-slate-500">Coverage per acre</dt>
          <dd className="font-semibold text-slate-900">{formatCurrency(policy.coveragePerAcreUSD)}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Coverage pct</dt>
          <dd className="font-semibold text-slate-900">{policy.coveragePct * 100}%</dd>
        </div>
      </dl>
      {cta}
    </div>
  );
}
