import { Prisma } from "@prisma/client";

export const toNullableDecimal = (value: number | undefined): Prisma.Decimal | null => {
  if (value === undefined) {
    return null;
  }

  if (!Number.isFinite(value) || value < 0) {
    return null;
  }

  return new Prisma.Decimal(value);
};