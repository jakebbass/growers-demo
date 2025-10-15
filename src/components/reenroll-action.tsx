'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

async function reenroll(policyId: string) {
  const response = await fetch('/api/farmer/reenroll', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ policyId })
  });
  if (!response.ok) {
    throw new Error('Failed to reenroll');
  }
  return response.json();
}

export function ReenrollAction({ policyId }: { policyId: string }) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<string | null>(null);
  const mutation = useMutation({
    mutationFn: () => reenroll(policyId),
    onSuccess: async () => {
      setStatus('Request submitted. Our team will confirm within 24 hours.');
      await queryClient.invalidateQueries({ queryKey: ['farmer-self'] });
    }
  });

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => mutation.mutate()}
        className="w-full rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white shadow hover:bg-brand/90 disabled:cursor-not-allowed disabled:bg-brand/60"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Submitting…' : 'Re-enroll'}
      </button>
      {status ? <p className="text-xs text-slate-500">{status}</p> : null}
      {mutation.isError ? (
        <p className="text-xs text-rose-500">Something went wrong. Please try again.</p>
      ) : null}
    </div>
  );
}
