import express from "express";
import { login, lookupUserByEmail, register } from "../controllers/auth.js";

const router = express.Router();

// Matches route with "/api/auth/user"
router.route("/user").post(lookupUserByEmail);

// Matches route with "/api/auth/register"
router.route("/register").post(register);

// Matches route with "/api/auth/login"
router.route("/login").post(login);

export default router;
