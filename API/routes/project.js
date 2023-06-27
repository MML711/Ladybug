import express from "express";
import { createProject, deleteProject, getAll, getProject, updateProject } from "../controllers/project.js";
import { authorization } from "../middleware/authorization.js";

const router = express.Router();

// Matches route with "/api/projects/"
router
  .route("/")
  .get(
    // authorization,
    getAll
  )
  .post(authorization, createProject);

router
  .route("/:id")
  .get(authorization, getProject)
  .put(authorization, updateProject)
  .delete(authorization, deleteProject);

export default router;
