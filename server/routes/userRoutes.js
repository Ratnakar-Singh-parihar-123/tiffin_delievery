import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  toggleMealEatAtMess,
} from "../controllers/userController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", protect, authorizeRoles("admin"), getAllUsers);
router.put("/toggle/:id", protect, authorizeRoles("admin"), toggleMealEatAtMess);

export default router;