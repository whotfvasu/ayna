import { Router } from "express";
import {
  submitFeedback,
  getAllFeedback,
  getFeedbackByForm,
  getFeedbackSummary,
  exportFeedbackCSV,
} from "../controllers/feedbackController.js";
import { protect } from "../middleware/protectMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = Router();

router.post("/", submitFeedback); // public
router.get("/", protect, admin, getAllFeedback); // admin
router.get("/form/:formId", protect, admin, getFeedbackByForm);
router.get("/form/:formId/summary", protect, admin, getFeedbackSummary);
router.get("/form/:formId/export", protect, admin, exportFeedbackCSV);

export default router;
