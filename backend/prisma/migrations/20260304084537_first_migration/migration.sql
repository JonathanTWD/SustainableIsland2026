-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "water_calculations" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "household_members" INTEGER,
    "shower_minutes_per_day" INTEGER,
    "laundry_per_week" INTEGER,
    "dishwasher_per_week" INTEGER,
    "meat_servings_per_week" INTEGER,
    "coffee_cups_per_week" INTEGER,
    "clothes_purchased_per_month" INTEGER,
    "digital_services_hours_per_day" INTEGER,
    "estimated_daily_consumption" DECIMAL(10,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "water_calculations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "water_reference" (
    "id" SERIAL NOT NULL,
    "household_members" INTEGER,
    "average_liters_per_day" DECIMAL(10,2),

    CONSTRAINT "water_reference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saving_goals" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "target_liters_per_day" DECIMAL(10,2),
    "yearly_target_liters" DECIMAL(12,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saving_goals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "water_calculations" ADD CONSTRAINT "water_calculations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saving_goals" ADD CONSTRAINT "saving_goals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
