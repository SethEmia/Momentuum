import React from 'react';
import './TaskItem.css';
export default function TaskItem({ task }) {
    return (
        <div className="task-item">
            <h3>{task.title}</h3>
            <p>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</p>
            <p className={`badge ${task.priority === 0 ? "low" : task.priority === 1 ? "medium" : "high"}`}>
                {task.priority === 0 ? "Low" : task.priority === 1 ? "Medium" : task.priority === 2 ? "High" : "N/A"}
            </p>
            <p className='badge'>{task.status === 0 ? "Pending" : task.status === 1 ? "Completed" : "N/A"}</p>
        </div>
    );
}