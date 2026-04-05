import React from 'react';
import './TaskItemDeletePrompt.css';
import { apiRequest } from '../api/apiRequest';

export default function TaskItemDeletePrompt({ taskTitle, onCancel, onConfirm, taskId }) {
    const handleDelete = async () => {
        try {
            const updatedTask = await apiRequest(`/Tasks/${taskId}`, 'DELETE');
            console.log(updatedTask);
            onConfirm();
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className="delete-prompt-overlay">
            <p>Are you sure you want to delete <strong>{taskTitle}</strong>?</p>
            <div className="delete-actions">
                <button className="prompt-btn cancel-btn" onClick={onCancel}>Cancel</button>
                <button className="prompt-btn confirm-btn" onClick={handleDelete}>Yes, Delete</button>
            </div>
        </div>
    );
}
