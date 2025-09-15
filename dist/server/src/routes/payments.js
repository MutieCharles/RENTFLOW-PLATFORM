"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const unified_payment_service_js_1 = require("../services/unified-payment-service.js");
const router = express_1.default.Router();
const stkSchema = zod_1.z.object({
    tenantId: zod_1.z.string(),
    phone: zod_1.z.string().regex(/^254[0-9]{9}$/),
    amount: zod_1.z.number().positive()
});
router.post("/stk-push", async (req, res) => {
    try {
        const parsed = stkSchema.parse(req.body);
        const result = await (0, unified_payment_service_js_1.unifiedStkPush)(parsed);
        res.json({ ok: true, result });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ ok: false, error: err.message });
    }
});
exports.default = router;
