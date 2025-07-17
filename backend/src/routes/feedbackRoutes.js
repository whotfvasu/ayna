import { Router } from "express";
import {
  submitFeedback,
  getAllFeedback,
} from "../controllers/feedbackController.js";

const router = Router();

router.post("/", submitFeedback);
router.get("/", getAllFeedback);

export default router;
