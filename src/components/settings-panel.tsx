'use client';

import { useState } from 'react';

const options = [
  { id: 'weather', label: 'Weather risk alerts' },
  { id: 'claims', label: 'Claim status updates' },
  { id: 'promo', label: 'Retailer intelligence offers' },
  { id: 'reenroll', label: 'Re-enrollment nudges' }
];

export function SettingsPanel() {
  const [settings, setSettings] = useState(() => new Set(options.map((option) => option.id)));

  return (
    <div className="space-y-4">
      {options.map((option) => {
        const enabled = settings.has(option.id);
        return (
          <label
            key={option.id}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm"
          >
            <div>
              <p className="font-semibold text-slate-900">{option.label}</p>
              <p className="text-xs text-slate-500">Keeps you ahead with incremental revenue and reduced churn.</p>
            </div>
            <button
              type="button"
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                enabled ? 'bg-brand' : 'bg-slate-300'
              }`}
              onClick={() => {
                setSettings((prev) => {
                  const next = new Set(prev);
                  if (next.has(option.id)) {
                    next.delete(option.id);
                  } else {
                    next.add(option.id);
                  }
                  return next;
                });
              }}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                  enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        );
      })}
    </div>
  );
}
