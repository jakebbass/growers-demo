import { ReactNode } from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  helper?: string;
  icon?: ReactNode;
}

export function KpiCard({ title, value, helper, icon }: KpiCardProps) {
  return (
    <div className="flex flex-1 items-start gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {icon ? <div className="mt-1 text-brand">{icon}</div> : null}
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
        {helper ? <p className="mt-2 text-sm text-slate-500">{helper}</p> : null}
      </div>
    </div>
  );
}
