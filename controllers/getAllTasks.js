const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await Task.find({ user: userId });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllTasks;
