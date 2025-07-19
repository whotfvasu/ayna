import { Router } from "express";
import {
  createForm,
  getForms,
  getFormById,
} from "../controllers/formController.js";
import { protect } from "../middleware/protectMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = Router();

// admin
router.post("/", protect,admin, createForm);
router.get("/", protect,admin, getForms);

// public(janta)
router.get("/:id", getFormById);

export default router;
