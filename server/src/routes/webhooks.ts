import express from "express";
import { handleJengaWebhook } from "../services/payment-providers/jenga-provider.js";
import { handleSafaricomWebhook } from "../services/payment-providers/safaricom-provider.js";
import { handleCoopWebhook } from "../services/payment-providers/coop-provider.js";

const router = express.Router();

router.post("/jenga", express.json({ type: "*/*" }), async (req, res) => {
  try {
    await handleJengaWebhook(req);
    res.status(200).send("OK");
  } catch (e) {
    console.error("jenga webhook error", e);
    res.status(400).send("ERR");
  }
});

router.post("/safaricom", express.json({ type: "*/*" }), async (req, res) => {
  try {
    await handleSafaricomWebhook(req);
    res.status(200).send("OK");
  } catch (e) {
    console.error("safaricom webhook error", e);
    res.status(400).send("ERR");
  }
});

router.post("/coop", express.json({ type: "*/*" }), async (req, res) => {
  try {
    await handleCoopWebhook(req);
    res.status(200).send("OK");
  } catch (e) {
    console.error("coop webhook error", e);
    res.status(400).send("ERR");
  }
});

export default router;
