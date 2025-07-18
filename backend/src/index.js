import "dotenv/config";
import express from "express";
import connectDB from "./utils/db.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import formRoutes from "./routes/formRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/feedback", feedbackRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
