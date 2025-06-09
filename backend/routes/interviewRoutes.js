// backend/routes/interviewRoutes.js

import express from "express";
import { saveInterviewResult } from "../controllers/interviewController.js";

const router = express.Router();

// POST route to save interview data
router.post("/save", saveInterviewResult);

export default router;
