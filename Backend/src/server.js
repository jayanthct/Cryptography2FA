require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { neon } = require("@neondatabase/serverless");

const { CONNECTION } = process.env;
const sql = neon(CONNECTION);

const app = express();
const PORT = process.env.PORT || 5000;  // Allow for dynamic port assignment

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is Running.......");
});

// Put your routes here, for example:
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

