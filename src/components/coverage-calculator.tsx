'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { formatCurrency, formatPercent } from '@/lib/utils';

interface CoverageForm {
  crop: string;
  acres: number;
  county: string;
}

async function calculate(payload: CoverageForm) {
  const response = await fetch('/api/farmer/coverage/calc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error('Unable to calculate coverage');
  }
  return response.json() as Promise<{ coveragePerAcreUSD: number; coveragePct: number; totalCoverageUSD: number }>;
}

export function CoverageCalculator() {
  const [form, setForm] = useState<CoverageForm>({ crop: 'Corn', acres: 400, county: 'Boone' });
  const mutation = useMutation({
    mutationFn: () => calculate(form)
  });

  return (
    <div className="space-y-6">
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate();
        }}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Crop</span>
            <select
              value={form.crop}
              onChange={(event) => setForm((prev) => ({ ...prev, crop: event.target.value }))}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-brand focus:outline-none"
            >
              <option value="Corn">Corn</option>
              <option value="Soy">Soy</option>
              <option value="Wheat">Wheat</option>
            </select>
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Acres</span>
            <input
              type="number"
              min={1}
              value={form.acres}
              onChange={(event) => setForm((prev) => ({ ...prev, acres: Number(event.target.value) }))}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-brand focus:outline-none"
            />
          </label>
          <label className="space-y-2 text-sm sm:col-span-2">
            <span className="font-semibold text-slate-700">County</span>
            <input
              type="text"
              value={form.county}
              onChange={(event) => setForm((prev) => ({ ...prev, county: event.target.value }))}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-brand focus:outline-none"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white shadow hover:bg-brand/90"
        >
          {mutation.isPending ? 'Calculating…' : 'Run coverage intelligence'}
        </button>
      </form>
      {mutation.data ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">Modeled coverage</p>
          <p className="mt-2 text-lg font-semibold text-emerald-900">
            {formatCurrency(mutation.data.coveragePerAcreUSD)} per acre at {formatPercent(mutation.data.coveragePct)} coverage
          </p>
          <p className="mt-2 text-sm text-emerald-700">
            Estimated total protection: {formatCurrency(mutation.data.totalCoverageUSD)}. Enroll now to reduce churn risk and
            capture incremental revenue backed by intelligence.
          </p>
          <button className="mt-4 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
            Enroll / Re-enroll
          </button>
        </div>
      ) : null}
      {mutation.isError ? (
        <p className="text-sm text-rose-500">We couldn’t calculate coverage. Please try again.</p>
      ) : null}
    </div>
  );
}
