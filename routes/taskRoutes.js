const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express();

router.post("/:userId/create", authMiddleware, async (req, res) => {
  const { title, description } = req.body;
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const task = new Task({
      title,
      description,
      user: userId,
    });

    await task.save();

    user.tasks.push(task._id);
    user.save();
    res.status(201).json({ message: "Task added successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:userId/", authMiddleware, async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await Task.find({ user: userId });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:userId/:id", authMiddleware, async (req, res) => {
  const { title, description, completed } = req.body;
  const { userId, id } = req.params;
  try {
    const task = await Task.findById(id);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:userId/:id", authMiddleware, async (req, res) => {
  const { userId, id } = req.params;
  try {
    const task = await Task.findById(id);
    const user = await User.findById(userId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (task.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
