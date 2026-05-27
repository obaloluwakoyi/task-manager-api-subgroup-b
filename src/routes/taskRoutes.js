const express = require('express');
const taskController = require('../controllers/taskController.js');

const router = express.Router();
// The router defines the routes for creating a task, getting all tasks, getting tasks sorted by priority, and getting overdue tasks. Each route is associated with a corresponding controller function that handles the logic for that route. The router is then exported to be used in the main server file.
router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/priority', taskController.getTasksByPriority);
router.get('/overdue', taskController.overdueTasks);

module.exports = router;