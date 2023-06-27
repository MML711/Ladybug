import express from "express";
import {
  assignUser,
  getProjectUsers,
  removeAllUsers,
} from "../controllers/user-project.js";
import { authorization } from "../middleware/authorization.js";

const router = express.Router();
// Matches route with "/api/userProjects/"
router.route("/");

// Matches route with "/api/userProjects/:projectId"
router
  .route("/:projectId")
  .post(authorization, assignUser)
  .get(authorization, getProjectUsers)
  .delete(authorization, removeAllUsers);

// Matches route with "/api/userprojects/:projectId/:userId"
router.route("/:projectId/:userId").delete(authorization, removeAllUsers);

export default router;
