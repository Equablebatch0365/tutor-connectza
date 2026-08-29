// src/App.tsx
import { Routes, Route, Link } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LearnerDashboard from './pages/LearnerDashboard';
import TutorDashboard from './pages/TutorDashboard';
import FindTutorPage from './pages/FindTutorPage'; // New!

function App() {
  return (
      <div className="homepage">
        <nav className="navbar">
          <h1 className="logo">
            <span className="logo-emoji">⛰️</span>
            Tutor<span>Connect</span>
          </h1>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/find-tutor" className="nav-link">Find a Tutor</Link>
            <Link to="/register" className="secondary-btn nav-signup">Sign Up</Link>
            <Link to="/login" className="login-btn">Log In</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/learner-dashboard" element={<LearnerDashboard />} />
          <Route path="/tutor-dashboard" element={<TutorDashboard />} />
          <Route path="/find-tutor" element={<FindTutorPage />} /> {/* New Route */}
        </Routes>
      </div>
  );
}

export default App;