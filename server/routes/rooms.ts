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


// server/routes/rooms.ts
import { Router } from "express";
import db from "../db"; // pg client

const router = Router();

// Fetch all rooms
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT id, number, status FROM rooms ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

export default router;
