import { Router } from "express";
import {
  createForm,
  getForms,
  getFormById,
} from "../controllers/formController.js";

const router = Router();

// admin
router.post("/", createForm);
router.get("/", getForms);

// public(janta)
router.get("/:id", getFormById);

export default router;
