import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import TaskItem from '../components/TaskItem';
import NewTaskForm from '../components/NewTaskForm';
import { apiRequest } from '../api/apiRequest';
export default function TasksView() {
   const [tasks, setTasks] = useState([]);
   const [showNewTaskForm, setShowNewTaskForm] = useState(false);
    useEffect(() =>{
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
            
            <section className="tasks-top-bar">
                <h1>Tasks</h1>
                <button className="primary-button" onClick={() => setShowNewTaskForm(true)}>
                    New Task
                </button>
            </section>

            {showNewTaskForm && <NewTaskForm onCancel={() => setShowNewTaskForm(false)} onTaskCreated={handleTaskCreated} />}

            <section className="tasks-summary">
                <p>You have <strong>{tasks.length}</strong> active task/s</p>
            </section>

            <section className="tasks-list">
                {tasks.map((task) => (
                    <TaskItem key={task.taskId} task={task} />
                ))}
            </section>
        </div>
    );
}