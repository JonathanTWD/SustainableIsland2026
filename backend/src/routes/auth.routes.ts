import { Router } from "express";
import { register, login, getCurrentUser } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
// The requireAuth middleware ensures only users with a valid JWT can access this
router.get("/me", requireAuth, getCurrentUser);

export default router;