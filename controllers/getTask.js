const Task = require("../models/Task");
const mongoose = require("mongoose");

const getTask = async (req, res) => {
  const { userId, taskId } = req.params;

  // تحويل userId و taskId إلى ObjectId باستخدام new
  const taskObjectId = new mongoose.Types.ObjectId(taskId);
  const userObjectId = new mongoose.Types.ObjectId(userId);

  console.log("User ID:", userObjectId, "Task ID:", taskObjectId);

  try {
    // البحث عن المهمة بناءً على taskId و userId كـ ObjectId
    const task = await Task.findOne({
      _id: taskObjectId, // استخدم taskObjectId
      user: userObjectId, // استخدم userObjectId
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = getTask;
