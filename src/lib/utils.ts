import { Farmer, Policy } from './types';

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value >= 100 ? 0 : 2
  }).format(value);
}

export function formatPercent(value: number, fractionDigits = 0): string {
  return `${(value * 100).toFixed(fractionDigits)}%`;
}

export function formatDeltaPercent(value: number): string {
  const formatted = `${Math.abs(value).toFixed(0)}%`;
  return value >= 0 ? `+${formatted}` : `-${formatted}`;
}

export function policyExpiresInDays(policy: Policy): number {
  return Math.ceil((new Date(policy.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

export function nextExpiringPolicy(policies: Policy[]): Policy | undefined {
  return [...policies].sort((a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime())[0];
}

export function humanizeDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date));
}

export function describeChurnRisk(risk: Farmer['churnRisk']): string {
  switch (risk) {
    case 'high':
      return 'High churn risk – prioritize proactive outreach.';
    case 'med':
      return 'Medium churn risk – intelligence-backed nudges recommended.';
    default:
      return 'Low churn risk – maintain engagement cadence.';
  }
}
