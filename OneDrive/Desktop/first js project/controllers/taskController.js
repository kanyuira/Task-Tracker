const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const FILE = "./data/tasks.json";

function readTasks() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

function writeTasks(tasks) {
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}


function getAllTasks(req, res) {
  const tasks = readTasks();
  res.status(200).json(tasks);
}

function createTask(req, res) {
  const { title, description, dueDate, priority } = req.body;

  if (!title || typeof title !== "string" || !title.trim()){
    return res.status(400).json({ error: "Title is required and must be a non-empty string" });
  }

  if (priority && !["low", "medium", "high"].includes(priority)){
    return res.status(400).json({ error: "priority must be low, medium, or high" });
  }

  const newTask = {
    id: uuidv4(),
    title,
    description: description || "",
    status: "todo",
    priority: priority || "medium",
    dueDate: dueDate || null
  };

  const tasks = readTasks();
  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
}

function getTaskById(req, res) {
  const tasks = readTasks();
  const task = tasks.find(t => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(200).json(task);
}

function updateTask(req, res) {
  const tasks = readTasks();
  const index = tasks.findIndex(t => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const updatedTask = {
    ...tasks[index],        
    ...req.body,             
    id: tasks[index].id      
  };

  tasks[index] = updatedTask;
  writeTasks(tasks);

  res.status(200).json(updatedTask);
}


function deleteTask(req, res) {
  const tasks = readTasks();
  const index = tasks.findIndex(t => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deleted = tasks.splice(index, 1);
  writeTasks(tasks);

  res.status(200).json({ message: "Task deleted", task: deleted[0] });
}
module.exports = { getAllTasks, createTask, getTaskById, updateTask, deleteTask };