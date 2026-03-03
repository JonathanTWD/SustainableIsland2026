import "dotenv/config";
import express, { Request, Response } from "express";
import { checkDatabaseConnection } from "./config/db";

const app = express();
const PORT = Number(process.env.PORT);

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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});