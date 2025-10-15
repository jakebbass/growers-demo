'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Policy } from '@/lib/types';
import { ClaimTimeline } from './claim-timeline';

async function createClaim(payload: { policyId: string; notes: string }) {
  const response = await fetch('/api/farmer/claims', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error('Failed to submit claim');
  }
  return response.json();
}

interface ClaimFormProps {
  policies: Policy[];
}

export function ClaimForm({ policies }: ClaimFormProps) {
  const [policyId, setPolicyId] = useState(policies[0]?.id ?? '');
  const [notes, setNotes] = useState('');
  const mutation = useMutation({
    mutationFn: () => createClaim({ policyId, notes })
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
        <label className="space-y-2 text-sm">
          <span className="font-semibold text-slate-700">Policy</span>
          <select
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none"
            value={policyId}
            onChange={(event) => setPolicyId(event.target.value)}
          >
            {policies.map((policy) => (
              <option key={policy.id} value={policy.id}>
                {policy.crop} — {policy.acres} acres
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold text-slate-700">Notes</span>
          <textarea
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm shadow-sm focus:border-brand focus:outline-none"
            rows={4}
            placeholder="Describe what happened. Our intelligence team will accelerate review."
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white shadow hover:bg-brand/90"
        >
          {mutation.isPending ? 'Submitting…' : 'Submit claim'}
        </button>
      </form>
      {mutation.data ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Claim submitted</h3>
          <p className="mt-1 text-sm text-slate-600">
            We received your claim. The value of the app isn’t the technology—it’s the intelligence that accelerates payouts.
          </p>
          <div className="mt-4">
            <ClaimTimeline status={mutation.data.status} />
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
          Typical review time is 3–5 days. Uploading photos soon will help reduce churn during stressful moments.
        </div>
      )}
    </div>
  );
}
