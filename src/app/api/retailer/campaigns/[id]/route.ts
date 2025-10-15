import { NextResponse } from 'next/server';
import { getCampaignById } from '@/lib/db';

interface Params {
  params: { id: string };
}

export async function GET(_: Request, { params }: Params) {
  const campaign = getCampaignById(params.id);
  if (!campaign) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(campaign);
}
