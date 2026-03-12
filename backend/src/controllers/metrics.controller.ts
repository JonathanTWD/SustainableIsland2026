import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../config/db";

// GET /api/metrics/saved
// Returns total water saved today and estimated for the year (based on daily savings)
export const getTotalSaved = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany({ select: { id: true } });

    let totalSavedToday = 0;

    for (const user of users) {
      const latest = await prisma.waterCalculations.findFirst({
        where: { user_id: user.id },
        orderBy: { created_at: "desc" },
        take: 1,
      });

      if (!latest) continue;

      if (latest.household_members === null || latest.estimated_daily_consumption === null) continue;

      const reference = await prisma.waterReference.findFirst({
        where: { household_members: latest.household_members },
        select: { average_liters_per_day: true },
      });

      if (!reference || reference.average_liters_per_day === null) continue;

      const estimatedDaily = Number((latest.estimated_daily_consumption as unknown) as Prisma.Decimal);
      const referenceDaily = Number((reference.average_liters_per_day as unknown) as Prisma.Decimal);

      if (!Number.isFinite(estimatedDaily) || !Number.isFinite(referenceDaily)) continue;

      const saved = referenceDaily - estimatedDaily;

      if (saved > 0) totalSavedToday += saved;
    }

    const totalSavedYear = totalSavedToday * 365;

    res.json({ saved_today_liters: Number(totalSavedToday.toFixed(2)), saved_year_liters: Number(totalSavedYear.toFixed(2)) });
  } catch (error) {
    console.error("Error computing saved metrics:", error);
    res.status(500).json({ error: "Error computing saved metrics" });
  }
};

// GET /api/metrics/user/:userId/saved
// Returns the water saved today and this year for a specific user
export const getUserSavings = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    if (!Number.isInteger(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const calculations = await prisma.waterCalculations.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "asc" },
    });

    let savedToday = 0;
    let savedYear = 0;

    if (calculations.length > 0) {
      const startOfYear = new Date(new Date().getFullYear(), 0, 1).getTime();
      const now = new Date().getTime();

      const getReferenceForMembers = async (members: number | null) => {
        if (!members) return 0;
        const ref = await prisma.waterReference.findFirst({
          where: { household_members: members },
        });
        return ref?.average_liters_per_day ? Number(ref.average_liters_per_day) : 0;
      };

      for (let i = 0; i < calculations.length; i++) {
        const calc = calculations[i];
        if (!calc || calc.household_members === null || calc.estimated_daily_consumption === null) continue;

        const referenceDaily = await getReferenceForMembers(calc.household_members);
        const estimatedDaily = Number(calc.estimated_daily_consumption);

        const dailySavings = Math.max(0, referenceDaily - estimatedDaily);

        const intervalStart = calc.created_at.getTime();
        const nextCalc = calculations[i + 1];
        const intervalEnd = (i === calculations.length - 1 || !nextCalc) ? now : nextCalc.created_at.getTime();

        const effectiveStart = Math.max(intervalStart, startOfYear);
        const effectiveEnd = Math.min(intervalEnd, now);

        if (effectiveStart < effectiveEnd) {
          const daysActive = (effectiveEnd - effectiveStart) / (1000 * 60 * 60 * 24);
          savedYear += dailySavings * daysActive;
        }

        if (i === calculations.length - 1) {
          savedToday = dailySavings;
        }
      }
    }

    res.json({
      saved_today_liters: Number(savedToday.toFixed(2)),
      saved_year_liters: Number(savedYear.toFixed(2)),
    });
  } catch (error) {
    console.error("Error computing user savings metrics:", error);
    res.status(500).json({ error: "Error computing user savings metrics" });
  }
};
