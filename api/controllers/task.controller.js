import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const taskName = req.body.taskName;
    const userId = req.cookies.authToken;

    console.log(`Task name - ${taskName} userId = ${userId}`);

    const newTask = new Task({ taskName, userId });
    const savedTask = await newTask.save();
    console.log("Saved User :" + savedTask);

    res
      .status(200)
      .json({ success: true, message: "Created Task Successfully" });
  } catch (error) {
    console.log("Create Task Failed - " + error);
    res.status(201).json({ success: false, message: "Create Task Error" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const allTask = await Task.find();
    res.status(200).json({ allTask });
  } catch (error) {
    console.log("Get Tasks Failed - " + error);
    res.status(201).json({ success: false, message: "Get Tasks Error" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const allTask = await Task.find({ userId: req.cookies.authToken });
    res.status(200).json({ allTask });
  } catch (error) {
    console.log("Get Tasks Failed - " + error);
    res.status(201).json({ success: false, message: "Get Tasks Error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const VerifiedTask = await Task.findOne({
      _id: req.params.taskId,
      userId: req.cookies.authToken,
    });
    if (!VerifiedTask) {
      return res
        .status(201)
        .json({ success: false, message: "Task Not Found" });
    }

    const updateObject = {
      $set: {
        taskName: req.body.taskName,
        marked: req.body.marked,
      },
    };

    if (req.body.marked === true) {
      updateObject.$set.completedAt = new Date();
    } else {
      updateObject.$set.completedAt = null;
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.taskId },
      updateObject,
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Update Task Successfully",
      updatedTask,
    });
  } catch (error) {
    console.log("Update Task Failed - " + error);
    res.status(201).json({ success: false, message: "Update Task Error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const VerifiedTask = await Task.deleteOne({
      _id: req.params.taskId,
      userId: req.cookies.authToken,
    });
    if (VerifiedTask.deletedCount === 0) {
      return res
        .status(201)
        .json({ success: false, message: "Task Not Found" });
    }

    console.log("Deleted Task Successfully - " + VerifiedTask);
    res
      .status(200)
      .json({ success: true, message: "Deleted Task Successfully" });
  } catch (error) {
    console.log("Delete Task Failed - " + error);
    res.status(201).json({ success: false, message: "Delete Task Error" });
  }
};

import { addHours, addDays, startOfToday } from "date-fns";

export const getTaskStats = async (req, res) => {
  try {
    const userId = req.cookies.authToken;

    const sevenDaysAgo = addDays(startOfToday(), -7);

    const tasksCompletedLast7Days = await Task.countDocuments({
      userId,
      completedAt: { $gte: sevenDaysAgo },
    });

    res.status(200).json({ tasksCompletedLast7Days });
  } catch (error) {
    console.log("Task Stats Failed - " + error);
    res.status(500).json({ success: false, message: "Task Stats Error" });
  }
};

export const getTaskStatsLastHour = async (req, res) => {
  try {
    const userId = req.cookies.authToken;

    const oneHourAgo = addHours(startOfToday(), -1);

    const tasksCompletedLastHour = await Task.countDocuments({
      userId,
      completedAt: { $gte: oneHourAgo },
    });

    res.status(200).json({ tasksCompletedLastHour });
  } catch (error) {
    console.log("Task Stats Last Hour Failed - " + error);
    res
      .status(500)
      .json({ success: false, message: "Task Stats Last Hour Error" });
  }
};
