import { Router } from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/user.controller";

const router = Router();

router.get("/", getAllUsers); // GET /api/users
router.get("/:id", getUserById); // GET /api/users/:id
router.post("/", createUser); // POST /api/users
router.put("/:id", updateUser); // PUT /api/users/:id
router.delete("/:id", deleteUser); // DELETE /api/users/:id

export default router;