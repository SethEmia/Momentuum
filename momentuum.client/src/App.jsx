import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import './App.css'
import Login from './pages/Login'
import AppLayout from './pages/AppLayout'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import TasksView from './pages/TasksView'
import HabitsView from './pages/HabitsView'
import { setUnauthorizedHandler } from './api/apiRequest'

function AppWrapper() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )
}
function App() {
    const navigate = useNavigate();
    useEffect(() => {
        setUnauthorizedHandler(() => {
            if (window.location.pathname !== '/login') {
                navigate('/login');
            }
        })
    }, [navigate]);
    return (

        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route element={<AppLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="tasks" element={<TasksView />} />
                    <Route path="habits" element={<HabitsView />} />
                    <Route path="projects" element={<div>Projects Page</div>} />
                    <Route path="calendar" element={<div>Calendar Page</div>} />
                </Route>

            </Route>
        </Routes>
    );
}

export default AppWrapper
