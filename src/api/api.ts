// API URL
const apiURL = process.env.NEXT_PUBLIC_API_URL;

// GetTasks function
const GetTasks = async () => await fetch(`${apiURL}/tasks`);

// AddTask function
const AddTask = async (name: string) => await fetch(`${apiURL}/tasks`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name
    }),
});

// UpdateTask function
const UpdateTask = async (taskID: string, name: string) => await fetch(`${apiURL}/tasks/${taskID}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name
    }),
});

// CompleteTask function
const CompleteTask = async (taskID: string) => await fetch(`${apiURL}/complete-task/${taskID}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        isCompleted: true
    }),
});

// RemoveTask function
const RemoveTask = async (taskID: string) => await fetch(`${apiURL}/tasks/${taskID}`, {
    method: 'DELETE',
});

export { GetTasks, AddTask, UpdateTask, CompleteTask, RemoveTask };