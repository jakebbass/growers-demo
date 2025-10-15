import { NextResponse } from 'next/server';
import { reenrollPolicy } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const policy = reenrollPolicy(body);
  return NextResponse.json({ ok: true, newPolicy: policy });
}
