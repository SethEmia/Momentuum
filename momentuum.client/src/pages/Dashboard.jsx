import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import CalendarWidget from '../components/CalendarWidget';
export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <section className="top-bar container">
                <input placeholder="Search Task" />
                <button className="primary-button new-project-button">
                    New Project
                </button>
            </section>
            <section className="summary-container container">
                <h1>Good Morning John Doe</h1>
                <p>You have <strong>3</strong> upcoming projects</p>
                <div>
                </div>
            </section>

            <section>
                <CalendarWidget />
            </section>

        </div>
    );
}