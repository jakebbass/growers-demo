import { NextResponse } from 'next/server';
import { getCustomers } from '@/lib/db';

export async function GET() {
  return NextResponse.json(getCustomers());
}
