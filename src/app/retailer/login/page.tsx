import Link from 'next/link';
import { getRetailer } from '@/lib/db';

export default function RetailerLoginPage() {
  const retailer = getRetailer();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <p className="text-xs uppercase tracking-wide text-brand">Retailer-first intelligence</p>
        <h1 className="text-2xl font-semibold text-slate-900">Welcome back, {retailer.name}</h1>
        <p className="text-sm text-slate-500">
          Access your aGEnt signals, projected incremental revenue, and re-enrollment lift.
        </p>
        <form className="space-y-4">
          <label className="space-y-2 text-sm">
            <span className="font-semibold text-slate-700">Work email</span>
            <input
              type="email"
              placeholder="you@greenvalleyag.com"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none"
            />
          </label>
          <button
            type="button"
            className="w-full rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white shadow hover:bg-brand/90"
          >
            Send magic link (mock)
          </button>
        </form>
        <Link href="/retailer" className="block text-center text-sm font-semibold text-brand">
          Continue to dashboard
        </Link>
      </div>
    </div>
  );
}
