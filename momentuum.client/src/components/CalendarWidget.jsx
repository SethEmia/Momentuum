import { useState, useEffect } from "react";
import { apiRequest } from '../api/apiRequest';
import "./CalendarWidget.css";

export default function CalendarWidget() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [tasks, setTasks] = useState([]);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);

    const startDayOfWeek = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(year, month, i));
    }

    const remainingSlots = 42 - days.length;
    for (let i = 0; i < remainingSlots; i++) {
        days.push(null);
    }



    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Th", "Fri", "Sat"];

    return (
        <div className="calendar-widget">
            <div className="calendar-header">
                <button onClick={handlePrevMonth} className="nav-button">&#10094;</button>
                <h3>{monthNames[month]} {year}</h3>
                <button onClick={handleNextMonth} className="nav-button">&#10095;</button>
            </div>
            <div className="calendar-grid">
                {dayNames.map(day => (
                    <div key={day} className="calendar-day-name">{day}</div>
                ))}
                {days.map((day, index) => {
                    if (!day) return <div key={`empty-${index}`} className="calendar-day empty"></div>;

                    day.setHours(0, 0, 0, 0);
                    const isToday = day.getTime() === today.getTime();
                    const isPast = day.getTime() < today.getTime();

                    let className = "calendar-day";
                    if (isToday) className += " today";
                    if (isPast) className += " past";

                    const hasTaskDue = tasks.some(task => {
                        if (!task.dueDate) return false;
                        const dateStr = task.dueDate;
                        const taskDate = new Date(dateStr);
                        return taskDate.getFullYear() === day.getFullYear() &&
                            taskDate.getMonth() === day.getMonth() &&
                            taskDate.getDate() === day.getDate();
                    });

                    return (
                        <div key={`day-${day.getDate()}`} className={className}>
                            <span>{day.getDate()}</span>
                            {hasTaskDue && <div className="task-indicator"></div>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
