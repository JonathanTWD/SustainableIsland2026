import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../config/db";
import { CreateWaterCalculationDTO, UpdateWaterCalculationDTO, WaterCalculationResponse } from "../interfaces/water-calculation.interface";
import { parseIdParam } from "../utils/id.util";
import { toNullableDecimal } from "../utils/nullable-decimal.util";
import { AuthRequest } from "../interfaces/auth.interface";

const toNullableInt = (value: number | undefined): number | null => {
  if (value === undefined) {
    return null;
  }

  if (!Number.isInteger(value) || value < 0) {
    return null;
  }

  return value;
};

const mapWaterCalculation = (
  waterCalculation: {
    id: number;
    user_id: number;
    household_members: number | null;
    shower_minutes_per_day: number | null;
    laundry_per_week: number | null;
    dishwasher_per_week: number | null;
    meat_servings_per_week: number | null;
    coffee_cups_per_week: number | null;
    clothes_purchased_per_month: number | null;
    digital_services_hours_per_day: number | null;
    estimated_daily_consumption: Prisma.Decimal | null;
    created_at: Date;
  },
): WaterCalculationResponse => ({
  ...waterCalculation,
  estimated_daily_consumption:
    waterCalculation.estimated_daily_consumption === null
      ? null
      : Number(waterCalculation.estimated_daily_consumption),
});

// // GET /api/water-calculations
// export const getAllWaterCalculations = async (_req: Request, res: Response) => {
//   try {
//     const records = await prisma.waterCalculations.findMany({
//       orderBy: { created_at: "desc" },
//     });

//     res.json(records.map(mapWaterCalculation));
//   } catch (error) {
//     console.error("Error fetching water calculations:", error);
//     res.status(500).json({ error: "Error fetching water calculations" });
//   }
// };

// // GET /api/water-calculations/:id
// export const getWaterCalculationById = async (req: Request, res: Response) => {
//   try {
//     const id = parseIdParam(req.params.id);

//     if (id === null) {
//       return res.status(400).json({ error: "Invalid ID" });
//     }

//     const record = await prisma.waterCalculations.findUnique({
//       where: { id },
//     });

//     if (!record) {
//       return res.status(404).json({ error: "Water calculation not found" });
//     }

//     res.json(mapWaterCalculation(record));
//   } catch (error) {
//     console.error("Error fetching water calculation:", error);
//     res.status(500).json({ error: "Error fetching water calculation" });
//   }
// };

// GET /api/water-calculations/user/:userId
export const getWaterCalculationsByUserId = async (req: Request, res: Response) => {
  try {
    const userId = parseIdParam(req.params.userId);
    const authReq = req as AuthRequest;

    if (userId === null) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    if (userId !== authReq.user?.userId) {
      return res.status(403).json({ error: "Forbidden: You can only view your own calculations" });
    }

    const records = await prisma.waterCalculations.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
    });

    res.json(records.map(mapWaterCalculation));
  } catch (error) {
    console.error("Error fetching user water calculations:", error);
    res.status(500).json({ error: "Error fetching user water calculations" });
  }
};

// POST /api/water-calculations
export const createWaterCalculation = async (req: Request, res: Response) => {
  try {
    const payload: CreateWaterCalculationDTO = req.body;
    const authReq = req as AuthRequest;

    if (!Number.isInteger(payload.user_id) || payload.user_id <= 0) {
      return res.status(400).json({ error: "Valid user_id is required" });
    }

    if (authReq.user?.userId !== payload.user_id) {
      return res.status(403).json({ error: "Forbidden: You can only create calculations for your own account" });
    }

    const userExists = await prisma.users.findUnique({
      where: { id: payload.user_id },
      select: { id: true },
    });

    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Note: estimated_daily_consumption is calculated on client-side and sent by frontend
    const record = await prisma.waterCalculations.create({
      data: {
        user_id: payload.user_id,
        household_members: toNullableInt(payload.household_members),
        shower_minutes_per_day: toNullableInt(payload.shower_minutes_per_day),
        laundry_per_week: toNullableInt(payload.laundry_per_week),
        dishwasher_per_week: toNullableInt(payload.dishwasher_per_week),
        meat_servings_per_week: toNullableInt(payload.meat_servings_per_week),
        coffee_cups_per_week: toNullableInt(payload.coffee_cups_per_week),
        clothes_purchased_per_month: toNullableInt(payload.clothes_purchased_per_month),
        digital_services_hours_per_day: toNullableInt(payload.digital_services_hours_per_day),
        estimated_daily_consumption: toNullableDecimal(payload.estimated_daily_consumption),
      },
    });

    res.status(201).json(mapWaterCalculation(record));
  } catch (error) {
    console.error("Error creating water calculation:", error);
    res.status(500).json({ error: "Error creating water calculation" });
  }
};

// PUT /api/water-calculations/:id
export const updateWaterCalculation = async (req: Request, res: Response) => {
  try {
    const id = parseIdParam(req.params.id);
    const authReq = req as AuthRequest;

    if (id === null) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const payload: UpdateWaterCalculationDTO = req.body;

    const existing = await prisma.waterCalculations.findUnique({
      where: { id },
      select: { id: true, user_id: true },
    });

    if (!existing) {
      return res.status(404).json({ error: "Water calculation not found" });
    }

    if (existing.user_id !== authReq.user?.userId) {
      return res.status(403).json({ error: "Forbidden: You can only edit your own calculations" });
    }

    const updateData: Prisma.WaterCalculationsUpdateInput = {};

    if (payload.household_members !== undefined) {
      updateData.household_members = toNullableInt(payload.household_members);
    }

    if (payload.shower_minutes_per_day !== undefined) {
      updateData.shower_minutes_per_day = toNullableInt(payload.shower_minutes_per_day);
    }

    if (payload.laundry_per_week !== undefined) {
      updateData.laundry_per_week = toNullableInt(payload.laundry_per_week);
    }

    if (payload.dishwasher_per_week !== undefined) {
      updateData.dishwasher_per_week = toNullableInt(payload.dishwasher_per_week);
    }

    if (payload.meat_servings_per_week !== undefined) {
      updateData.meat_servings_per_week = toNullableInt(payload.meat_servings_per_week);
    }

    if (payload.coffee_cups_per_week !== undefined) {
      updateData.coffee_cups_per_week = toNullableInt(payload.coffee_cups_per_week);
    }

    if (payload.clothes_purchased_per_month !== undefined) {
      updateData.clothes_purchased_per_month = toNullableInt(payload.clothes_purchased_per_month);
    }

    if (payload.digital_services_hours_per_day !== undefined) {
      updateData.digital_services_hours_per_day = toNullableInt(payload.digital_services_hours_per_day);
    }

    if (payload.estimated_daily_consumption !== undefined) {
      // Client-side calculated value
      updateData.estimated_daily_consumption = toNullableDecimal(payload.estimated_daily_consumption);
    }

    const updated = await prisma.waterCalculations.update({
      where: { id },
      data: updateData,
    });

    res.json(mapWaterCalculation(updated));
  } catch (error) {
    console.error("Error updating water calculation:", error);
    res.status(500).json({ error: "Error updating water calculation" });
  }
};

// DELETE /api/water-calculations/:id
export const deleteWaterCalculation = async (req: Request, res: Response) => {
  try {
    const id = parseIdParam(req.params.id);
    const authReq = req as AuthRequest;

    if (id === null) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const existing = await prisma.waterCalculations.findUnique({
      where: { id },
      select: { id: true, user_id: true },
    });

    if (!existing) {
      return res.status(404).json({ error: "Water calculation not found" });
    }

    if (existing.user_id !== authReq.user?.userId) {
      return res.status(403).json({ error: "Forbidden: You can only delete your own calculations" });
    }

    await prisma.waterCalculations.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting water calculation:", error);
    res.status(500).json({ error: "Error deleting water calculation" });
  }
};
