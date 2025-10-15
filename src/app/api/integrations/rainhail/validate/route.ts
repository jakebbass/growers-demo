import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ eligible: true, carrier: 'Rain & Hail' });
}
