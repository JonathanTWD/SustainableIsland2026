import { Router } from "express";
import { getTotalSaved } from "../controllers/metrics.controller";

const router = Router();

// GET /api/metrics/saved -> { saved_today_liters, saved_year_liters }
router.get("/saved", getTotalSaved);

export default router;
