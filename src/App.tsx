// src/App.tsx
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
// IMPORT FROM THE HOOK FILE
import { useLanguage } from './context/useLanguage';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LearnerDashboard from './pages/LearnerDashboard';
import TutorDashboard from './pages/TutorDashboard';
import FindTutorPage from './pages/FindTutorPage';
import ResourcesPage from './pages/ResourcesPage';

function App() {
    const navigate = useNavigate();
    const { language, setLanguage, t } = useLanguage(); // <--- Use language hook

    const [user, setUser] = useState<any>(null);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                setUser(user);
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single();

                if (profileData) setRole(profileData.role);
            }
            setLoading(false);
        };

        void getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                setUser(session.user);
                supabase.from('profiles').select('role').eq('id', session.user.id).single().then(({ data }) => {
                    if (data) setRole(data.role);
                });
            }
            if (event === 'SIGNED_OUT') {
                setUser(null);
                setRole(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
        setUser(null);
        setRole(null);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="homepage">
            <nav className="navbar">
                <h1 className="logo">
                    <span className="logo-emoji">⛰️</span>
                    Tutor<span>Connect</span>
                </h1>
                <div className="nav-links">
                    <Link to="/" className="nav-link">{t.home}</Link>
                    <Link to="/find-tutor" className="nav-link">{t.findTutor}</Link>
                    <Link to="/resources" className="nav-link">{t.resources}</Link>

                    {/* Language Dropdown */}
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as any)}
                        className="language-select"
                    >
                        <option value="en">English</option>
                        <option value="af">Afrikaans</option>
                        <option value="zu">isiZulu</option>
                    </select>

                    {user && (
                        <>
                            <Link to={role === 'tutor' ? '/tutor-dashboard' : '/learner-dashboard'} className="nav-link">
                                {t.dashboard}
                            </Link>
                            <button onClick={handleLogout} className="secondary-btn nav-signup">{t.logout}</button>
                        </>
                    )}

                    {!user && (
                        <>
                            <Link to="/register" className="secondary-btn nav-signup">{t.signUp}</Link>
                            <Link to="/login" className="login-btn">{t.logIn}</Link>
                        </>
                    )}
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/learner-dashboard" element={<LearnerDashboard />} />
                <Route path="/tutor-dashboard" element={<TutorDashboard />} />
                <Route path="/find-tutor" element={<FindTutorPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
            </Routes>
        </div>
    );
}

export default App;