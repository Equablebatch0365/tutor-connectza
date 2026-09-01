// src/pages/HomePage.tsx
import { useState } from 'react';
import { useLanguage } from '../context/useLanguage';

function HomePage() {
    const { t } = useLanguage();

    const [email, setEmail] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.includes('@') || !email.includes('.')) {
            setError("Please enter a valid email address.");
            return;
        }
        setError('');
        setIsSubmitted(true);
    };

    return (
        <>
            {/* Hero Section */}
            <main className="hero">
                <div className="hero-text">
                    <h1>{t.unlockTitle}</h1>
                    <p>{t.unlockSubtitle}</p>

                    <div className="hero-buttons">
                        <a href="#waitlist" className="primary-btn">{t.joinWaitlist}</a>
                        <a href="#subjects" className="secondary-btn">{t.exploreSubjects}</a>
                    </div>
                </div>

                <div className="hero-image-placeholder">
                    <p>🎓</p>
                </div>
            </main>

            {/* HOW IT WORKS SECTION (NEW) */}
            <section className="how-it-works">
                <h2 className="section-title">How It Works</h2>
                <div className="how-it-works-grid">
                    <div className="how-card">
                        <div className="how-number">1</div>
                        <h3>Sign Up</h3>
                        <p>Create your free account as a Learner or a Tutor in under 2 minutes.</p>
                    </div>
                    <div className="how-card">
                        <div className="how-number">2</div>
                        <h3>Find a Match</h3>
                        <p>Browse verified tutors by subject and province, check their reviews, and chat on WhatsApp.</p>
                    </div>
                    <div className="how-card">
                        <div className="how-number">3</div>
                        <h3>Book & Learn</h3>
                        <p>Request a session, get accepted, and meet online via Zoom, Teams, or Jitsi.</p>
                    </div>
                </div>
            </section>

            {/* WAITLIST SECTION */}
            <section id="waitlist" className="waitlist-section">
                <div className="waitlist-card">
                    {isSubmitted ? (
                        <div className="success-message">
                            <h2>🎉 {t.thankYou}</h2>
                            <p>{email}</p>
                        </div>
                    ) : (
                        <>
                            <h2>{t.beFirst}</h2>
                            <p>{t.joinDescription}</p>
                            <form onSubmit={handleSubmit} className="waitlist-form">
                                <input
                                    type="email"
                                    placeholder={t.enterEmail}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="email-input"
                                />
                                <button type="submit" className="primary-btn submit-btn">{t.joinWaitlist}</button>
                            </form>
                            {error && <p className="error-text">{error}</p>}
                        </>
                    )}
                </div>
            </section>

            {/* Critical Subjects Section */}
            <section id="subjects" className="subjects-section">
                <h2 className="section-title">{t.subjectsMatter}</h2>
                <p className="section-subtitle">{t.subjectsSubtitle}</p>
                <div className="subject-grid">
                    <div className="subject-card">Pure Maths</div>
                    <div className="subject-card">Physical Sciences</div>
                    <div className="subject-card">Accounting</div>
                    <div className="subject-card">Life Sciences</div>
                    <div className="subject-card">English HL</div>
                    <div className="subject-card">Geography</div>
                </div>
            </section>

            {/* The Solution Section */}
            <section className="stats-section">
                <h2 className="section-title">{t.whatBuilding}</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <h3>{t.gatewayMastery}</h3>
                        <p>{t.gatewayMasteryDesc}</p>
                    </div>
                    <div className="feature-card">
                        <h3>{t.affordableDesign}</h3>
                        <p>{t.affordableDesignDesc}</p>
                    </div>
                    <div className="feature-card">
                        <h3>{t.dataLight}</h3>
                        <p>{t.dataLightDesc}</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HomePage;