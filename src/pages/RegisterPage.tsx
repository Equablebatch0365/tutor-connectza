// src/pages/RegisterPage.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/useLanguage';

type UserRole = 'learner' | 'tutor';

function RegisterPage() {
    const { t } = useLanguage();

    const [role, setRole] = useState<UserRole>('learner');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [grade, setGrade] = useState('');
    const [province, setProvince] = useState('');

    const [subjects, setSubjects] = useState('');
    const [experience, setExperience] = useState('');

    // New state for the "check email" screen
    const [isEmailSent, setIsEmailSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.includes('@') || password.length < 6) {
            setError("Please enter a valid email and password (6+ characters).");
            return;
        }

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) {
            setError(authError.message);
            return;
        }

        if (authData.user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([
                    {
                        id: authData.user.id,
                        full_name: name,
                        role: role,
                        grade: role === 'learner' ? grade : null,
                        province: role === 'learner' ? province : null,
                        subjects: role === 'tutor' ? subjects.split(',').map(s => s.trim()) : null,
                        experience: role === 'tutor' ? experience : null,
                    }
                ]);

            if (profileError) {
                setError(profileError.message);
                return;
            }
        }

        // Instead of auto-login, show the "check your email" screen
        setIsEmailSent(true);
    };

    // Show "check your email" screen
    if (isEmailSent) {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <h2>📧 Check Your Email</h2>
                    <p>
                        We've sent a confirmation link to <strong>{email}</strong>.
                    </p>
                    <p>
                        Please click the link in your inbox to activate your account. Once confirmed, you can log in.
                    </p>
                    <p className="legal-text">
                        Didn't get the email? Check your spam folder.
                    </p>
                    <Link to="/login" className="primary-btn auth-btn">Go to Log In</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-card register-card">
                <h2>{t.createAccount}</h2>
                <p>{t.chooseRole}</p>

                <div className="role-selector">
                    <button
                        type="button"
                        className={`role-btn ${role === 'learner' ? 'active' : ''}`}
                        onClick={() => setRole('learner')}
                    >
                        🎓 {t.iAmLearner}
                    </button>
                    <button
                        type="button"
                        className={`role-btn ${role === 'tutor' ? 'active' : ''}`}
                        onClick={() => setRole('tutor')}
                    >
                        💼 {t.iAmTutor}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>{t.fullName}</label>
                        <input
                            type="text"
                            placeholder={role === 'learner' ? "e.g. Thabo Nkosi" : "e.g. Ms. Sarah van Wyk"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

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
                        <label>{t.createPassword}</label>
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
                                <label>{t.currentGrade}</label>
                                <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                                    <option value="">{t.selectGrade}</option>
                                    <option value="10">{t.grade10}</option>
                                    <option value="11">{t.grade11}</option>
                                    <option value="12">{t.grade12}</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>{t.province}</label>
                                <select value={province} onChange={(e) => setProvince(e.target.value)}>
                                    <option value="">{t.selectProvince}</option>
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
                                <label>{t.subjectsTeach}</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Pure Maths, Physical Sciences"
                                    value={subjects}
                                    onChange={(e) => setSubjects(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>{t.yearsExp}</label>
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
                        {role === 'learner' ? t.signUpLearner : t.signUpTutor}
                    </button>

                    <p className="legal-text">
                        By continuing, you agree to TutorConnect's{' '}
                        <Link to="/terms" className="legal-link">Terms of Service</Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="legal-link">Privacy Policy</Link>,
                        and to receive periodic emails with updates.
                    </p>
                </form>

                <div className="auth-switch">
                    <p>{t.alreadyAccount} <Link to="/login" className="link-btn">{t.logIn}</Link></p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;