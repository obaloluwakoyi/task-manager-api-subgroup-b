const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// ==========================================================
// 🛣️ TASK ROUTING LAYER (Routing is fully configured)
// ⚠️ MEMBERS B, C, D: You do not need to modify this file!
// All of your feature logic belongs inside controllers/taskController.js
// ==========================================================

// Route to get all tasks (Handles filtering/sorting/search query params)
router.get('/', taskController.getAllTasks);

// Route to get a single task by its unique ID
router.get('/:id', taskController.getTaskById);

// Route to create a new task
router.post('/createTask', taskController.createTask);

// Route to update an existing task
router.put('/:id', taskController.updateTask);

// Route to delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;