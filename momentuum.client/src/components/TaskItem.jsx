import React, { useState } from 'react';
import './TaskItem.css';
import EditIcon from '../assets/edit-icon.svg?react';
import DeleteIcon from '../assets/delete-icon.svg?react';
import CheckIcon from '../assets/check-icon.svg?react';
import TaskItemDeletePrompt from './TaskItemDeletePrompt';

export default function TaskItem({ task, onTaskDeleted }) {
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleConfirmDelete = () => {
        setShowDeletePrompt(false);
        setIsClosing(true);
        setTimeout(() => {
            onTaskDeleted(task.taskId);
        }, 300); // Matches CSS transition duration
    };

    return (
        <div className={`task-item-row ${isClosing ? 'closing' : ''}`}>
            {showDeletePrompt && (
                <TaskItemDeletePrompt
                    taskTitle={task.title}
                    onCancel={() => setShowDeletePrompt(false)}
                    onConfirm={handleConfirmDelete}
                    taskId={task.taskId}
                />
            )}

            <div className="col-title cell">
                <h3>{task.title}</h3>
            </div>
            <div className="col-due cell">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : <span style={{ color: "#aaa" }}>No due date</span>}
            </div>
            <div className="col-priority cell">
                <span className={`badge ${task.priority === 0 ? "low" : task.priority === 1 ? "medium" : "high"}`}>
                    {task.priority === 0 ? "Low" : task.priority === 1 ? "Medium" : task.priority === 2 ? "High" : "None"}
                </span>
            </div>
            <div className="col-status cell">
                <span className={`badge status-badge ${task.status === 1 ? "completed" : "pending"}`}>
                    {task.status === 0 ? "Pending" : task.status === 1 ? "Completed" : "N/A"}
                </span>
            </div>
            <div className="col-actions cell actions-cell">
                <button className="action-btn check-btn" title="Finish Task" aria-label="Finish">
                    <CheckIcon />
                </button>
                <button className="action-btn edit-btn" title="Edit Task" aria-label="Edit">
                    <EditIcon />
                </button>
                <button className="action-btn delete-btn" title="Delete Task" aria-label="Delete" onClick={() => setShowDeletePrompt(true)}>
                    <DeleteIcon />
                </button>
            </div>
        </div>
    );
}