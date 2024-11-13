const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const createTask = require("../controllers/createTask");
const getAllTasks = require("../controllers/getAllTasks");
const editMyTask = require("../controllers/editMyTask");
const deleteMyTask = require("../controllers/deleteMyTask");
const Task = require("../models/Task");
const User = require("../models/User");
const mongoose = require("mongoose");
const getTask = require("../controllers/getTask");

const router = express();

/**
 * method POST
 * desc Add Task
 */

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

    await Promise.all([task.save(), user.tasks.push(task._id), user.save()]);

    res.status(201).json({ message: "Task added successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * method GET
 * desc Get All Tasks For User Own
 */

router.get("/:userId/", authMiddleware, getAllTasks);

router.get("/:userId/:taskId", getTask);

router.put("/:userId/:id", authMiddleware, editMyTask);

router.delete("/:userId/:id", authMiddleware, deleteMyTask);

module.exports = router;
