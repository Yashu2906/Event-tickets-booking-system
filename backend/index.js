require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const { protect, adminOnly } = require("./middleware/authMiddleware");
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json());

// Test route
app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.json({
      message: "Server running & MySQL connected ✅",
    });
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use("/api/auth", authRoutes);
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user,
  });
});
app.get("/api/admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin" });
});
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  ``;
});
