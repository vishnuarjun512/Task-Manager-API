import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./router/user.router.js";
import taskRouter from "./router/task.router.js";

mongoose
  .connect("mongodb://127.0.0.1:27017/templateWebsite")
  .then(() => {
    console.log("Connected to MongoDB!!!");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.post("/test", (req, res) => {
  res.status(200).json({ message: "Test Done Right" });
});

app.use("/api/user", userRouter);
app.use("/api/tasks", taskRouter);

const port = 3000;
const server = app.listen(port, () => {
  console.log("Server is running on port-", port);
});

export default server;
