import asyncHandler from "express-async-handler";
import TaskModel from "../../models/task/taskModel.js";
import cron from "node-cron";
import moment from "moment";

export const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!description || description.trim() === "") {
      return res.status(400).json({ message: "Description is required" });
    }

    const task = new TaskModel({
      title,
      description,
      dueDate,
      priority,
      status,
      user: req.user._id, // Assuming you have user information in req.user
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.log("Error in createTask:", error.message);
    res.status(500).json({ message: "Cannot create task" });
  }
});

export const getTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user information in req.user
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const tasks = await TaskModel.find({ user: userId });
    res.status(200).json({
      length: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log("Error in getTasks:", error.message);
    res.status(500).json({ message: "Cannot get tasks" });
  }
});

export const getTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Task ID is required" });
    }
    const task = await TaskModel.findById(id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    if (!task.user.equals(userId)) {
      res
        .status(401)
        .json({ message: "You are not authorized to access this task" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log("Error in getTaskById:", error.message);
    res.status(500).json({ message: "Cannot get task" });
  }
});

export const updateTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;
    const { title, description, dueDate, priority, status, completed } =
      req.body;

    if (!id) {
      res.status(400).json({ message: "Please provide a task id" });
    }

    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }

    // check if the user is the owner of the task
    if (!task.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    // update the task with the new data if provided or keep the old data
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.completed = completed || task.completed;

    await task.save();

    return res.status(200).json(task);
  } catch (error) {
    console.log("Error in updateTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
});
// for deleting the single task
export const deleteTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const task = await TaskModel.findById(id);
    if (!id) {
      res.status(400).json({ message: "Task ID is required" });
    }

    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    // Check if the user is authorized to delete the task
    if (!task.user.equals(userId)) {
      res
        .status(401)
        .json({ message: "You are not authorized to delete this task" });
    }
    await TaskModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log("Error in deleteTask:", error.message);
    res.status(500).json({ message: "Cannot delete task" });
  }
});

/// 😈 option for deleting all tasks
export const deleteAllTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await TaskModel.find({ user: userId });

    if (!tasks) {
      res.status(404).json({ message: "No tasks found!" });
    }

    // check if the user is the owner of the task
    if (!tasks.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    await TaskModel.deleteMany({ user: userId });

    return res.status(200).json({ message: "All tasks deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteAllTasks: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Schedule a cron job to run daily at midnight
cron.schedule("26 16 * * *", async () => {
  try {
    const thirtyDaysAgo = moment().subtract(30, "days").startOf("day").toDate();

    // Find and delete tasks where the due date is more than 30 days in the past
    const result = await TaskModel.deleteMany({
      dueDate: { $lt: thirtyDaysAgo },
    });

    console.log(
      `Deleted ${result.deletedCount} tasks that were overdue by more than 30 days.`
    );
  } catch (error) {
    console.error("Error in auto-deleting tasks:", error.message);
  }
});
