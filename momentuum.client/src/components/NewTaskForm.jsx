import React, { useEffect, useState } from 'react';
import './NewTaskForm.css';
export default function NewTaskForm({onCancel, onTaskCreated}) {

    const [task, setTask] = useState({
        title:"",
        dueDate: null,
        priority: null,
        status:0
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!task.title.trim()) {
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            const requestBody = {
                title: task.title,
                dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : null,
                priority: Number(task.priority),
            }
            console.log("Request Body:", requestBody);
            const res = await fetch(`http://localhost:5144/api/Tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });
            if (!res.ok) {
                console.error("Status: " + res.status);
                console.error("Status Text: " + res.statusText);
                console.error("Failed to create task");
                return;
            }
            const newTask = await res.json().catch(() => null);
            onTaskCreated(newTask);
            onCancel();
        } catch (error) {
            console.error("Error creating task:", error);

        }
    };

    //TODO: Implement Due Date, Priority, Status Fields
    return (
        <div className="new-task-form-overlay">
            <div className="new-task-form">
                <h2>New Task</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                    placeholder="Task Title"
                    value={task.title}
                    onChange={(e) => setTask((prev) => ({ ...prev, title: e.target.value }))} required
                    />
                    <input 
                    type="date" placeholder="Due Date" 
                    value={task.dueDate}
                    onChange={(e) => setTask((prev) => ({ ...prev, dueDate: e.target.value }))} />
                    <select
                    value={task.priority}
                    onChange={(e) => setTask((prev) => ({ ...prev, priority: Number(e.target.value) }))}>
                        <option value="">Priority</option>
                        <option value={0}>Low</option>
                        <option value={1}>Medium</option>
                        <option value={2}>High</option>
                    </select>

                    <button type="submit" className="primary-button" >Create Task</button>
                </form>
            </div>
        </div>
    );
}