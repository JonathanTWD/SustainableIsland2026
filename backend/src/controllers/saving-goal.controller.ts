import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../config/db";
import { CreateSavingGoalDTO, UpdateSavingGoalDTO, SavingGoalResponse } from "../interfaces/saving-goal.interface";
import { parseIdParam } from "../utils/id.util";
import { toNullableDecimal } from "../utils/nullable-decimal.util";

const mapSavingGoal = (
  goal: {
    id: number;
    user_id: number;
    target_liters_per_day: Prisma.Decimal | null;
    yearly_target_liters: Prisma.Decimal | null;
    created_at: Date;
  },
): SavingGoalResponse => ({
  id: goal.id,
  user_id: goal.user_id,
  target_liters_per_day: goal.target_liters_per_day === null ? null : Number(goal.target_liters_per_day),
  yearly_target_liters: goal.yearly_target_liters === null ? null : Number(goal.yearly_target_liters),
  created_at: goal.created_at,
});

// GET /api/saving-goals
export const getAllSavingGoals = async (_req: Request, res: Response) => {
  try {
    const records = await prisma.savingGoals.findMany({
      orderBy: { created_at: "desc" },
    });

    res.json(records.map(mapSavingGoal));
  } catch (error) {
    console.error("Error fetching saving goals:", error);
    res.status(500).json({ error: "Error fetching saving goals" });
  }
};

// GET /api/saving-goals/:id
export const getSavingGoalById = async (req: Request, res: Response) => {
  try {
    const id = parseIdParam(req.params.id);

    if (id === null) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const goal = await prisma.savingGoals.findUnique({
      where: { id },
    });

    if (!goal) {
      return res.status(404).json({ error: "Saving goal not found" });
    }

    res.json(mapSavingGoal(goal));
  } catch (error) {
    console.error("Error fetching saving goal:", error);
    res.status(500).json({ error: "Error fetching saving goal" });
  }
};

// GET /api/saving-goals/user/:userId
export const getSavingGoalsByUserId = async (req: Request, res: Response) => {
  try {
    const userId = parseIdParam(req.params.userId);

    if (userId === null) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const records = await prisma.savingGoals.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
    });

    res.json(records.map(mapSavingGoal));
  } catch (error) {
    console.error("Error fetching user saving goals:", error);
    res.status(500).json({ error: "Error fetching user saving goals" });
  }
};

// POST /api/saving-goals
export const createSavingGoal = async (req: Request, res: Response) => {
  try {
    const payload: CreateSavingGoalDTO = req.body;

    if (!Number.isInteger(payload.user_id) || payload.user_id <= 0) {
      return res.status(400).json({ error: "Valid user_id is required" });
    }

    const userExists = await prisma.users.findUnique({
      where: { id: payload.user_id },
      select: { id: true },
    });

    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const goal = await prisma.savingGoals.create({
      data: {
        user_id: payload.user_id,
        target_liters_per_day: toNullableDecimal(payload.target_liters_per_day),
        yearly_target_liters: toNullableDecimal(payload.yearly_target_liters),
      },
    });

    res.status(201).json(mapSavingGoal(goal));
  } catch (error) {
    console.error("Error creating saving goal:", error);
    res.status(500).json({ error: "Error creating saving goal" });
  }
};

// PUT /api/saving-goals/:id
export const updateSavingGoal = async (req: Request, res: Response) => {
  try {
    const id = parseIdParam(req.params.id);

    if (id === null) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const payload: UpdateSavingGoalDTO = req.body;

    const existing = await prisma.savingGoals.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existing) {
      return res.status(404).json({ error: "Saving goal not found" });
    }

    const updateData: Prisma.SavingGoalsUpdateInput = {};

    if (payload.target_liters_per_day !== undefined) {
      updateData.target_liters_per_day = toNullableDecimal(payload.target_liters_per_day);
    }

    if (payload.yearly_target_liters !== undefined) {
      updateData.yearly_target_liters = toNullableDecimal(payload.yearly_target_liters);
    }

    const updated = await prisma.savingGoals.update({
      where: { id },
      data: updateData,
    });

    res.json(mapSavingGoal(updated));
  } catch (error) {
    console.error("Error updating saving goal:", error);
    res.status(500).json({ error: "Error updating saving goal" });
  }
};

// DELETE /api/saving-goals/:id
export const deleteSavingGoal = async (req: Request, res: Response) => {
  try {
    const id = parseIdParam(req.params.id);

    if (id === null) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const existing = await prisma.savingGoals.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existing) {
      return res.status(404).json({ error: "Saving goal not found" });
    }

    await prisma.savingGoals.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting saving goal:", error);
    res.status(500).json({ error: "Error deleting saving goal" });
  }
};
