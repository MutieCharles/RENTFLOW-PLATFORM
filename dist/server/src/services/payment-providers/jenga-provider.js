"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jengaStkPush = jengaStkPush;
exports.handleJengaWebhook = handleJengaWebhook;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BASE = process.env.JENGA_BASE_URL || "https://sandbox.jengahq.io";
const API_KEY = process.env.JENGA_API_KEY || "";
async function jengaStkPush({ phone, amount, accountRef }) {
    // Jenga has multiple endpoints depending on setup; here we use a sample payments endpoint
    const url = `${BASE}/payments/v1/transactions`;
    const body = {
        merchantCode: process.env.JENGA_MERCHANT_CODE,
        amount: amount,
        phone: phone,
        externalId: accountRef,
        callbackUrl: `${process.env.BASE_URL}/api/webhooks/jenga`
    };
    const r = await axios_1.default.post(url, body, { headers: { "x-api-key": API_KEY } });
    return { success: true, raw: r.data };
}
async function handleJengaWebhook(req) {
    const body = req.body;
    console.log("jenga webhook", JSON.stringify(body).slice(0, 500));
    // verify webhook signature if Jenga provides one; else rely on secret endpoint + IP allowlist
    return true;
}
