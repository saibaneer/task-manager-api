const Task = require("../models/taskModel");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  return res.status(200).json({ tasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  return res.status(200).json({ status: "success", data: task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params; // Assuming ID is provided in params
  // const { name } = req.body; // Assuming the new name is provided in the request body
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  return res.status(200).json({ status: "success", data: task }); // 200 OK for a successful update
});

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create({ name: req.body.name, isCompleted: false });
    return res.status(201).json({ status: "success", data: task });
});

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
        return next(createCustomError(`No task with id: ${taskID}`, 404));
    }
    return res.status(204).send();
});

module.exports = {
  getAllTasks,
  getTask,
  updateTask,
  createTask,
  deleteTask,
};
