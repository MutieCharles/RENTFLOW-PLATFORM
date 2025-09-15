import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://user:pass@localhost:5432/rentroll"
});

export default pool;


dotenv.config();
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

// simple rate limiter placeholder (production: use Redis + Express rate limiter)
import paymentRoutes from "./routes/payments.js";
import webhookRoutes from "./routes/webhooks.js";
import health from "./routes/health.js";

app.use("/api/payments", paymentRoutes);
app.use("/api/webhooks", webhookRoutes);
app.use("/api/health", health);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`RentFlow server running on ${PORT}`));

// server/index.ts
import express from "express";
import cors from "cors";
import roomsRouter from "./routes/rooms";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/rooms", roomsRouter);

app.listen(4000, () => console.log("API running on http://localhost:4000"));

