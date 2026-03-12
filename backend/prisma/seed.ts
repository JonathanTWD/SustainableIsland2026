import { prisma } from "../src/config/db";
import bcrypt from "bcrypt";

async function main() {
	await prisma.waterCalculations.deleteMany();
	await prisma.savingGoals.deleteMany();
	await prisma.users.deleteMany();
	await prisma.waterReference.deleteMany();

	const saltRounds = 10;

	await prisma.users.createMany({
		data: [
			{
				name: "Ana Torres",
				email: "ana.torres@example.com",
				password_hash: await bcrypt.hash("password123", saltRounds),
			},
			{
				name: "Luis Gómez",
				email: "luis.gomez@example.com",
				password_hash: await bcrypt.hash("password123", saltRounds),
			},
			{
				name: "Carla Ruiz",
				email: "carla.ruiz@example.com",
				password_hash: await bcrypt.hash("password123", saltRounds),
			},
		],
	});

	const users = await prisma.users.findMany({
		where: {
			email: {
				in: [
					"ana.torres@example.com",
					"luis.gomez@example.com",
					"carla.ruiz@example.com",
				],
			},
		},
		select: { id: true, email: true },
	});

	const userByEmail = new Map(users.map((user) => [user.email, user.id]));

	await prisma.waterReference.createMany({
		data: [
			{ household_members: 1, average_liters_per_day: 128 },
			{ household_members: 2, average_liters_per_day: 256 },
			{ household_members: 3, average_liters_per_day: 384 },
			{ household_members: 4, average_liters_per_day: 512 },
			{ household_members: 5, average_liters_per_day: 640 },
		],
	});

	await prisma.waterCalculations.createMany({
		data: [
			{
				user_id: userByEmail.get("ana.torres@example.com")!,
				household_members: 2,
				shower_minutes_per_day: 12,
				laundry_per_week: 3,
				dishwasher_per_week: 4,
				meat_servings_per_week: 7,
				coffee_cups_per_week: 10,
				clothes_purchased_per_month: 2,
				digital_services_hours_per_day: 3,
				estimated_daily_consumption: 295.5,
			},
			{
				user_id: userByEmail.get("luis.gomez@example.com")!,
				household_members: 4,
				shower_minutes_per_day: 10,
				laundry_per_week: 5,
				dishwasher_per_week: 6,
				meat_servings_per_week: 12,
				coffee_cups_per_week: 14,
				clothes_purchased_per_month: 3,
				digital_services_hours_per_day: 5,
				estimated_daily_consumption: 534.75,
			},
			{
				user_id: userByEmail.get("carla.ruiz@example.com")!,
				household_members: 1,
				shower_minutes_per_day: 8,
				laundry_per_week: 2,
				dishwasher_per_week: 0,
				meat_servings_per_week: 2,
				coffee_cups_per_week: 4,
				clothes_purchased_per_month: 1,
				digital_services_hours_per_day: 2,
				estimated_daily_consumption: 138.2,
			},
		],
	});

	await prisma.savingGoals.createMany({
		data: [
			{
				user_id: userByEmail.get("ana.torres@example.com")!,
				target_liters_per_day: 260,
				yearly_target_liters: 13000,
			},
			{
				user_id: userByEmail.get("luis.gomez@example.com")!,
				target_liters_per_day: 470,
				yearly_target_liters: 23000,
			},
			{
				user_id: userByEmail.get("carla.ruiz@example.com")!,
				target_liters_per_day: 120,
				yearly_target_liters: 6500,
			},
		],
	});

	console.log("Seed completado: usuarios, referencias, cálculos y metas creadas.");
}

main()
	.catch((error) => {
		console.error("Error ejecutando seed:", error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
