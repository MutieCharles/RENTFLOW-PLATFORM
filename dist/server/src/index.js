"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL || "postgres://user:pass@localhost:5432/rentroll"
});
exports.default = pool;
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
// simple rate limiter placeholder (production: use Redis + Express rate limiter)
const payments_js_1 = __importDefault(require("./routes/payments.js"));
const webhooks_js_1 = __importDefault(require("./routes/webhooks.js"));
const health_js_1 = __importDefault(require("./routes/health.js"));
app.use("/api/payments", payments_js_1.default);
app.use("/api/webhooks", webhooks_js_1.default);
app.use("/api/health", health_js_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`RentFlow server running on ${PORT}`));
const cors_1 = __importDefault(require("cors"));
const rooms_1 = __importDefault(require("./routes/rooms"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/rooms", rooms_1.default);
app.listen(4000, () => console.log("API running on http://localhost:4000"));
