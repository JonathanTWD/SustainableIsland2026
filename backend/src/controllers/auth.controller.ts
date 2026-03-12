import { Request, Response } from "express";
import { RegisterDTO, LoginDTO, AuthRequest } from "../interfaces/auth.interface";
import { registerUser, loginUser } from "../services/auth.service";
import { prisma } from "../config/db";

/**
 * Controller for user registration
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password }: RegisterDTO = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const authResponse = await registerUser({ name, email, password });

    res.status(201).json(authResponse);
  } catch (error: any) {
    console.error("Error in register controller:", error);
    
    if (error.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(409).json({ error: "Email is already registered" });
    }

    res.status(500).json({ error: "Internal server error during registration" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginDTO = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const authResponse = await loginUser({ email, password });

    res.json(authResponse);
  } catch (error: any) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.error("Error in login controller:", error);
    res.status(500).json({ error: "Internal server error during login" });
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "You are authenticated",
      user: user,
    });
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};