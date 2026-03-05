import { Router } from "express";
import {
  createSavingGoal,
  deleteSavingGoal,
  getAllSavingGoals,
  getSavingGoalById,
  getSavingGoalsByUserId,
  updateSavingGoal,
} from "../controllers/saving-goal.controller";

const router = Router();

router.get("/", getAllSavingGoals); // GET /api/saving-goals
router.get("/:id", getSavingGoalById); // GET /api/saving-goals/:id
router.get("/user/:userId", getSavingGoalsByUserId); // GET /api/saving-goals/user/:userId
router.post("/", createSavingGoal); // POST /api/saving-goals
router.put("/:id", updateSavingGoal); // PUT /api/saving-goals/:id
router.delete("/:id", deleteSavingGoal); // DELETE /api/saving-goals/:id

export default router;
