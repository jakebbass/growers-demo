import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const county: string = body.county ?? 'Unknown';
  const score = county.toLowerCase().includes('north') ? 0.72 : 0.48;
  return NextResponse.json({ county, riskScore: score });
}
