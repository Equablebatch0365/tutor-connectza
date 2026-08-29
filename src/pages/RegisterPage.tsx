// src/pages/RegisterPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <--- Imported useNavigate

type UserRole = 'learner' | 'tutor';

function RegisterPage() {
    // Hook to change URL
    const navigate = useNavigate();

    const [role, setRole] = useState<UserRole>('learner');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [grade, setGrade] = useState('');
    const [province, setProvince] = useState('');

    const [subjects, setSubjects] = useState('');
    const [experience, setExperience] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.includes('@') || password.length < 6) {
            setError("Please enter a valid email and password (6+ characters).");
            return;
        }

        // In the future, this is where we will save this to a real database.
        console.log("Registering as:", role, name, email);

        // USE NAVIGATE: Send them to the correct dashboard based on their role
        if (role === 'learner') {
            navigate('/learner-dashboard');
        } else {
            navigate('/tutor-dashboard');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card register-card">
                <h2>Create your account</h2>
                <p>Choose your role to get started.</p>

                <div className="role-selector">
                    <button
                        type="button"
                        className={`role-btn ${role === 'learner' ? 'active' : ''}`}
                        onClick={() => setRole('learner')}
                    >
                        🎓 I am a Learner
                    </button>
                    <button
                        type="button"
                        className={`role-btn ${role === 'tutor' ? 'active' : ''}`}
                        onClick={() => setRole('tutor')}
                    >
                        💼 I am a Tutor
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder={role === 'learner' ? "e.g. Thabo Nkosi" : "e.g. Ms. Sarah van Wyk"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

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
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {role === 'learner' && (
                        <>
                            <div className="form-group">
                                <label>Current Grade</label>
                                <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                                    <option value="">Select Grade</option>
                                    <option value="10">Grade 10</option>
                                    <option value="11">Grade 11</option>
                                    <option value="12">Grade 12 (Matric)</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Province</label>
                                <select value={province} onChange={(e) => setProvince(e.target.value)}>
                                    <option value="">Select Province</option>
                                    <option value="Gauteng">Gauteng</option>
                                    <option value="Western Cape">Western Cape</option>
                                    <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                                    <option value="Eastern Cape">Eastern Cape</option>
                                    <option value="Free State">Free State</option>
                                    <option value="Limpopo">Limpopo</option>
                                    <option value="Mpumalanga">Mpumalanga</option>
                                    <option value="North West">North West</option>
                                    <option value="Northern Cape">Northern Cape</option>
                                </select>
                            </div>
                        </>
                    )}

                    {role === 'tutor' && (
                        <>
                            <div className="form-group">
                                <label>Subjects you can teach</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Pure Maths, Physical Sciences"
                                    value={subjects}
                                    onChange={(e) => setSubjects(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Years of Experience</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 3"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    {error && <p className="error-text">{error}</p>}

                    <button type="submit" className="primary-btn auth-btn">
                        {role === 'learner' ? "Sign Up as Learner" : "Sign Up as Tutor"}
                    </button>
                </form>

                <div className="auth-switch">
                    <p>Already have an account? <Link to="/login" className="link-btn">Log In</Link></p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;