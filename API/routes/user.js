import express from "express";
import {
  deleteUser,
  getAll,
  getUser,
  updatePic,
  updateUser,
} from "../controllers/user.js";
import { authorization } from "../middleware/authorization.js";

const router = express.Router();

// Matches route with "/api/users/"
router.route("/").get(getAll);

// Matches route with "/api/users/:id"
router
  .route("/:id")
  .get(getUser)
  .patch(updatePic)
  .put(authorization, updateUser)
  .delete(authorization, deleteUser);

export default router;
