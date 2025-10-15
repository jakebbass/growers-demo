import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    firms: [
      {
        name: 'Johnson Family Farms',
        acres: 680,
        appInstalled: true,
        churnRisk: 'low'
      },
      {
        name: 'Lopez Ag Group',
        acres: 420,
        appInstalled: false,
        churnRisk: 'med'
      }
    ]
  });
}
