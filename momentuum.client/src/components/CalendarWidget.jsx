import { useState } from "react";
import "./CalendarWidget.css";

export default function CalendarWidget() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthName = currentDate.toLocaleString("default", { month: "long" });

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };
    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };


    return (
        <div className="calendar-container container">
            
            <div className="calendar-header">
                <button className="calendar-nav-btn" onClick={prevMonth} aria-label="Previous Month">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <strong className="calendar-month-title">
                    {monthName} {year}
                </strong>
                <button className="calendar-nav-btn" onClick={nextMonth} aria-label="Next Month">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(7,1fr)",
                gridTemplateRows: "auto repeat(6,1fr)",
                margin: "8px",
                flexGrow: 1,
                width: "100%",
                gap:"4px"
            }}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div key={d} className="calendar-gridItem">
                        {d}
                        </div>
                ))}

                {Array(firstDayOfMonth).fill(null).map((_, i) => (
                    <div key={`empty-${i + 1}`}></div>
                ))}
                {Array(daysInMonth).fill(null).map((_, i) => {
                    const dayNum = i + 1;
                    const isToday =
                        dayNum === currentDay &&
                        month === currentMonth &&
                        year === currentYear;
                    return (
                        <div key={i + 1} 
                        style={{
                            display: "flex",
                            flexDirection:"column",
                            justifyContent: "center",
                            alignItems:"center",
                            }}>

                        <div className={isToday ? "current-day" : ""} style={{ padding:"0.5rem",borderRadius:"20%"} }>{i + 1}</div>
                        <div></div>    
                        </div>);
                    }
                )}
            </div>
         </div>
    );
}

