import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../config/db";
import { CreateUserDTO, UpdateUserDTO, User, UserResponse } from "../interfaces/user.interface";
import { hashPassword } from "../utils/password.util";
import { parseIdParam } from "../utils/id.util";

const excludePassword = (user: User): UserResponse => {
  const { password_hash, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// GET /api/users
// Returns only the total number of users in the application
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const count = await prisma.users.count();
    res.json({ count });
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ error: "Error fetching user count" });
  }
};

// GET /api/users/:id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseIdParam(req.params.id);

    if (userId === null) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(excludePassword(user));
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Error fetching user" });
  }
};

// POST /api/users
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password }: CreateUserDTO = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: "Email is already registered" });
    }

    const password_hash = await hashPassword(password);

    const newUser = await prisma.users.create({
      data: {
        name: name || null,
        email,
        password_hash,
      },
    });

    res.status(201).json(excludePassword(newUser));
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseIdParam(req.params.id);
    const { name, email, password }: UpdateUserDTO = req.body;

    if (userId === null) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updateData: Prisma.UsersUpdateInput = {};

    if (name !== undefined) {
      updateData.name = name || null;
    }

    if (email) {
      // Check whether the email is already used by another user
      const existingUser = await prisma.users.findUnique({
        where: { email },
      });

      if (existingUser && existingUser.id !== userId) {
        return res.status(409).json({ error: "Email is already in use" });
      }

      updateData.email = email;
    }

    if (password) {
      if (password.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters" });
      }
      updateData.password_hash = await hashPassword(password);
    }

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: updateData,
    });

    res.json(excludePassword(updatedUser));
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseIdParam(req.params.id);

    if (userId === null) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    // Check whether the user exists
    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete user (this also deletes related calculations and goals by cascade)
    await prisma.users.delete({
      where: { id: userId },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
};
