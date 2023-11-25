import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
  getTaskStatsLastHour,
} from "../controllers/task.controller.js";

const verifyToken = (req, res, next) => {
  if (req.cookies.authToken) {
    console.log("Verify Token -> " + req.cookies.authToken);
    return next();
  }

  return res.status(401).json({ message: "User Not Authenticated" });
};

const router = express.Router();

router.get("/get", getAllTasks);
router.post("/create", verifyToken, createTask);
router.get("/getTasksByUserID", verifyToken, getTaskById);
router.post("/update/:taskId", verifyToken, updateTask);
router.delete("/delete/:taskId", verifyToken, deleteTask);
router.get("/stats", verifyToken, getTaskStats);
router.get("/stats/last-hour", verifyToken, getTaskStatsLastHour);

export default router;
