import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const BASE = process.env.COOP_BASE_URL || "https://developer.co-opbank.co.ke";
const KEY = process.env.COOP_API_KEY || "";

export async function coopStkPush({ phone, amount, accountRef }: { phone: string; amount: number; accountRef: string }) {
  // Simplified example - many banks need signed requests / OAuth
  const url = `${BASE}/sandbox/payments/stk-push`;
  const body = { phone, amount, accountRef, callbackUrl: `${process.env.BASE_URL}/api/webhooks/coop`};
  const r = await axios.post(url, body, { headers: { Authorization: `Bearer ${KEY}` }});
  return { success: true, raw: r.data };
}

export async function handleCoopWebhook(req: any) {
  const body = req.body;
  console.log("coop webhook", JSON.stringify(body).slice(0,500));
  return true;
}
