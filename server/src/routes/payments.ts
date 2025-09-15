import express from "express";
import { z } from "zod";
import { unifiedStkPush } from "../services/unified-payment-service.js";

const router = express.Router();

const stkSchema = z.object({
  tenantId: z.string(),
  phone: z.string().regex(/^254[0-9]{9}$/),
  amount: z.number().positive()
});

router.post("/stk-push", async (req, res) => {
  try {
    const parsed = stkSchema.parse(req.body);
    const result = await unifiedStkPush(parsed);
    res.json({ ok: true, result });
  } catch (err) {
    console.error(err);
    res.status(400).json({ ok: false, error: (err as Error).message });
  }
});

export default router;
