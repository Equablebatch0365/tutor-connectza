// src/pages/LoginPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/useLanguage';

type UserRole = 'learner' | 'tutor';

function LoginPage() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [role, setRole] = useState<UserRole>('learner');

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.includes('@') || password.length < 6) {
            setError("Please enter a valid email and password (6+ characters).");
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            return;
        }

        if (data.user) {
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', data.user.id)
                .single();

            if (profileError) {
                setError(profileError.message);
                return;
            }

            navigate(profileData.role === 'tutor' ? '/tutor-dashboard' : '/learner-dashboard');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{t.logIn}</h2>
                <p>{t.selectRole}</p>

                {/* Role Selector */}
                <div className="role-selector">
                    <button
                        type="button"
                        className={`role-btn ${role === 'learner' ? 'active' : ''}`}
                        onClick={() => setRole('learner')}
                    >
                        🎓 {t.learner}
                    </button>
                    <button
                        type="button"
                        className={`role-btn ${role === 'tutor' ? 'active' : ''}`}
                        onClick={() => setRole('tutor')}
                    >
                        💼 {t.tutor}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>{t.email}</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>{t.password}</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="error-text">{error}</p>}

                    <button type="submit" className="primary-btn auth-btn">
                        {t.loginBtn}
                    </button>
                </form>

                <div className="auth-switch">
                    <p>{t.noAccount} <Link to="/register" className="link-btn">{t.signUp}</Link></p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;