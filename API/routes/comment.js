import express from "express";
import {
  createComment,
  deleteComment,
  getTicketComments,
  updateComment,
} from "../controllers/comment.js";
import { authorization } from "../middleware/authorization.js";

const router = express.Router();

// Matches route with "/api/comments/"
router
  .route("/:ticketId")
  .post(authorization, createComment)
  .get(authorization, getTicketComments);

router
  .route("/:ticketId/:commentId")
  .put(authorization, updateComment)
  .delete(authorization, deleteComment);

export default router;
