'use client';

import { Farmer } from '@/lib/types';
import { describeChurnRisk, formatPercent, humanizeDate } from '@/lib/utils';
import { useState } from 'react';

interface CustomersTableProps {
  customers: Farmer[];
}

export function CustomersTable({ customers }: CustomersTableProps) {
  const [selected, setSelected] = useState<Farmer | null>(null);
  const [message, setMessage] = useState('');

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {['Name', 'Region', 'Crops', 'Last purchase', 'Re-enroll probability', 'Churn risk', 'Action'].map(
              (header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {customers.map((customer) => (
            <tr key={customer.id} className="text-sm text-slate-700">
              <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">{customer.name}</td>
              <td className="whitespace-nowrap px-6 py-4">{customer.region}</td>
              <td className="px-6 py-4">{customer.crops.join(', ')}</td>
              <td className="whitespace-nowrap px-6 py-4">{humanizeDate(customer.lastPurchase)}</td>
              <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-900">
                {formatPercent(customer.reEnrollProbability)}
              </td>
              <td className="px-6 py-4 capitalize">{customer.churnRisk}</td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  className="rounded-full bg-brand px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm"
                  onClick={() => {
                    setSelected(customer);
                    setMessage(
                      `Hi ${customer.name.split(' ')[0]}, ${describeChurnRisk(customer.churnRisk)} Ready to re-enroll and tap the intelligence from Green Valley Ag?`
                    );
                  }}
                >
                  Nudge now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selected ? (
        <div className="border-t border-slate-200 bg-slate-50 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Nudge to {selected.name}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">Recommended by aGEnt intelligence</p>
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Close
            </button>
          </div>
          <textarea
            className="mt-4 w-full rounded-xl border border-slate-300 bg-white p-4 text-sm shadow-sm focus:border-brand focus:outline-none"
            rows={3}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button
            type="button"
            className="mt-4 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800"
          >
            Send (mock)
          </button>
        </div>
      ) : null}
    </div>
  );
}
