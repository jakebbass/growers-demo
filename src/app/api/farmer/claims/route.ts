import { NextResponse } from 'next/server';
import { createClaim } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const claim = createClaim(body);
  return NextResponse.json(claim, { status: 201 });
}
