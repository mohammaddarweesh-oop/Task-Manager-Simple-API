const Task = require("../models/Task");
const User = require("../models/User");

const createTask = async (req, res) => {
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
};

module.exports = {
  createTask,
};
