import { Router } from "express";
import {
  createWaterCalculation,
  deleteWaterCalculation,
  // getAllWaterCalculations,
  // getWaterCalculationById,
  getWaterCalculationsByUserId,
  updateWaterCalculation,
} from "../controllers/water-calculation.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

// router.get("/", getAllWaterCalculations); // GET /api/water-calculations
// router.get("/:id", getWaterCalculationById); // GET /api/water-calculations/:id
router.get("/user/:userId", requireAuth, getWaterCalculationsByUserId); // GET /api/water-calculations/user/:userId
router.post("/", requireAuth, createWaterCalculation); // POST /api/water-calculations
router.put("/:id", requireAuth, updateWaterCalculation); // PUT /api/water-calculations/:id
router.delete("/:id", requireAuth, deleteWaterCalculation); // DELETE /api/water-calculations/:id

export default router;
