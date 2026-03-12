import { Router } from "express";
import { getTotalSaved, getUserSavings } from "../controllers/metrics.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

// global stats
router.get("/saved", getTotalSaved);

// user personal stats
router.get("/user/:userId/saved", requireAuth, getUserSavings);

export default router;
