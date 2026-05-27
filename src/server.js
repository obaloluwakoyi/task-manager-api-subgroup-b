const express = require('express');
const router = require('./routes/taskRoutes.js');

const app = express();

const port = 5000;

app.use(express.json());
app.use('/api/tasks', require('./routes/taskRoutes.js'));

//In-memory tasks storage
let tasks = [];

// Create Task
app.post("/tasks", router);

// Get all tasks
app.get("/tasks", router);

// Get tasks sorted by priority
app.get("/tasks/priority", router);

// Get overdue tasks
app.get("/tasks/overdue", router);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

