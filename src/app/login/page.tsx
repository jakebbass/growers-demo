import Link from 'next/link';
import { getRetailer } from '@/lib/db';

export default function LoginPage() {
  const retailer = getRetailer();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-4 text-white">
      <div className="max-w-md space-y-6 rounded-3xl bg-white/10 p-8 shadow-xl backdrop-blur">
        <p className="text-sm uppercase tracking-wide text-emerald-300">Growers Edge Prototype</p>
        <h1 className="text-3xl font-semibold">Choose your experience</h1>
        <p className="text-sm text-slate-200">
          The value of the app isn’t the technology—it is the intelligence that pairs retailers and growers to reduce churn and
          unlock incremental revenue.
        </p>
        <div className="space-y-3">
          <Link
            href="/retailer/login"
            className="block w-full rounded-full bg-brand px-4 py-3 text-center text-sm font-semibold text-white shadow hover:bg-brand/90"
          >
            Retailer portal
          </Link>
          <Link
            href="/"
            className="block w-full rounded-full bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white shadow hover:bg-white/20"
          >
            Farmer app (demo)
          </Link>
        </div>
        <p className="text-xs text-slate-300">Branded for {retailer.name}</p>
      </div>
    </div>
  );
}
