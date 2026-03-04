import "dotenv/config";
import express, { Request, Response } from "express";
import { checkDatabaseConnection } from "./config/db";
import userRoutes from "./routes/user.routes";

const app = express();
const PORT = Number(process.env.PORT);

// JSON body parser middleware
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
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});