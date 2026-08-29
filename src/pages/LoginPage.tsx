// src/pages/LoginPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type UserRole = 'learner' | 'tutor';

function LoginPage() {
    const navigate = useNavigate();

    // Removed unused isSignUp state
    const [role, setRole] = useState<UserRole>('learner');

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    // FIX: Added React. before FormEvent
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.includes('@') || password.length < 6) {
            setError("Please enter a valid email and password (6+ characters).");
            return;
        }

        console.log("Logging in as:", role);

        if (role === 'learner') {
            navigate('/learner-dashboard');
        } else {
            navigate('/tutor-dashboard');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Log In</h2>
                <p>Select your role to continue.</p>

                {/* Mock Role Selector for testing */}
                <div className="role-selector">
                    <button
                        type="button"
                        className={`role-btn ${role === 'learner' ? 'active' : ''}`}
                        onClick={() => setRole('learner')}
                    >
                        🎓 Learner
                    </button>
                    <button
                        type="button"
                        className={`role-btn ${role === 'tutor' ? 'active' : ''}`}
                        onClick={() => setRole('tutor')}
                    >
                        💼 Tutor
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="error-text">{error}</p>}

                    <button type="submit" className="primary-btn auth-btn">
                        Log In
                    </button>
                </form>

                <div className="auth-switch">
                    <p>Don't have an account? <Link to="/register" className="link-btn">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;