import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import './HabitsView.css';

export default function HabitsView() {
    const [habits, setHabits] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showNewHabitForm, setShowNewHabitForm] = useState(false);

    // Dummy data to give a visual representation of how the HabitsView should look
    useEffect(() => {
        setHabits([
            { id: 1, title: 'Morning Jog', streak: 5, frequency: 'Daily', lastCompleted: new Date().toISOString() },
            { id: 2, title: 'Read 20 pages', streak: 12, frequency: 'Daily', lastCompleted: new Date(Date.now() - 86400000).toISOString() },
            { id: 3, title: 'Meditate', streak: 2, frequency: 'Weekly', lastCompleted: null }
        ]);
    }, []);

    const filteredHabits = habits.filter(habit => {
        if (searchQuery && !habit.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="habits-container">
            <section className="habits-header-row">
                <div className="habits-header-left">
                    <h1>Habits</h1>
                    <div className="habit-filters">
                        <button className={`filter-chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
                        <button className={`filter-chip ${filter === 'daily' ? 'active' : ''}`} onClick={() => setFilter('daily')}>Daily</button>
                        <button className={`filter-chip ${filter === 'weekly' ? 'active' : ''}`} onClick={() => setFilter('weekly')}>Weekly</button>
                    </div>
                </div>
                <div className="habits-header-right">
                    <input
                        type="text"
                        className="search-input-habits"
                        placeholder="Search habits..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="primary-button new-habit-btn" onClick={() => setShowNewHabitForm(!showNewHabitForm)}>
                        {showNewHabitForm ? 'Cancel' : 'New Habit'}
                    </button>
                </div>
            </section>

            {showNewHabitForm && (
                <div className="new-habit-form-container glass-panel">
                    <h3>Create a New Habit</h3>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
                        Start building a new positive routine.
                    </p>
                    {/* Placeholder for actual form inputs */}
                    <div className="form-placeholder">
                        <input type="text" placeholder="Habit Title" className="input-field" />
                        <select className="input-field">
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                        </select>
                        <button className="primary-button">Save Habit</button>
                    </div>
                </div>
            )}

            <section className="habits-grid">
                {filteredHabits.length > 0 ? (
                    filteredHabits.map((habit) => (
                        <div key={habit.id} className="habit-card glass-panel">
                            <div className="habit-card-header">
                                <h4>{habit.title}</h4>
                                <span className="habit-frequency">{habit.frequency}</span>
                            </div>
                            <div className="habit-stats">
                                <div className="stat-item">
                                    <span className="stat-value">{habit.streak}</span>
                                    <span className="stat-label">🔥 Streak</span>
                                </div>
                            </div>
                            <div className="habit-actions">
                                <button className="action-button complete-btn">
                                    Mark Complete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-habits-message">
                        No habits found. Click 'New Habit' to create one!
                    </div>
                )}
            </section>
        </div>
    );
}
