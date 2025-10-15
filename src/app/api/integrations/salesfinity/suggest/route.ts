import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    variants: [
      {
        subject: 'Secure your 2026 coverage now',
        message: 'Tap into Green Valley Ag intelligence to renew before weather risk spikes.'
      },
      {
        subject: 'Intelligence-backed coverage refresh',
        message: 'Re-enroll to reduce churn risk and capture incremental revenue for your acres.'
      }
    ]
  });
}
