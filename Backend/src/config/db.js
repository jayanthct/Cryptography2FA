const { Pool } = require("pg");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL is missing in your .env file");
  process.exit(1); // Stop server if DB URL is missing
}

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // Needed for Neon
  },
});

pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL via Neon"))
  .catch((err) => {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  });

module.exports = pool;
