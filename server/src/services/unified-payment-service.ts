import { jengaStkPush } from "./payment-providers/jenga-provider.js";
import { safaricomStkPush } from "./payment-providers/safaricom-provider.js";
import { coopStkPush } from "./payment-providers/coop-provider.js";

/**
 * Simple routing strategy for sandbox:
 * - Try Safaricom STK for customers with Safaricom (simulated) -> fallback to Jenga -> COOP
 * In production, use provider capability, cost, current health & historical success rate.
 */
export async function unifiedStkPush({ tenantId, phone, amount }: { tenantId: string; phone: string; amount: number }) {
  // Simulated capability check; in production query provider health & tenant preference
  try {
    // try Safaricom first
    const s = await safaricomStkPush({ phone, amount, accountRef: tenantId, description: "RentFlow rent" });
    if (s.success) return { provider: "safaricom", data: s };
  } catch (e) {
    console.warn("safaricom failed:", e);
  }

  try {
    const j = await jengaStkPush({ phone, amount, accountRef: tenantId });
    if (j.success) return { provider: "jenga", data: j };
  } catch (e) {
    console.warn("jenga failed:", e);
  }

  // final fallback
  const c = await coopStkPush({ phone, amount, accountRef: tenantId });
  return { provider: "coop", data: c };
}
