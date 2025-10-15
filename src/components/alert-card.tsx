import { Alert } from '@/lib/types';
import Link from 'next/link';

export function AlertCard({ alert }: { alert: Alert }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">{alert.type}</p>
      <h3 className="mt-2 text-lg font-semibold">{alert.title}</h3>
      <p className="mt-2 text-sm text-slate-100">{alert.body}</p>
      {alert.cta ? (
        <Link
          href={alert.cta.route}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-900"
        >
          {alert.cta.label}
        </Link>
      ) : null}
    </div>
  );
}
