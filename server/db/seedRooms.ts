#!/usr/bin/env ts-node-esm
import "dotenv/config";
import { Client } from "pg";


const client = new Client({
  connectionString: process.env.DATABASE_URL || "postgres://user:pass@localhost:5432/rentroll"
});

const seedRooms = async () => {
  try {
    await client.connect();

    // clear any old rooms
    await client.query("DELETE FROM rooms");

    const statuses = ["vacant", "occupied", "overdue"];
    const rooms = [];

    for (let i = 1; i <= 74; i++) {
      const number = `R${i.toString().padStart(2, "0")}`;
      const status = statuses[i % 3]; // rotate statuses for demo
      rooms.push({ number, status });
    }

    for (const r of rooms) {
      await client.query(
        "INSERT INTO rooms (number, status) VALUES ($1, $2)",
        [r.number, r.status]
      );
    }

    console.log("✅ Seeded 74 rooms successfully");
  } catch (err) {
    console.error("❌ Error seeding rooms:", err);
  } finally {
    await client.end();
  }
};

seedRooms();
