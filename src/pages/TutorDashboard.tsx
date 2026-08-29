// src/pages/TutorDashboard.tsx
import { Link } from 'react-router-dom';

// Mock Data for a Tutor
const tutorData = {
    name: "Ms. Sarah van Wyk",
    subject: "Pure Maths & Physical Sciences",
    rating: 4.9,
    totalStudents: 12,
    nextSession: "Matric Revision with Thabo",
    sessionTime: "Today @ 16:00",
    earnings: "R2,450"
};

function TutorDashboard() {
    return (
        <div className="dashboard-container">
            <div className="dash-header">
                <h1>Welcome, {tutorData.name} 💼</h1>
                <p>{tutorData.subject} | ⭐ {tutorData.rating} | {tutorData.totalStudents} Students</p>
            </div>

            <div className="dash-grid">
                <div className="dash-card next-session">
                    <h3>📅 Upcoming Session</h3>
                    <p className="session-title">{tutorData.nextSession}</p>
                    <p className="session-time">{tutorData.sessionTime}</p>
                    <button className="primary-btn small-btn">Start Session</button>
                </div>

                <div className="dash-card earnings-card">
                    <h3>💰 Earnings (This Month)</h3>
                    <p className="earnings-number">{tutorData.earnings}</p>
                    <p className="earnings-sub">Payouts will be available once payment integration is live.</p>
                </div>
            </div>

            <Link to="/" className="secondary-btn back-btn">Back to Home</Link>
        </div>
    );
}

export default TutorDashboard;