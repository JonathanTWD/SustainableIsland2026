import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { checkDatabaseConnection } from "./config/db";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import waterCalculationRoutes from "./routes/water-calculation.routes";
import metricsRoutes from "./routes/metrics.routes";
import savingGoalRoutes from "./routes/saving-goal.routes";

const app = express();
const PORT = Number(process.env.PORT);

const allowedOrigins = process.env.NODE_ENV === "production"
    ? [
        "https://water-calculator.space",
        "https://www.water-calculator.space",
      ]
    : ["http://localhost:5173"];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Server is working" });
});

app.get("/health/db", async (_req: Request, res: Response) => {
    try {
        const { now } = await checkDatabaseConnection();
        res.json({ ok: true, dbTime: now });
    } catch (error) {
        console.error("Database connection error", error);
        res.status(500).json({ ok: false, message: "Database connection failed" });
    } 
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/water-calculations", waterCalculationRoutes);
app.use("/api/saving-goals", savingGoalRoutes);
app.use("/api/metrics", metricsRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});