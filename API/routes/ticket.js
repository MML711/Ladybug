import express from "express";
import {
  createTicket,
  deleteTicket,
  getProjectTickets,
  getTicket,
  getUserTickets,
  updateTicket,
} from "../controllers/ticket.js";
import { authorization } from "../middleware/authorization.js";

const router = express.Router();

// Matches route with "/api/tickets/"
router.route("/").get(authorization, getUserTickets);

router
  .route("/:projectId")
  .post(authorization, createTicket)
  .get(getProjectTickets);

router
  .route("/:projectId/:ticketId")
  .get(getTicket)
  .put(authorization, updateTicket)
  .delete(authorization, deleteTicket);

export default router;
