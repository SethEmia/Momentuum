import React, { useEffect, useState } from 'react';
import './AppLayout.css';
import SideNav from '../components/SideNav'
import { Outlet } from "react-router-dom";

export default function AppLayout() {
    return (
        <>
            <div className="parent">
                <SideNav/>
                <div className="mainContent">
                    <Outlet/>
                </div>
            </div>

        </>
    );
}