
let tasks = [];
// createTask is a function that handles the creation of a new task. It validates the input data, checks for required fields, and ensures that the priority is one of the allowed values. If the validation passes, it creates a new task object with a unique id and adds it to the tasks array. Finally, it sends a response indicating that the task was created successfully along with the newly created task.
const createTask =  (req, res, next) => {
    const { title, priority, dueDate, status } = req.body;

    if (!title || !priority || !dueDate || !status) {
        return res.status(400).json({
            message: "Title, priority, due date and status are required"
        });

        next();
    }

    if (!["low", "medium", "high"].includes(priority)) {
        return res.status(400).json({
            message: "Priority must be low, medium, or high"
        });
    }
// new task is created with a unique id (based on the current length of the tasks array), and the provided title, priority, due date, and status. The new task is then added to the tasks array, and a success message along with the newly created task is sent back in the response.
    const newTask = {
        id: tasks.length + 1,
        title,
        priority,
        dueDate,
        status
    };
    tasks.push(newTask);
    // This returns a 201 status code indicating that a new resource has been created, along with the newly created task in JSON format.
    res.send("Task created successfully");
    res.status(201).json(newTask);
};
// getAllTasks simply returns the entire list of tasks in the response.
const  getAllTasks = (req, res) => {
    res.json(tasks);
}
//priority is a string that can be "low", "medium", or "high". The getTasksByPriority function sorts the tasks based on their priority using a predefined order and returns the sorted list of tasks in the response.
const getTasksByPriority = (req, res) => {
    const order = { high: 1, medium: 2, low: 3 };

    const sortedTasks = [...tasks].sort(
        (a, b) => {
            const priorityA = order[a.priority] || 4;
            const priorityB = order[b.priority] || 4;
            return priorityA - priorityB;
        }
    );
        res.json(sortedTasks);
};
// overdueTasks checks for tasks that are past their due date and not completed. It compares the current date with the due date of each task and filters out the overdue tasks, which are then returned in the response.
const overdueTasks =  (req, res) => {
    const today = new Date();

    const overdue = tasks.filter(
        task => {
            //return new Date(task.dueDate) < today && task.status !== "completed";
            return new Date(task.dueDate) < today && !task.completed;
        }
    );
    res.json(overdue);
};

module.exports = {
    createTask,
    getAllTasks,
    getTasksByPriority,
    overdueTasks
};
