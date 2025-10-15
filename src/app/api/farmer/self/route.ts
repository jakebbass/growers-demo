import { NextResponse } from 'next/server';
import { getAlertsForFarmer, getFarmer, getPoliciesForFarmer } from '@/lib/db';
import { ACTIVE_FARMER_ID } from '@/lib/session';

export async function GET() {
  const farmer = getFarmer(ACTIVE_FARMER_ID);
  if (!farmer) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({
    farmer,
    policies: getPoliciesForFarmer(farmer.id),
    alerts: getAlertsForFarmer(farmer.id)
  });
}
