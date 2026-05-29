const tasks = require('../data/tasks');

// ==========================================
// 🛠️ GET ALL TASKS (Members C & D Domain)
// ==========================================
const getAllTasks = (req, res) => {
  let filteredTasks = [...tasks];

  // ------------------------------------------
  // 📌 MEMBER C SLOT: Filtering & Sorting
  // Task 1: Parse req.query.status and req.query.priority to filter 'filteredTasks'.
  // Task 2: Parse req.query.sortBy (e.g., 'dueDate') to sort the array items.
  // ------------------------------------------
  // WRITE YOUR FILTERING & SORTING CODE HERE:

  // ==========================================
// FILTER BY STATUS
// Example:
// /tasks?status=pending
// ==========================================
if (req.query.status) {
  filteredTasks = filteredTasks.filter(task =>
    task.status.toLowerCase() === req.query.status.toLowerCase()
  );
}

// ==========================================
// FILTER BY PRIORITY
// Example:
// /tasks?priority=high
// ==========================================
if (req.query.priority) {
  filteredTasks = filteredTasks.filter(task =>
    task.priority.toLowerCase() === req.query.priority.toLowerCase()
  );
}

// ==========================================
// SORT TASKS
// Example:
// /tasks?sortBy=dueDate
// ==========================================
if (req.query.sortBy) {
  const sortField = req.query.sortBy;

  filteredTasks.sort((a, b) => {

    // Special handling for dates
    if (sortField === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }

    // Generic sorting for strings/numbers
    if (a[sortField] < b[sortField]) return -1;
    if (a[sortField] > b[sortField]) return 1;

    return 0;
  });
}


  // ------------------------------------------
  // 📌 MEMBER D SLOT: Keyword Search
  // Task 1: Parse req.query.search (e.g., ?search=database)
  // Task 2: Filter 'filteredTasks' where title or description includes the search string.
  // ------------------------------------------
  const search = req.query.search?.trim().toLowerCase();

  if (search) {
    filteredTasks = filteredTasks.filter(task => {
      const title = task.title?.toLowerCase() || '';
      const description = task.description?.toLowerCase() || '';

      return title.includes(search) || description.includes(search);
    });
  }

  res.json(filteredTasks);
};

// ==========================================
// 🛠️ GET SINGLE TASK BY ID
// ==========================================
const getTaskById = (req, res) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id === parseInt(id));

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
};

// ==========================================
// 🛠️ CREATE A NEW TASK (Member B Domain)
// ==========================================
const createTask = (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  // Basic validation requirement
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  // Priority input fallback protection
  const validPriorities = ['low', 'medium', 'high'];
  const taskPriority = validPriorities.includes(priority?.toLowerCase()) ? priority.toLowerCase() : 'medium';

  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1, 
    title,
    description: description || '',
    priority: taskPriority,
    dueDate: dueDate || null,
    status: 'pending', 
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

// ==========================================
// 🛠️ UPDATE AN EXISTING TASK (Member B Domain)
// ==========================================
const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, dueDate } = req.body;

  const task = tasks.find(t => t.id === parseInt(id));

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  // Baseline updates
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;

  // ------------------------------------------
  // 📌 MEMBER B SLOT: Priority & Due Dates (Update)
  // ------------------------------------------
  if (priority !== undefined) {
    const validPriorities = ['low', 'medium', 'high'];
    if (validPriorities.includes(priority.toLowerCase())) {
      task.priority = priority.toLowerCase();
    }
  }
  if (dueDate !== undefined) task.dueDate = dueDate;

  res.json(task);
};

// ==========================================
// 🛠️ DELETE A TASK
// ==========================================
const deleteTask = (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.json({ message: 'Task deleted successfully' });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
