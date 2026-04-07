import './SideNav.css';
import Logo from '../assets/momentuum_logo_primary_color.svg?react';
import { NavLink } from "react-router-dom";
export default function SideNav() {

    return (
        <div className="navBar container">

            <div className="logo-container">
                <Logo className="logo" />
            </div>



            <nav>
                <NavLink className="nav-link" to="/">Dashboard</NavLink>
                <NavLink className="nav-link" to="/tasks">Tasks</NavLink>
                <NavLink className="nav-link" to="/habits">Habits</NavLink>
                <NavLink className="nav-link" to="/projects">Projects</NavLink>
                <NavLink className="nav-link" to="/calendar">Calendar</NavLink>
            </nav>

        </div>
    );
}