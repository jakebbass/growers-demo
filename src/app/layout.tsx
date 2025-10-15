import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/query-provider';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Growers Edge Prototype',
  description:
    'Retailer-first crop plan warranty experience with aGEnt intelligence for incremental revenue and reduced churn.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={clsx(inter.className, 'min-h-screen bg-slate-50')}>
        <QueryProvider>
          <div className="min-h-screen">
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
