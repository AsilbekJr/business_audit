export interface AuditInputs {
  isBusinessOwner: boolean;
  hasCrm: boolean;
  hasSalesTeam: boolean;
  socialMediaStatus: 'good' | 'bad' | 'none'; // Simplified for now
  field: string;
  platform: string;
  monthlyRevenueGoal: number;
  avgCheck: number;
  conversionRate: number; // Percentage (e.g., 30)
}

export interface AuditResults {
  requiredClients: number;
  requiredLeads: number;
  minBudget: number;
  optimalBudget: number;
  realBudget: number; // With penalties
  cplMin: number;
  cplMax: number;
  penalties: {
    noCrm: boolean;
    noSalesTeam: boolean;
    totalPenaltyPercent: number;
  };
}

export const calculateAudit = (inputs: AuditInputs): AuditResults => {
  const { monthlyRevenueGoal, avgCheck, conversionRate, hasCrm, hasSalesTeam } = inputs;
  
  // Benchmark CPL (Cost Per Lead)
  const cplMin = 0.8;
  const cplMax = 1.5;

  // 1. Required Clients
  // Formula: Revenue / AvgCheck
  const requiredClients = Math.ceil(monthlyRevenueGoal / avgCheck);

  // 2. Required Leads
  // Formula: Clients / (ConversionRate / 100)
  const requiredLeads = Math.ceil(requiredClients / (conversionRate / 100));

  // 3. Base Budget
  const minBudget = requiredLeads * cplMin;
  const optimalBudget = requiredLeads * cplMax;

  // 4. Penalties
  let totalPenaltyPercent = 0;
  if (!hasCrm) totalPenaltyPercent += 20;
  if (!hasSalesTeam) totalPenaltyPercent += 20;

  // 5. Real Budget (Effective budget needed due to inefficiencies)
  // If efficiency drops, you need MORE budget to get same result? 
  // Or cost per result increases. 
  // User Prompt says: "Sizda tizim bo'lmagani uchun real byudjet 40% ga qimmatroq tushishi mumkin."
  // So we add 40% to the optimal budget for the "Real" estimate.
  const penaltyMultiplier = 1 + (totalPenaltyPercent / 100);
  const realBudget = optimalBudget * penaltyMultiplier;

  return {
    requiredClients,
    requiredLeads,
    minBudget,
    optimalBudget,
    realBudget,
    cplMin,
    cplMax,
    penalties: {
      noCrm: !hasCrm,
      noSalesTeam: !hasSalesTeam,
      totalPenaltyPercent
    }
  };
};
