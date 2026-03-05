import { Router } from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAllUsers); // GET /api/users
router.get("/:id", getUserById); // GET /api/users/:id
router.put("/:id", requireAuth, updateUser); // PUT /api/users/:id
router.delete("/:id", requireAuth, deleteUser); // DELETE /api/users/:id

export default router;