const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const fileRoutes = require("./routes/fileRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

// API Routes
app.use("/api", fileRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
