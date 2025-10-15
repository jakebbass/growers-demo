export type ID = string;

export interface Retailer {
  id: ID;
  name: string;
  brandColor: string;
  logoUrl: string;
}

export interface Farmer {
  id: ID;
  name: string;
  email: string;
  retailerId: ID;
  crops: string[];
  region: string;
  acres: number;
  reEnrollProbability: number;
  churnRisk: 'low' | 'med' | 'high';
  appInstalled: boolean;
  lastPurchase: string;
}

export interface Policy {
  id: ID;
  farmerId: ID;
  crop: string;
  acres: number;
  coveragePerAcreUSD: number;
  coveragePct: number;
  status: 'active' | 'expired' | 'pending';
  expiresAt: string;
}

export interface Claim {
  id: ID;
  policyId: ID;
  status: 'submitted' | 'review' | 'approved' | 'rejected';
  createdAt: string;
  notes?: string;
  photos?: string[];
}

export interface Alert {
  id: ID;
  farmerId: ID;
  type: 'weather' | 'preclaim' | 'reenroll' | 'promo';
  title: string;
  body: string;
  cta?: { label: string; route: string };
  createdAt: string;
}

export interface AgentSignal {
  id: ID;
  retailerId: ID;
  segment: string;
  rationale: string;
  recommendedCopy: { subject: string; message: string };
  projectedLift: {
    installs: number;
    reEnrolls: number;
    incrementalRevenueUSD: number;
    cacDeltaPct: number;
  };
}

export interface CampaignMetrics {
  sent: number;
  opens: number;
  clicks: number;
  reenrolls: number;
  incrementalRevenueUSD: number;
  cacDeltaPct: number;
}

export interface Campaign {
  id: ID;
  retailerId: ID;
  name: string;
  createdAt: string;
  signalsUsed: ID[];
  metrics: CampaignMetrics;
}

export interface RetailerDashboardResponse {
  retailer: Retailer;
  kpis: {
    incrementalRevenueUSD: number;
    reEnrollRate: number;
    churnReducedPct: number;
  };
  activeCampaign?: Campaign;
  timeline: Array<{
    week: string;
    installs: number;
    reenrolls: number;
  }>;
}

export interface FarmerSelfResponse {
  farmer: Farmer;
  policies: Policy[];
  alerts: Alert[];
}
