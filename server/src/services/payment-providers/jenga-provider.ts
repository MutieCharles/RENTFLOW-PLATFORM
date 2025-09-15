import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const BASE = process.env.JENGA_BASE_URL || "https://sandbox.jengahq.io";
const API_KEY = process.env.JENGA_API_KEY || "";

export async function jengaStkPush({ phone, amount, accountRef }: { phone: string; amount: number; accountRef: string }) {
  // Jenga has multiple endpoints depending on setup; here we use a sample payments endpoint
  const url = `${BASE}/payments/v1/transactions`;
  const body = {
    merchantCode: process.env.JENGA_MERCHANT_CODE,
    amount: amount,
    phone: phone,
    externalId: accountRef,
    callbackUrl: `${process.env.BASE_URL}/api/webhooks/jenga`
  };
  const r = await axios.post(url, body, { headers: { "x-api-key": API_KEY }});
  return { success: true, raw: r.data };
}

export async function handleJengaWebhook(req: any) {
  const body = req.body;
  console.log("jenga webhook", JSON.stringify(body).slice(0,500));
  // verify webhook signature if Jenga provides one; else rely on secret endpoint + IP allowlist
  return true;
}
