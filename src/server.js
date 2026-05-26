const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 5000;

// ==========================================================
// ⚙️ CORE SERVER ENGINE (Managed by Team Lead)
// ⚠️ MEMBERS B, C, D: Do not edit this gateway file.
// ==========================================================

// Middleware to automatically parse incoming JSON payloads
app.use(express.json());

// Main Root Application Route Grouping
app.use('/api/tasks', taskRoutes);

// Server Entry Check Route
app.get('/', (req, res) => {
  res.send('Task Manager API Backend Running Successfully.');
});

// Launch server instance
app.listen(PORT, () => {
  console.log(`Server is running smoothly on http://localhost:${PORT}`);
});