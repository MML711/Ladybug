import express from "express";
import {
  assignDev,
  getAssignedDevs,
  removeAllDevs,
  removeDev,
} from "../controllers/dev-assignments.js";

const router = express.Router();

// Matches route with "/api/assigneddev/"
router.route("/").delete(removeDev);

// Matches route with "/api/assigneddev/:ticketId"
router
  .route("/:ticketId")
  .post(assignDev)
  .get(getAssignedDevs)
  .delete(removeAllDevs);

export default router;
