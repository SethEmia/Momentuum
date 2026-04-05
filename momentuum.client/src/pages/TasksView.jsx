import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import './TasksView.css';
import TaskItem from '../components/TaskItem';
import NewTaskForm from '../components/NewTaskForm';
import { apiRequest } from '../api/apiRequest';

export default function TasksView() {
    const [tasks, setTasks] = useState([]);
    const [showNewTaskForm, setShowNewTaskForm] = useState(false);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Sorting state
    const [sortColumn, setSortColumn] = useState('dueDate');
    const [sortDirection, setSortDirection] = useState('asc');

    const handleTaskDeleted = (taskId) => {
        setTasks(prev =>
            prev.filter(task => task.taskId !== taskId)
        );
    };

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

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'pending' && task.status !== 0) return false;
        if (filter === 'completed' && task.status !== 1) return false;
        if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        let valA = a[sortColumn];
        let valB = b[sortColumn];

        // Handle nulls and edge cases
        if (sortColumn === 'title') {
            valA = valA ? valA.toString().toLowerCase() : '';
            valB = valB ? valB.toString().toLowerCase() : '';
        } else if (sortColumn === 'dueDate') {
            // Push missing due dates to the bottom
            valA = valA ? new Date(valA).getTime() : (sortDirection === 'asc' ? Infinity : -Infinity);
            valB = valB ? new Date(valB).getTime() : (sortDirection === 'asc' ? Infinity : -Infinity);
        } else {
            valA = valA ?? 0;
            valB = valB ?? 0;
        }

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const renderSortIndicator = (column) => {
        if (sortColumn !== column) return <span className="sort-icon inactive">↕</span>;
        return sortDirection === 'asc' ? <span className="sort-icon active">↑</span> : <span className="sort-icon active">↓</span>;
    };

    return (
        <div className="tasks-container">
            <section className="tasks-header-row">
                <div className="tasks-header-left">
                    <h1>Tasks</h1>
                    <div className="task-filters">
                        <button className={`filter-chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
                        <button className={`filter-chip ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Pending</button>
                        <button className={`filter-chip ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Completed</button>
                    </div>
                </div>
                <div className="tasks-header-right">
                    <input
                        type="text"
                        className="search-input-tasks"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="primary-button new-task-btn" onClick={() => setShowNewTaskForm(true)}>
                        New Task
                    </button>
                </div>
            </section>

            {showNewTaskForm && <NewTaskForm onCancel={() => setShowNewTaskForm(false)} onTaskCreated={handleTaskCreated} />}

            <section className="tasks-list-container">
                <div className="tasks-table-header">
                    <div className="col-title sortable" onClick={() => handleSort('title')}>Title {renderSortIndicator('title')}</div>
                    <div className="col-due sortable" onClick={() => handleSort('dueDate')}>Due Date {renderSortIndicator('dueDate')}</div>
                    <div className="col-priority sortable" onClick={() => handleSort('priority')}>Priority {renderSortIndicator('priority')}</div>
                    <div className="col-status sortable" onClick={() => handleSort('status')}>Status {renderSortIndicator('status')}</div>
                    <div className="col-actions" style={{ textAlign: "center" }}>Actions</div>
                </div>
                <div className="tasks-list">
                    {sortedTasks.length > 0 ? (
                        sortedTasks.map((task) => (
                            <TaskItem key={task.taskId} task={task} onTaskDeleted={handleTaskDeleted} />
                        ))
                    ) : (
                        <div className="empty-tasks-message">
                            {tasks.length === 0
                                ? "You have no active tasks. Click 'New Task' to create one!"
                                : "No tasks match your current search or filters."}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}