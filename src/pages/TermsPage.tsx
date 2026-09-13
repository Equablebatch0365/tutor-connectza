// src/pages/TermsPage.tsx
import { Link } from 'react-router-dom';

function TermsPage() {
    return (
        <div className="legal-page">
            <div className="legal-content">
                <h1>Terms of Service</h1>
                <p className="legal-updated">Last updated: September 2026</p>

                <h2>1. Introduction</h2>
                <p>
                    Welcome to TutorConnect ("we", "us", "our"). By accessing or using our platform, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.
                </p>

                <h2>2. Who Can Use TutorConnect</h2>
                <p>
                    TutorConnect is designed for South African learners (Grade 10–12) and tutors. You must be at least 13 years old to create an account. If you are under 18, you must have permission from a parent or guardian.
                </p>

                <h2>3. User Accounts</h2>
                <p>
                    You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate information during registration and to keep it up to date. Impersonating another person is strictly prohibited.
                </p>

                <h2>4. Tutor Responsibilities</h2>
                <p>
                    Tutors on TutorConnect agree to provide honest, accurate information about their qualifications, experience, and subjects. Tutors must treat all learners with respect and professionalism.
                </p>

                <h2>5. Learner Responsibilities</h2>
                <p>
                    Learners agree to attend booked sessions, treat tutors with respect, and make payments where applicable. Abuse of the platform will result in account suspension.
                </p>

                <h2>6. Payments</h2>
                <p>
                    Payment terms are arranged directly between learners and tutors. TutorConnect is not responsible for payment disputes but will assist where possible. Payment integration is planned for a future release.
                </p>

                <h2>7. Prohibited Conduct</h2>
                <p>You may not:</p>
                <ul>
                    <li>Harass, threaten, or abuse other users</li>
                    <li>Post false or misleading information</li>
                    <li>Use the platform for illegal activities</li>
                    <li>Share your account with others</li>
                    <li>Attempt to hack, scrape, or damage the platform</li>
                </ul>

                <h2>8. Reporting and Blocking</h2>
                <p>
                    We take user safety seriously. Learners can report or block tutors who violate these terms. Reports are reviewed and may result in suspension or removal.
                </p>

                <h2>9. Limitation of Liability</h2>
                <p>
                    TutorConnect connects learners and tutors but is not a party to any agreement between them. We are not liable for the outcome of any session, the conduct of any user, or any damages arising from the use of our platform.
                </p>

                <h2>10. Changes to These Terms</h2>
                <p>
                    We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the new terms.
                </p>

                <h2>11. Contact Us</h2>
                <p>
                    For questions about these terms, contact us at <strong>support@tutorconnect.co.za</strong>.
                </p>

                <Link to="/" className="secondary-btn back-btn">← Back to Home</Link>
            </div>
        </div>
    );
}

export default TermsPage;