import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    totals: {
      quarterToDateUSD: 1250000,
      projectedIncrementalUSD: 270000
    }
  });
}
