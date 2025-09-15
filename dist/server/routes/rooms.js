"use strict";
/*let’s replace the mock generator in RoomMatrix.tsx
with a live API call to your backend. We’ll assume
your backend exposes something like:

GET /api/rooms
[
  { "id": 1, "number": "R01", "status": "occupied" },
  { "id": 2, "number": "R02", "status": "vacant" },
  ...
]
We’ll also prepare for real-time updates via
WebSockets (or Server-Sent Events) so landlords see
changes instantly.*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/routes/rooms.ts
const express_1 = require("express");
const db_1 = __importDefault(require("../db")); // pg client
const router = (0, express_1.Router)();
// Fetch all rooms
router.get("/", async (req, res) => {
    try {
        const result = await db_1.default.query("SELECT id, number, status FROM rooms ORDER BY id ASC");
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch rooms" });
    }
});
exports.default = router;
