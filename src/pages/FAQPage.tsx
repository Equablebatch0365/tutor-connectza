// src/pages/FAQPage.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQ_DATA = [
    {
        category: "For Learners",
        questions: [
            {
                q: "How do I find a tutor?",
                a: "Click 'Find a Tutor' in the navigation menu. You can search by subject (e.g., Pure Maths) and filter by province. Click on a tutor's profile to see their reviews and request a session."
            },
            {
                q: "How do I pay for a session?",
                a: "TutorConnect currently uses manual EFT (bank transfer). Once a tutor accepts your request, you arrange payment directly with them. You will see their banking details on your dashboard after they mark the session as complete."
            },
            {
                q: "Can I cancel a session?",
                a: "Yes. Please message the tutor directly on WhatsApp as soon as possible. Frequent cancellations may result in account suspension under our Terms of Service."
            },
            {
                q: "Is it safe for minors?",
                a: "Yes. Tutors are manually verified. For learners under 18, we require parental consent. We encourage all sessions to be recorded or supervised if the learner is under 16. If you feel unsafe, use the 'Report' or 'Block' button on the tutor's profile."
            },
            {
                q: "What if I don't have data?",
                a: "Our platform is data-light. The text and layout use almost no data. Past papers and notes are downloadable when you have data, so you can save them for later."
            }
        ]
    },
    {
        category: "For Tutors",
        questions: [
            {
                q: "How do I become a tutor?",
                a: "Click 'Sign Up' and choose 'I am a Tutor'. Fill in your subjects, experience, and banking details. Once verified, you'll receive a blue ✔ badge and learners can book you."
            },
            {
                q: "How do I get paid?",
                a: "You add your banking details to your profile. When a session is completed, you mark it as 'Awaiting Payment' and the learner pays you via EFT directly into your account."
            },
            {
                q: "How do I get the verified ✔ badge?",
                a: "Our team manually reviews your profile. To speed this up, email a copy of your ID and qualifications to support@tutorconnect.co.za. We verify all tutors to ensure learner safety."
            },
            {
                q: "Can I teach multiple subjects?",
                a: "Yes! On your profile, check all the subjects you can teach. Learners will see all of them when they search."
            }
        ]
    },
    {
        category: "Legal & Safety",
        questions: [
            {
                q: "Who can use TutorConnect?",
                a: "You must be at least 13 years old. If you are under 18, you must have a parent or guardian's permission to use the platform, in line with the Children's Act."
            },
            {
                q: "How do you protect my data?",
                a: "We comply with POPIA. Your data is stored securely, and we use Row Level Security to ensure only you can access your personal information. We never sell your data."
            },
            {
                q: "How do I contact support?",
                a: "Email us at support@tutorconnect.co.za. We usually respond within 24 hours."
            }
        ]
    }
];

function FAQPage() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const toggleQuestion = (index: string) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <div className="faq-header">
                <h1>Frequently Asked Questions</h1>
                <p>Got questions? We've got answers.</p>
            </div>

            {FAQ_DATA.map((section) => (
                <div key={section.category} className="faq-section">
                    <h2>{section.category}</h2>
                    {section.questions.map((item, idx) => {
                        const uniqueId = `${section.category}-${idx}`;
                        const isOpen = openIndex === uniqueId;

                        return (
                            <div key={uniqueId} className="faq-item">
                                <button
                                    className={`faq-question ${isOpen ? 'open' : ''}`}
                                    onClick={() => toggleQuestion(uniqueId)}
                                >
                                    <span>{item.q}</span>
                                    <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                                </button>
                                {isOpen && (
                                    <div className="faq-answer">
                                        <p>{item.a}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}

            <div className="faq-footer">
                <p>Still have questions? <a href="mailto:support@tutorconnect.co.za">Email us</a>.</p>
                <Link to="/" className="primary-btn back-btn">← Back to Home</Link>
            </div>
        </div>
    );
}

export default FAQPage;