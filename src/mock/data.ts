import { AgentSignal, Alert, Campaign, Claim, Farmer, Policy, Retailer } from '@/lib/types';

const retailer: Retailer = {
  id: 'retailer-1',
  name: 'Green Valley Ag',
  brandColor: '#2E7D32',
  logoUrl: '/green-valley-logo.svg'
};

const farmers: Farmer[] = [
  {
    id: 'farmer-1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    retailerId: retailer.id,
    crops: ['Corn'],
    region: 'IA-North',
    acres: 640,
    reEnrollProbability: 0.88,
    churnRisk: 'low',
    appInstalled: true,
    lastPurchase: '2024-04-20'
  },
  {
    id: 'farmer-2',
    name: 'Maria Lopez',
    email: 'maria.lopez@example.com',
    retailerId: retailer.id,
    crops: ['Soy'],
    region: 'NE-East',
    acres: 420,
    reEnrollProbability: 0.62,
    churnRisk: 'med',
    appInstalled: false,
    lastPurchase: '2024-02-11'
  },
  {
    id: 'farmer-3',
    name: 'Devon Carter',
    email: 'devon.carter@example.com',
    retailerId: retailer.id,
    crops: ['Corn', 'Soy'],
    region: 'IA-South',
    acres: 520,
    reEnrollProbability: 0.74,
    churnRisk: 'med',
    appInstalled: true,
    lastPurchase: '2024-03-05'
  },
  {
    id: 'farmer-4',
    name: 'Priya Singh',
    email: 'priya.singh@example.com',
    retailerId: retailer.id,
    crops: ['Corn'],
    region: 'IA-North',
    acres: 720,
    reEnrollProbability: 0.54,
    churnRisk: 'high',
    appInstalled: false,
    lastPurchase: '2023-12-19'
  },
  {
    id: 'farmer-5',
    name: 'Jordan Blake',
    email: 'jordan.blake@example.com',
    retailerId: retailer.id,
    crops: ['Soy'],
    region: 'NE-East',
    acres: 310,
    reEnrollProbability: 0.49,
    churnRisk: 'high',
    appInstalled: false,
    lastPurchase: '2023-11-30'
  },
  {
    id: 'farmer-6',
    name: 'Hannah Kim',
    email: 'hannah.kim@example.com',
    retailerId: retailer.id,
    crops: ['Corn', 'Wheat'],
    region: 'IA-West',
    acres: 450,
    reEnrollProbability: 0.69,
    churnRisk: 'med',
    appInstalled: true,
    lastPurchase: '2024-01-28'
  },
  {
    id: 'farmer-7',
    name: 'Chris Martin',
    email: 'chris.martin@example.com',
    retailerId: retailer.id,
    crops: ['Soy', 'Corn'],
    region: 'MO-North',
    acres: 380,
    reEnrollProbability: 0.57,
    churnRisk: 'med',
    appInstalled: true,
    lastPurchase: '2024-02-22'
  },
  {
    id: 'farmer-8',
    name: 'Isabella Rossi',
    email: 'isabella.rossi@example.com',
    retailerId: retailer.id,
    crops: ['Corn'],
    region: 'IA-North',
    acres: 560,
    reEnrollProbability: 0.9,
    churnRisk: 'low',
    appInstalled: true,
    lastPurchase: '2024-04-02'
  }
];

const policies: Policy[] = [
  {
    id: 'policy-1',
    farmerId: 'farmer-1',
    crop: 'Corn',
    acres: 400,
    coveragePerAcreUSD: 425,
    coveragePct: 0.9,
    status: 'active',
    expiresAt: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'policy-2',
    farmerId: 'farmer-1',
    crop: 'Corn',
    acres: 240,
    coveragePerAcreUSD: 410,
    coveragePct: 0.85,
    status: 'active',
    expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'policy-3',
    farmerId: 'farmer-2',
    crop: 'Soy',
    acres: 420,
    coveragePerAcreUSD: 380,
    coveragePct: 0.88,
    status: 'active',
    expiresAt: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'policy-4',
    farmerId: 'farmer-3',
    crop: 'Corn',
    acres: 300,
    coveragePerAcreUSD: 400,
    coveragePct: 0.9,
    status: 'active',
    expiresAt: new Date(Date.now() + 55 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'policy-5',
    farmerId: 'farmer-3',
    crop: 'Soy',
    acres: 220,
    coveragePerAcreUSD: 360,
    coveragePct: 0.86,
    status: 'active',
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'policy-6',
    farmerId: 'farmer-4',
    crop: 'Corn',
    acres: 720,
    coveragePerAcreUSD: 430,
    coveragePct: 0.9,
    status: 'active',
    expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'policy-7',
    farmerId: 'farmer-5',
    crop: 'Soy',
    acres: 310,
    coveragePerAcreUSD: 350,
    coveragePct: 0.82,
    status: 'active',
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'policy-8',
    farmerId: 'farmer-6',
    crop: 'Corn',
    acres: 450,
    coveragePerAcreUSD: 415,
    coveragePct: 0.89,
    status: 'active',
    expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'policy-9',
    farmerId: 'farmer-7',
    crop: 'Soy',
    acres: 380,
    coveragePerAcreUSD: 365,
    coveragePct: 0.84,
    status: 'active',
    expiresAt: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'policy-10',
    farmerId: 'farmer-8',
    crop: 'Corn',
    acres: 560,
    coveragePerAcreUSD: 440,
    coveragePct: 0.92,
    status: 'active',
    expiresAt: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const claims: Claim[] = [
  {
    id: 'claim-1',
    policyId: 'policy-3',
    status: 'review',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Soybeans impacted by hail event near Norfolk.'
  },
  {
    id: 'claim-2',
    policyId: 'policy-6',
    status: 'submitted',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Wind damage reported in Boone County.'
  },
  {
    id: 'claim-3',
    policyId: 'policy-1',
    status: 'approved',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Payout issued after drought stress assessment.'
  }
];

const alerts: Alert[] = [
  {
    id: 'alert-1',
    farmerId: 'farmer-1',
    type: 'weather',
    title: 'High wind risk this week',
    body: 'Gusts above 45 mph forecast for IA-North. Check pivot anchoring and update coverage if needed.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'alert-2',
    farmerId: 'farmer-1',
    type: 'reenroll',
    title: 'Re-enroll now to lock 90% coverage',
    body: 'Secure your 2026 coverage before rates adjust. The value of the app isn’t the technology, it is the intelligence guiding the right move.',
    cta: { label: 'Re-enroll', route: '/coverage' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'alert-3',
    farmerId: 'farmer-3',
    type: 'preclaim',
    title: 'Pre-claim tip: photo logs',
    body: 'Capture growth stage photos to accelerate review if hail persists this week.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'alert-4',
    farmerId: 'farmer-5',
    type: 'promo',
    title: 'Offer from Green Valley Ag',
    body: 'Renew now and lock 90% coverage with intelligence-backed pricing.',
    cta: { label: 'Review offer', route: '/' },
    createdAt: new Date().toISOString()
  }
];

const agentSignals: AgentSignal[] = [
  {
    id: 'signal-1',
    retailerId: retailer.id,
    segment: 'Corn ≥500 acres | IA-North | expiring <45d',
    rationale:
      'Pre-harvest window; historical hail risk; Clay data shows low app penetration. Salesfinity recommends proactive outreach to protect incremental revenue.',
    recommendedCopy: {
      subject: 'Secure your 2026 coverage now',
      message:
        'Hi {{FirstName}}, based on forecast and last season’s outcomes, we recommend renewing your coverage for Field {{FieldName}} to reduce churn and capture the projected yield. Tap the app to re-enroll in under two minutes.'
    },
    projectedLift: {
      installs: 120,
      reEnrolls: 85,
      incrementalRevenueUSD: 255000,
      cacDeltaPct: -22
    }
  },
  {
    id: 'signal-2',
    retailerId: retailer.id,
    segment: 'Soy | NE-East | high churn risk',
    rationale:
      'Clay and AgVend order velocity dipped 18%. Salesfinity suggests tailored messaging around agronomy support to reduce churn.',
    recommendedCopy: {
      subject: 'Your soy coverage deserves an intelligence boost',
      message:
        'Hi {{FirstName}}, our agronomy and risk models flag upcoming pest pressure. Re-enrolling now keeps your margin protected and leverages retailer intelligence.'
    },
    projectedLift: {
      installs: 75,
      reEnrolls: 48,
      incrementalRevenueUSD: 138000,
      cacDeltaPct: -18
    }
  },
  {
    id: 'signal-3',
    retailerId: retailer.id,
    segment: 'Mixed crops | loyalty tier candidates',
    rationale:
      'Agcor Xplor AI spotted cross-sell potential for growers with diversified rotations. Clay data shows high responsiveness to multi-crop offers.',
    recommendedCopy: {
      subject: 'Unlock loyalty coverage benefits',
      message:
        'Hi {{FirstName}}, Green Valley Ag intelligence unlocked a loyalty tier for your rotation mix. Re-enroll to access bundled coverage and reduce churn risk by 14%.'
    },
    projectedLift: {
      installs: 95,
      reEnrolls: 60,
      incrementalRevenueUSD: 165000,
      cacDeltaPct: -15
    }
  }
];

const campaigns: Campaign[] = [
  {
    id: 'campaign-1',
    retailerId: retailer.id,
    name: 'Q2 Re-enroll Push',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    signalsUsed: ['signal-1', 'signal-2'],
    metrics: {
      sent: 500,
      opens: 340,
      clicks: 150,
      reenrolls: 90,
      incrementalRevenueUSD: 270000,
      cacDeltaPct: -18
    }
  }
];

export const data = {
  retailer,
  farmers,
  policies,
  claims,
  alerts,
  agentSignals,
  campaigns
};
