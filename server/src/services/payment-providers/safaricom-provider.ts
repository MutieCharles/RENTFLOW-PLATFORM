import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const BASE = process.env.SAFARICOM_BASE_URL || "https://sandbox.safaricom.co.ke";
const SHORTCODE = process.env.SAFARICOM_SHORTCODE || "174379";
const PASSKEY = process.env.SAFARICOM_PASSKEY || "";
const CK = process.env.SAFARICOM_CONSUMER_KEY!;
const CS = process.env.SAFARICOM_CONSUMER_SECRET!;

async function getToken() {
  const tokenUrl = `${BASE}/oauth/v1/generate?grant_type=client_credentials`;
  const resp = await axios.get(tokenUrl, {
    auth: { username: CK, password: CS }
  });
  return resp.data.access_token;
}

export async function safaricomStkPush({ phone, amount, accountRef, description }: { phone: string; amount: number; accountRef: string; description?: string }) {
  const token = await getToken();
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0,14);
  const password = Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString("base64");
  const payload = {
    BusinessShortCode: SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: Math.round(amount),
    PartyA: phone,
    PartyB: SHORTCODE,
    PhoneNumber: phone,
    CallBackURL: `${process.env.BASE_URL}/api/webhooks/safaricom`,
    AccountReference: accountRef,
    TransactionDesc: description || "Rent payment"
  };

  const url = `${BASE}/mpesa/stkpush/v1/processrequest`;
  const r = await axios.post(url, payload, { headers: { Authorization: `Bearer ${token}` }});
  return { success: true, raw: r.data };
}

/**
 * Basic webhook handler: in production implement signature validation per Safaricom docs.
 */
export async function handleSafaricomWebhook(req: any) {
  // Safaricom sandbox posts JSON body; store into payments table and respond 200
  const body = req.body;
  console.log("safaricom webhook", JSON.stringify(body).slice(0,500));
  // TODO: verify and reconcile with your payments table
  return true;
}
