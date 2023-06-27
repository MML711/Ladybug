import express from "express";
import authRoutes from "./auth.js";
import availableUsersRoutes from "./available-users.js";
import commentRoutes from "./comment.js";
import devAssignmentsRoutes from "./dev-assignments.js";
import projectRoutes from "./project.js";
import ticketRoutes from "./ticket.js";
import userProjectRoutes from "./user-projects.js";
import userRoutes from "./user.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/availableUsers", availableUsersRoutes);
router.use("/comments", commentRoutes);
router.use("/devAssignments", devAssignmentsRoutes);
router.use("/projects", projectRoutes);
router.use("/tickets", ticketRoutes);
router.use("/userProjects", userProjectRoutes);
router.use("/users", userRoutes);

export default router;