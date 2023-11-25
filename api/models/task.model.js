import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    marked: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
