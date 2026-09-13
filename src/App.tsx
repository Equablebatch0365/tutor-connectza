// src/App.tsx
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { useLanguage } from './context/useLanguage';
import type { Language } from './context/LanguageContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LearnerDashboard from './pages/LearnerDashboard';
import TutorDashboard from './pages/TutorDashboard';
import FindTutorPage from './pages/FindTutorPage';
import TutorProfilePage from './pages/TutorProfilePage';
import ResourcesPage from './pages/ResourcesPage'; // <-- Only ONE import now

// Define a specific type for the user object
interface UserType {
    id: string;
    email?: string;
}

function App() {
    const navigate = useNavigate();
    const { language, setLanguage, t } = useLanguage();

    // Replace any with UserType
    const [user, setUser] = useState<UserType | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                setUser({ id: user.id, email: user.email }); // Set the typed user
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
                setUser({ id: session.user.id, email: session.user.email });
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
        setIsMenuOpen(false);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="homepage">
            <nav className="navbar">
                <h1 className="logo">
                    <span className="logo-emoji">⛰️</span>
                    Tutor<span>Connect</span>
                </h1>

                {/* HAMBURGER MENU ICON */}
                <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>

                {/* DESKTOP LINKS */}
                <div className="nav-links desktop-links">
                    <Link to="/" className="nav-link">{t.home}</Link>
                    <Link to="/find-tutor" className="nav-link">{t.findTutor}</Link>
                    <Link to="/resources" className="nav-link">{t.resources}</Link>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as Language)}
                        className="language-select"
                    >
                        <option value="en">English</option>
                        <option value="af">Afrikaans</option>
                        <option value="zu">isiZulu</option>
                        <option value="xh">isiXhosa</option>
                        <option value="st">Sesotho</option>
                        <option value="tn">Setswana</option>
                        <option value="nso">Sepedi</option>
                        <option value="ts">Xitsonga</option>
                        <option value="ve">Tshivenda</option>
                        <option value="ss">siSwati</option>
                        <option value="nr">isiNdebele</option>
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

                {/* MOBILE MENU */}
                {isMenuOpen && (
                    <div className="mobile-menu">
                        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t.home}</Link>
                        <Link to="/find-tutor" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t.findTutor}</Link>
                        <Link to="/resources" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t.resources}</Link>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as Language)}
                            className="language-select"
                        >
                            <option value="en">English</option>
                            <option value="af">Afrikaans</option>
                            <option value="zu">isiZulu</option>
                            <option value="xh">isiXhosa</option>
                            <option value="st">Sesotho</option>
                            <option value="tn">Setswana</option>
                            <option value="nso">Sepedi</option>
                            <option value="ts">Xitsonga</option>
                            <option value="ve">Tshivenda</option>
                            <option value="ss">siSwati</option>
                            <option value="nr">isiNdebele</option>
                        </select>

                        {user && (
                            <>
                                <Link to={role === 'tutor' ? '/tutor-dashboard' : '/learner-dashboard'} className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    {t.dashboard}
                                </Link>
                                <button onClick={handleLogout} className="secondary-btn nav-signup">{t.logout}</button>
                            </>
                        )}

                        {!user && (
                            <>
                                <Link to="/register" className="secondary-btn nav-signup" onClick={() => setIsMenuOpen(false)}>{t.signUp}</Link>
                                <Link to="/login" className="login-btn" onClick={() => setIsMenuOpen(false)}>{t.logIn}</Link>
                            </>
                        )}
                    </div>
                )}
            </nav>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/learner-dashboard" element={<LearnerDashboard />} />
                <Route path="/tutor-dashboard" element={<TutorDashboard />} />
                <Route path="/find-tutor" element={<FindTutorPage />} />
                <Route path="/tutor/:tutorId" element={<TutorProfilePage />} />
                <Route path="/resources" element={<ResourcesPage />} />
            </Routes>
        </div>
    );
}

export default App;