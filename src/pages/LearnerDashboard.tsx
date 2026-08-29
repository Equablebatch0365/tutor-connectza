// src/pages/LearnerDashboard.tsx
import { Link } from 'react-router-dom';

// Mock Data for a Grade 12 Learner
const learnerData = {
    name: "Thabo Nkosi",
    grade: "Grade 12 (Matric)",
    province: "Gauteng",
    nextSession: "Pure Maths with Mr. Sithole",
    sessionTime: "Today @ 16:00",
    subjects: [
        { name: "Pure Maths", progress: 75, color: "#A64B2A" },
        { name: "Physical Sciences", progress: 60, color: "#F2A65A" },
        { name: "English HL", progress: 85, color: "#8B4513" }
    ]
};

function LearnerDashboard() {
    return (
        <div className="dashboard-container">
            <div className="dash-header">
                <h1>Hi, {learnerData.name} 👋</h1>
                <p>{learnerData.grade} | {learnerData.province}</p>
            </div>

            <div className="dash-grid">
                <div className="dash-card next-session">
                    <h3>📅 Next Session</h3>
                    <p className="session-title">{learnerData.nextSession}</p>
                    <p className="session-time">{learnerData.sessionTime}</p>
                    <button className="primary-btn small-btn">Join Session</button>
                </div>

                <div className="dash-card progress-card">
                    <h3>📊 Subject Progress</h3>
                    {learnerData.subjects.map((subject) => (
                        <div key={subject.name} className="progress-item">
                            <div className="progress-info">
                                <span>{subject.name}</span>
                                <span>{subject.progress}%</span>
                            </div>
                            <div className="progress-bar-bg">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${subject.progress}%`, backgroundColor: subject.color }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Link to="/" className="secondary-btn back-btn">Back to Home</Link>
        </div>
    );
}

export default LearnerDashboard;