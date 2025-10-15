import { NextResponse } from 'next/server';
import { calculateCoverage } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const result = calculateCoverage(body);
  return NextResponse.json(result);
}
