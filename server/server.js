// 1. Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// 2. Initialize app FIRST
const app = express();

// 3. Config
dotenv.config();

// 4. Middleware (AFTER app is created)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// 5. Routes
const memberRoutes = require("./routes/memberRoutes");
app.use("/api/members", memberRoutes);

// 6. MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// 7. Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});