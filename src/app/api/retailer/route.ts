import { NextResponse } from 'next/server';
import { getRetailerDashboard } from '@/lib/db';

export async function GET() {
  const dashboard = getRetailerDashboard();
  return NextResponse.json(dashboard);
}
