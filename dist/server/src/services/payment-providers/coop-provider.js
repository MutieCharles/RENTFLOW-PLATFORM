"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coopStkPush = coopStkPush;
exports.handleCoopWebhook = handleCoopWebhook;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BASE = process.env.COOP_BASE_URL || "https://developer.co-opbank.co.ke";
const KEY = process.env.COOP_API_KEY || "";
async function coopStkPush({ phone, amount, accountRef }) {
    // Simplified example - many banks need signed requests / OAuth
    const url = `${BASE}/sandbox/payments/stk-push`;
    const body = { phone, amount, accountRef, callbackUrl: `${process.env.BASE_URL}/api/webhooks/coop` };
    const r = await axios_1.default.post(url, body, { headers: { Authorization: `Bearer ${KEY}` } });
    return { success: true, raw: r.data };
}
async function handleCoopWebhook(req) {
    const body = req.body;
    console.log("coop webhook", JSON.stringify(body).slice(0, 500));
    return true;
}
