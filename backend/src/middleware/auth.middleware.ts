import { Response, NextFunction } from "express";
import { verifyToken } from "../services/auth.service";
import { AuthRequest } from "../interfaces/auth.interface";

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: "No authorization header provided" });
      return;
    }

    const parts = authHeader.split(" ");
    
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      res.status(401).json({ error: "Token format must be 'Bearer <token>'" });
      return;
    }

    const token = parts[1] as string;
    
    const decoded = verifyToken(token);
    
    if (!decoded) {
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }

    req.user = decoded;
    
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ error: "Internal server error during authentication" });
  }
};