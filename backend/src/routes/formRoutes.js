import { Router } from "express";
import {
  createForm,
  getForms,
  getFormById,
} from "../controllers/formController.js";
import { protect } from "../middleware/protectMiddleware.js";

const router = Router();

// admin
router.post("/", protect, createForm);
router.get("/", protect, getForms);

// public(janta)
router.get("/:id", getFormById);

export default router;
