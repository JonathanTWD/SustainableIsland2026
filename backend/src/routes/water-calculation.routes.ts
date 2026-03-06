import { Router } from "express";
import {
  createWaterCalculation,
  deleteWaterCalculation,
  getAllWaterCalculations,
  getWaterCalculationById,
  getWaterCalculationsByUserId,
  updateWaterCalculation,
} from "../controllers/water-calculation.controller";

const router = Router();

router.get("/", getAllWaterCalculations); // GET /api/water-calculations
router.get("/:id", getWaterCalculationById); // GET /api/water-calculations/:id
router.get("/user/:userId", getWaterCalculationsByUserId); // GET /api/water-calculations/user/:userId
router.post("/", createWaterCalculation); // POST /api/water-calculations
router.put("/:id", updateWaterCalculation); // PUT /api/water-calculations/:id
router.delete("/:id", deleteWaterCalculation); // DELETE /api/water-calculations/:id

export default router;