import { NextResponse } from 'next/server';
import { createCampaign, getCampaigns } from '@/lib/db';

export async function GET() {
  return NextResponse.json(getCampaigns());
}

export async function POST(request: Request) {
  const body = await request.json();
  const signalIds: string[] = body.signalIds ?? [];
  const name: string | undefined = body.name;
  const campaign = createCampaign(signalIds, name);
  return NextResponse.json(campaign, { status: 201 });
}
