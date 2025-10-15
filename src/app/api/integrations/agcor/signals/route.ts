import { NextResponse } from 'next/server';
import { getAgentSignals } from '@/lib/db';

export async function GET() {
  return NextResponse.json({ signals: getAgentSignals() });
}
