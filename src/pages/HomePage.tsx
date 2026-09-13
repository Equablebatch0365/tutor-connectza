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

            {/* HOW IT WORKS SECTION */}
            <section className="how-it-works">
                <h2 className="section-title">{t.howItWorks}</h2>
                <div className="how-it-works-grid">
                    <div className="how-card">
                        <div className="how-number">1</div>
                        <h3>{t.howStep1Title}</h3>
                        <p>{t.howStep1Desc}</p>
                    </div>
                    <div className="how-card">
                        <div className="how-number">2</div>
                        <h3>{t.howStep2Title}</h3>
                        <p>{t.howStep2Desc}</p>
                    </div>
                    <div className="how-card">
                        <div className="how-number">3</div>
                        <h3>{t.howStep3Title}</h3>
                        <p>{t.howStep3Desc}</p>
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