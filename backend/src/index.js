import "dotenv/config";
import express from "express";
import connectDB from "./utils/db.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

const app = express();
app.use(express.json());

connectDB();

app.use("/api/feedback", feedbackRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
