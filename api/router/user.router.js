import express from "express";
import {
  registerUser,
  loginUser,
  signout,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/signout", signout);

export default router;
