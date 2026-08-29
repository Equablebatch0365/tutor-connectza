// src/pages/HomePage.tsx
import { useState } from 'react';

const gatewaySubjects: string[] = [
    "Pure Maths", "Physical Sciences", "Accounting", "Life Sciences", "English HL", "Geography"
];

const features: { title: string; description: string }[] = [
    {
        title: "Gateway Subject Mastery",
        description: "Focused tools for the subjects that gatekeep university entrance, helping you secure your dream degree.",
    },
    {
        title: "Affordable by Design",
        description: "Cutting out the R300+/hour overhead to make quality academic support accessible to every South African family.",
    },
    {
        title: "Data-Light & Local",
        description: "Built for South Africa. Low data usage, mobile-first, and support for all 11 official languages.",
    },
];

function HomePage() {
    const [email, setEmail] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    // FIX: Added React. before FormEvent
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
            <main className="hero">
                <div className="hero-text">
                    <h1>Unlock Your <span className="highlight">University Entrance.</span></h1>
                    <p>
                        Over 700,000 students qualified for tertiary study last year, but hundreds of thousands were
                        turned away. We are building an affordable, localized platform to help you ace the
                        critical gateway subjects that stand between you and your future.
                    </p>

                    <div className="hero-buttons">
                        <a href="#waitlist" className="primary-btn">Join the Waitlist</a>
                        <a href="#subjects" className="secondary-btn">Explore Subjects</a>
                    </div>
                </div>

                <div className="hero-image-placeholder">
                    <p>🎓</p>
                </div>
            </main>

            {/* WAITLIST SECTION */}
            <section id="waitlist" className="waitlist-section">
                <div className="waitlist-card">
                    {isSubmitted ? (
                        <div className="success-message">
                            <h2>🎉 You're on the list!</h2>
                            <p>Thanks for joining, <strong>{email}</strong>. We'll let you know the moment we launch!</p>
                        </div>
                    ) : (
                        <>
                            <h2>Be the first to know.</h2>
                            <p>Join our waitlist to get early access when we launch.</p>
                            <form onSubmit={handleSubmit} className="waitlist-form">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="email-input"
                                />
                                <button type="submit" className="primary-btn submit-btn">Join Waitlist</button>
                            </form>
                            {error && <p className="error-text">{error}</p>}
                        </>
                    )}
                </div>
            </section>

            {/* Critical Subjects Section */}
            <section id="subjects" className="subjects-section">
                <h2 className="section-title">The Subjects That Matter</h2>
                <p className="section-subtitle">Mastering these opens the doors to Engineering, Medicine, Commerce, and Law.</p>
                <div className="subject-grid">
                    {gatewaySubjects.map((subject) => (
                        <div className="subject-card" key={subject}>
                            {subject}
                        </div>
                    ))}
                </div>
            </section>

            {/* The Solution Section */}
            <section className="stats-section">
                <h2 className="section-title">What we are building for you</h2>
                <div className="feature-grid">
                    {features.map((feature) => (
                        <div className="feature-card" key={feature.title}>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default HomePage;