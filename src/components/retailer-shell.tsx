import Link from 'next/link';
import { ReactNode } from 'react';
import { getRetailer } from '@/lib/db';
import Image from 'next/image';

const retailer = getRetailer();

interface RetailerShellProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

const navItems = [
  { href: '/retailer', label: 'Dashboard' },
  { href: '/retailer/agent', label: 'aGEnt Signals' },
  { href: '/retailer/customers', label: 'Customers' }
];

export function RetailerShell({ title, description, actions, children }: RetailerShellProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src={retailer.logoUrl}
                alt={`${retailer.name} logo`}
                fill
                sizes="40px"
                className="rounded-full border border-slate-200 object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Retailer portal</p>
              <h1 className="text-xl font-semibold text-slate-900">{retailer.name}</h1>
            </div>
          </div>
          <nav className="flex gap-4 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
            {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
          </div>
          {actions}
        </div>
        <div className="space-y-6">{children}</div>
      </main>
    </div>
  );
}
