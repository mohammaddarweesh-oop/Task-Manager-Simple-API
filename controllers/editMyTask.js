const Task = require("../models/Task");
const User = require("../models/User");

const editMyTask = async (req, res) => {
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
};

module.exports = editMyTask;
