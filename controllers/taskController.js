const Task = require("../models/Task");

// @desc = GET all Tasks
// @route - GET /api/v1/tasks
// @access - Public
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc - patch the task
// @route - PATCH /api/v1/tasks/:id
// @access - Public
exports.completeTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: "No Task found",
      });
    } else {
      await task.updateOne({ isCompleted: `${!task.isCompleted}` });
      return res.status(200).json({
        success: true,
        data: task,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc - delete the task
// @route - DELETE /api/v1/tasks/:id
// @access - Public
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: "No Task found",
      });
    } else {
      await task.remove();
      return res.status(201).json({
        success: true,
        data: "deleted the task",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc - add new task
// @route - POST /api/v1/tasks
exports.postTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    return res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    if (error.message === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};
