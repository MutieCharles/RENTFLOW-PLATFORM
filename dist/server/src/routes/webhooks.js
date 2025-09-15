"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jenga_provider_js_1 = require("../services/payment-providers/jenga-provider.js");
const safaricom_provider_js_1 = require("../services/payment-providers/safaricom-provider.js");
const coop_provider_js_1 = require("../services/payment-providers/coop-provider.js");
const router = express_1.default.Router();
router.post("/jenga", express_1.default.json({ type: "*/*" }), async (req, res) => {
    try {
        await (0, jenga_provider_js_1.handleJengaWebhook)(req);
        res.status(200).send("OK");
    }
    catch (e) {
        console.error("jenga webhook error", e);
        res.status(400).send("ERR");
    }
});
router.post("/safaricom", express_1.default.json({ type: "*/*" }), async (req, res) => {
    try {
        await (0, safaricom_provider_js_1.handleSafaricomWebhook)(req);
        res.status(200).send("OK");
    }
    catch (e) {
        console.error("safaricom webhook error", e);
        res.status(400).send("ERR");
    }
});
router.post("/coop", express_1.default.json({ type: "*/*" }), async (req, res) => {
    try {
        await (0, coop_provider_js_1.handleCoopWebhook)(req);
        res.status(200).send("OK");
    }
    catch (e) {
        console.error("coop webhook error", e);
        res.status(400).send("ERR");
    }
});
exports.default = router;
