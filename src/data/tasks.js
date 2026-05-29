// ==========================================================
// 🗄️ IN-MEMORY DATA STORE (Managed by Team Lead)
// ==========================================================
// This array mimics our database. 
// Initially, it stores the baseline task schema.

const tasks = [
  {
    id: 1,
    title: "Setup Project Architecture",
    description: "Initialize Express MVC folders and Git configurations.",
    status: "completed",
    priority: "high",
    dueDate: ""
    // 📌 NOTE FOR MEMBER B: 
    // Once your feature is live, new items will automatically 
    // include 'priority' and 'dueDate' fields here.
  },
  {
    id: 2,
    title: "Design Postman Collection",
    description: "Export global routes for team endpoint validation.",
    status: "completed",
    priority: "",
    dueDate: ""
  }
];

module.exports = tasks;