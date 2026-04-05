import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import './TasksView.css';
import TaskItem from '../components/TaskItem';
import NewTaskForm from '../components/NewTaskForm';
import { apiRequest } from '../api/apiRequest';

export default function TasksView() {
    const [tasks, setTasks] = useState([]);
    const [showNewTaskForm, setShowNewTaskForm] = useState(false);
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksData = await apiRequest('/Tasks');
                setTasks(tasksData || []);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }

        };
        fetchTasks();

    }, []);

    const handleTaskCreated = (newTask) => {
        if (newTask) {
            setTasks((prevTasks) => [...prevTasks, newTask]);
        }
    };

    return (
        <div className="tasks-container">
            <section className="tasks-header-row">
                <div className="tasks-header-left">
                    <h1>Tasks</h1>
                    <p>You have <strong>{tasks.length}</strong> active task{tasks.length !== 1 ? 's' : ''}</p>
                </div>
                <button className="primary-button" onClick={() => setShowNewTaskForm(true)}>
                    New Task
                </button>
            </section>

            {showNewTaskForm && <NewTaskForm onCancel={() => setShowNewTaskForm(false)} onTaskCreated={handleTaskCreated} />}

            <section className="tasks-list-container">
                <div className="tasks-table-header">
                    <div className="col-title">Title</div>
                    <div className="col-due">Due Date</div>
                    <div className="col-priority">Priority</div>
                    <div className="col-status">Status</div>
                    <div className="col-actions" style={{ textAlign: "center" }}>Actions</div>
                </div>
                <div className="tasks-list">
                    {tasks.map((task) => (
                        <TaskItem key={task.taskId} task={task} />
                    ))}
                </div>
            </section>
        </div>
    );
}