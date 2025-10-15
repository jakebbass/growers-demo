import { data } from '@/mock/data';
import { AgentSignal, Alert, Campaign, Farmer, Policy, Retailer } from './types';
import { AVG_ACRES_PER_POLICY, AVG_POLICY_VALUE_PER_ACRE, MARGIN_MULTIPLIER } from './constants';
import { randomUUID } from 'crypto';

interface CoverageCalcPayload {
  crop: string;
  acres: number;
  county: string;
}

interface ClaimPayload {
  policyId: string;
  notes?: string;
  photos?: string[];
}

interface ReenrollPayload {
  policyId: string;
}

const timeline = Array.from({ length: 12 }).map((_, index) => ({
  week: `Week ${index + 1}`,
  installs: Math.round(80 + Math.sin(index / 2) * 25 + index * 3),
  reenrolls: Math.round(50 + Math.cos(index / 3) * 18 + index * 2)
}));

export function getRetailer(): Retailer {
  return data.retailer;
}

export function getRetailerDashboard() {
  return {
    retailer: data.retailer,
    kpis: {
      incrementalRevenueUSD: data.campaigns[0]?.metrics.incrementalRevenueUSD ?? 0,
      reEnrollRate: 0.78,
      churnReducedPct: 14
    },
    activeCampaign: data.campaigns[0],
    timeline
  };
}

export function getAgentSignals(): AgentSignal[] {
  return data.agentSignals;
}

export function getCampaigns(): Campaign[] {
  return data.campaigns;
}

export function getCampaignById(id: string): Campaign | undefined {
  return data.campaigns.find((campaign) => campaign.id === id);
}

export function createCampaign(signalIds: string[], name?: string): Campaign {
  const selectedSignals = data.agentSignals.filter((signal) => signalIds.includes(signal.id));
  const reenrolls = selectedSignals.reduce((sum, signal) => sum + signal.projectedLift.reEnrolls, 0);
  const installs = selectedSignals.reduce((sum, signal) => sum + signal.projectedLift.installs, 0);
  const incrementalRevenueUSD = Math.round(
    reenrolls * AVG_POLICY_VALUE_PER_ACRE * AVG_ACRES_PER_POLICY * MARGIN_MULTIPLIER
  );
  const cacDeltaPct =
    selectedSignals.reduce((sum, signal) => sum + signal.projectedLift.cacDeltaPct, 0) /
    Math.max(selectedSignals.length, 1);

  const campaign: Campaign = {
    id: randomUUID(),
    retailerId: data.retailer.id,
    name: name ?? `Autonomous outreach ${new Date().toLocaleDateString()}`,
    createdAt: new Date().toISOString(),
    signalsUsed: selectedSignals.map((signal) => signal.id),
    metrics: {
      sent: installs * 3,
      opens: Math.round(installs * 1.8),
      clicks: installs,
      reenrolls,
      incrementalRevenueUSD,
      cacDeltaPct
    }
  };

  data.campaigns.unshift(campaign);
  return campaign;
}

export function getCustomers(): Farmer[] {
  return data.farmers;
}

export function getPoliciesForFarmer(farmerId: string): Policy[] {
  return data.policies.filter((policy) => policy.farmerId === farmerId);
}

export function getAlertsForFarmer(farmerId: string): Alert[] {
  return data.alerts.filter((alert) => alert.farmerId === farmerId);
}

export function getFarmer(farmerId: string): Farmer | undefined {
  return data.farmers.find((farmer) => farmer.id === farmerId);
}

export function calculateCoverage(payload: CoverageCalcPayload) {
  const { acres } = payload;
  const coveragePct = 0.9;
  const coveragePerAcreUSD = 425;
  return {
    coveragePerAcreUSD,
    coveragePct,
    totalCoverageUSD: Math.round(acres * coveragePerAcreUSD * coveragePct)
  };
}

export function createClaim(payload: ClaimPayload) {
  const claim = {
    id: randomUUID(),
    policyId: payload.policyId,
    status: 'submitted' as const,
    createdAt: new Date().toISOString(),
    notes: payload.notes,
    photos: payload.photos ?? []
  };
  data.claims.unshift(claim);
  return claim;
}

export function reenrollPolicy(payload: ReenrollPayload) {
  const policy = data.policies.find((item) => item.id === payload.policyId);
  if (!policy) {
    throw new Error('Policy not found');
  }
  const newPolicy = {
    ...policy,
    id: randomUUID(),
    status: 'pending' as const,
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
  };
  data.policies.push(newPolicy);
  return newPolicy;
}

export function getClaimsForPolicy(policyId: string) {
  return data.claims.filter((claim) => claim.policyId === policyId);
}
