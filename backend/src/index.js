import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import formRoutes from "./routes/formRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL
      : ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/feedback", feedbackRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
