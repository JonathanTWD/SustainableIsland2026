import "dotenv/config";
import express, { Request, Response } from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Servidor funcionando 🚀" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});