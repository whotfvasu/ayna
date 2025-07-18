import { Router } from "express";
import {
  submitFeedback,
  getAllFeedback,
  getFeedbackByForm,
  getFeedbackSummary,
  exportFeedbackCSV,
} from "../controllers/feedbackController.js";
import { protect } from "../middleware/protectMiddleware.js";

const router = Router();

router.post("/", submitFeedback);
router.get("/", protect, getAllFeedback);
router.get("/form/:formId", protect, getFeedbackByForm);
router.get("/form/:formId/summary", protect, getFeedbackSummary);
router.get("/form/:formId/export", protect, exportFeedbackCSV);

export default router;
