"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unifiedStkPush = unifiedStkPush;
const jenga_provider_js_1 = require("./payment-providers/jenga-provider.js");
const safaricom_provider_js_1 = require("./payment-providers/safaricom-provider.js");
const coop_provider_js_1 = require("./payment-providers/coop-provider.js");
/**
 * Simple routing strategy for sandbox:
 * - Try Safaricom STK for customers with Safaricom (simulated) -> fallback to Jenga -> COOP
 * In production, use provider capability, cost, current health & historical success rate.
 */
async function unifiedStkPush({ tenantId, phone, amount }) {
    // Simulated capability check; in production query provider health & tenant preference
    try {
        // try Safaricom first
        const s = await (0, safaricom_provider_js_1.safaricomStkPush)({ phone, amount, accountRef: tenantId, description: "RentFlow rent" });
        if (s.success)
            return { provider: "safaricom", data: s };
    }
    catch (e) {
        console.warn("safaricom failed:", e);
    }
    try {
        const j = await (0, jenga_provider_js_1.jengaStkPush)({ phone, amount, accountRef: tenantId });
        if (j.success)
            return { provider: "jenga", data: j };
    }
    catch (e) {
        console.warn("jenga failed:", e);
    }
    // final fallback
    const c = await (0, coop_provider_js_1.coopStkPush)({ phone, amount, accountRef: tenantId });
    return { provider: "coop", data: c };
}
