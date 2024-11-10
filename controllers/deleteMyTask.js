const Task = require("../models/Task");
const User = require("../models/User");

const deleteMyTask = async (req, res) => {
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
};

module.exports = deleteMyTask;
