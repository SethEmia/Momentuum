import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import CalendarWidget from '../components/CalendarWidget';

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <header className="dashboard-top-bar">
                <input type="text" placeholder="Search Task" className="search-input" />
                <button className="new-project-button">New Project</button>
                <div className="spacer"></div>
                <div className="profile-placeholder"></div>
            </header>

            <section className="dashboard-greeting-card">
                <div className="greeting-header">
                    <h1>Good Morning, John Doe</h1>
                    <p>You have <strong>2</strong> Upcoming Project Deadlines</p>
                </div>

                <div className="greeting-inner-cards">
                    <div className="inner-card">
                        <h3>Upcoming Project Deadlines</h3>
                        <div className="project-list">
                            <div className="project-item">
                                <span className="vertical-bar bar-green"></span>
                                <div className="project-details">
                                    <span className="project-name">CS101 - Capstone Project</span>
                                    <div className="progress-bar-container"><div className="progress-bar-fill fill-green" style={{ width: '60%' }}></div></div>
                                    <span className="project-date">Nov. 5, 2025 - 11:59 PM</span>
                                </div>
                            </div>
                            <div className="project-item">
                                <span className="vertical-bar bar-purple"></span>
                                <div className="project-details">
                                    <span className="project-name">CS301 - Web application Project</span>
                                    <div className="progress-bar-container"><div className="progress-bar-fill fill-purple" style={{ width: '90%' }}></div></div>
                                    <span className="project-date">Dec. 10, 2025 - 11:59 PM</span>
                                </div>
                            </div>
                        </div>
                        <a href="#" className="view-all-link">View All</a>
                    </div>

                    <div className="inner-card">
                        <h3>Dailies</h3>
                        <div className="dailies-list">
                            <div className="daily-item"><span className="status-dot dot-green"></span> <span>Brush Teeth</span> <div className="circle-check"></div></div>
                            <div className="daily-item"><span className="status-dot dot-purple"></span> <span>Cook Breakfast</span> <div className="circle-check"></div></div>
                            <div className="daily-item"><span className="status-dot dot-pink"></span> <span>Clean Bed</span> <div className="circle-check"></div></div>
                            <div className="daily-item"><span className="status-dot dot-orange"></span> <span>Guild Wars 2</span> <div className="circle-check"></div></div>
                        </div>
                        <a href="#" className="view-all-link">View All</a>
                    </div>
                </div>
            </section>

            <section>
                <CalendarWidget />
            </section>
        </div>
    );
}