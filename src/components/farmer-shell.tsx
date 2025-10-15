import Link from 'next/link';
import { ReactNode } from 'react';
import { getRetailer } from '@/lib/db';
import Image from 'next/image';

const retailer = getRetailer();

interface FarmerShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
}

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/coverage', label: 'Coverage' },
  { href: '/claims/new', label: 'File claim' },
  { href: '/insights', label: 'Insights' },
  { href: '/settings', label: 'Settings' }
];

export function FarmerShell({ title, subtitle, children, actions }: FarmerShellProps) {
  return (
    <div className="mx-auto min-h-screen max-w-lg bg-white">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9">
              <Image
                src={retailer.logoUrl}
                alt="Retailer logo"
                fill
                sizes="36px"
                className="rounded-full border border-slate-200"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">My Crop Plan</p>
              <h1 className="text-base font-semibold text-slate-900">{title}</h1>
              {subtitle ? <p className="text-xs text-slate-500">{subtitle}</p> : null}
            </div>
          </div>
          {actions}
        </div>
        <nav className="flex justify-between border-t border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="flex-1 px-4 py-3 text-center hover:text-brand">
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="space-y-4 bg-slate-50 px-4 py-6 sm:rounded-t-3xl">
        {children}
      </main>
    </div>
  );
}
