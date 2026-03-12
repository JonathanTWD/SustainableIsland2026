import { Router } from "express";
import {
  createSavingGoal,
  deleteSavingGoal,
  // getAllSavingGoals,
  // getSavingGoalById,
  getSavingGoalsByUserId,
  updateSavingGoal,
} from "../controllers/saving-goal.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

// router.get("/", getAllSavingGoals); // GET /api/saving-goals
// router.get("/:id", getSavingGoalById); // GET /api/saving-goals/:id
router.get("/user/:userId", requireAuth, getSavingGoalsByUserId); // GET /api/saving-goals/user/:userId
router.post("/", requireAuth, createSavingGoal); // POST /api/saving-goals
router.put("/:id", requireAuth, updateSavingGoal); // PUT /api/saving-goals/:id
router.delete("/:id", requireAuth, deleteSavingGoal); // DELETE /api/saving-goals/:id

export default router;