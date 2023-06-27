import express from "express";
import { getAvailableUsers } from "../controllers/available-users.js";

const router = express.Router();

// Matches route with "/api/availableUsers/:projectId"
router
  .route("/:projectId")
  .get(getAvailableUsers);

export default router;