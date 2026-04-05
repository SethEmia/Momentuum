import React, { useEffect, useState } from 'react';
import './NewTaskForm.css';
export default function NewTaskForm({onCancel, onTaskCreated}) {
    const [isClosing, setIsClosing] = useState(false);
    const [task, setTask] = useState({
        title:"",
        dueDate: "",
        priority: "",
        status:0
    });

    const triggerClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onCancel();
        }, 300); // 300ms matches the animation duration
    };

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
            const res = await fetch(`http://localhost:5144/api/Tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });
            if (!res.ok) {
                console.error("Failed to create task");
                return;
            }
            const newTask = await res.json().catch(() => null);
            onTaskCreated(newTask);
            triggerClose();
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    return (
        <div className={`new-task-form-overlay ${isClosing ? 'closing' : ''}`} onClick={triggerClose}>
            <div className={`new-task-form ${isClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="new-task-header">
                    <h2>Create New Task</h2>
                    <button type="button" className="close-btn" onClick={triggerClose} aria-label="Close">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Task Title</label>
                        <input type="text"
                        placeholder="What needs to be done?"
                        value={task.title}
                        onChange={(e) => setTask((prev) => ({ ...prev, title: e.target.value }))} required
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Due Date</label>
                            <input 
                            type="date" 
                            value={task.dueDate || ''}
                            onChange={(e) => setTask((prev) => ({ ...prev, dueDate: e.target.value }))} />
                        </div>
                        <div className="form-group">
                            <label>Priority</label>
                            <select
                            value={task.priority}
                            onChange={(e) => setTask((prev) => ({ ...prev, priority: e.target.value }))}>
                                <option value="" disabled>Select Priority</option>
                                <option value={0}>Low</option>
                                <option value={1}>Medium</option>
                                <option value={2}>High</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="form-actions">
                        <button type="button" className="cancel-button" onClick={triggerClose}>Cancel</button>
                        <button type="submit" className="primary-button">Create Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
}