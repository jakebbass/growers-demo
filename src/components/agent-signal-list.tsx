'use client';

import { AgentSignal } from '@/lib/types';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { SignalCard } from './signal-card';

async function launchCampaign(signalIds: string[]) {
  const response = await fetch('/api/retailer/campaigns', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ signalIds })
  });
  if (!response.ok) {
    throw new Error('Failed to launch campaign');
  }
  return response.json();
}

export function AgentSignalList({ signals }: { signals: AgentSignal[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const mutation = useMutation({
    mutationFn: (ids: string[]) => launchCampaign(ids),
    onSuccess: () => setSelected([])
  });

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]));
  };

  const launchSingle = (id: string) => {
    mutation.mutate([id]);
  };

  const launchSelected = () => {
    if (selected.length) {
      mutation.mutate(selected);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        The value of the app isn’t the technology—it’s the intelligence that pinpoints segments to reduce churn and unlock
        incremental revenue.
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        {signals.map((signal) => (
          <div key={signal.id} className="space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand"
                  checked={selected.includes(signal.id)}
                  onChange={() => toggle(signal.id)}
                />
                Batch launch
              </label>
              <span>{selected.includes(signal.id) ? 'Selected' : ''}</span>
            </div>
            <SignalCard signal={signal} onLaunch={launchSingle} isLaunching={mutation.isPending} />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={launchSelected}
        disabled={mutation.isPending || selected.length === 0}
        className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {mutation.isPending ? 'Launching campaign…' : `Launch campaign with ${selected.length} signal(s)`}
      </button>
      {mutation.isSuccess ? (
        <p className="text-sm text-emerald-600">
          Outreach launched. Monitor incremental revenue lift in the dashboard.
        </p>
      ) : null}
      {mutation.isError ? (
        <p className="text-sm text-rose-500">Unable to launch campaign. Try again.</p>
      ) : null}
    </div>
  );
}
