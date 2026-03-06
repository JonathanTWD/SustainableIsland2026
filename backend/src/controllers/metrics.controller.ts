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
