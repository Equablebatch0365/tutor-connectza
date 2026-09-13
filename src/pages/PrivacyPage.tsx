// src/pages/PrivacyPage.tsx
import { Link } from 'react-router-dom';

function PrivacyPage() {
    return (
        <div className="legal-page">
            <div className="legal-content">
                <h1>Privacy Policy</h1>
                <p className="legal-updated">Last updated: September 2026</p>

                <h2>1. Introduction</h2>
                <p>
                    TutorConnect is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights under the Protection of Personal Information Act (POPIA) of South Africa.
                </p>

                <h2>2. Information We Collect</h2>
                <p>We collect the following information when you use TutorConnect:</p>
                <ul>
                    <li><strong>Account Information:</strong> Your name, email address, and password</li>
                    <li><strong>Profile Information:</strong> Grade, province, subjects, experience, bio</li>
                    <li><strong>Session Information:</strong> Booking dates, times, and messages</li>
                    <li><strong>Reviews:</strong> Ratings and comments you leave for tutors</li>
                    <li><strong>Reports:</strong> Any reports you submit about other users</li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <p>We use your information to:</p>
                <ul>
                    <li>Connect learners with tutors</li>
                    <li>Facilitate session bookings</li>
                    <li>Display your profile to other users (where applicable)</li>
                    <li>Improve our platform</li>
                    <li>Comply with legal obligations</li>
                </ul>

                <h2>4. How We Protect Your Information</h2>
                <p>
                    We use industry-standard security measures, including encrypted passwords and secure database access, to protect your information. Our platform uses Supabase (PostgreSQL) with Row Level Security to ensure users can only access their own data.
                </p>

                <h2>5. Sharing Your Information</h2>
                <p>
                    We do <strong>not</strong> sell your personal information. We may share limited information with:
                </p>
                <ul>
                    <li>Other users (e.g., your name and subjects are visible to learners)</li>
                    <li>Legal authorities, if required by law</li>
                </ul>

                <h2>6. Your Rights (POPIA)</h2>
                <p>Under POPIA, you have the right to:</p>
                <ul>
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your account and data</li>
                    <li>Object to processing of your information</li>
                </ul>

                <h2>7. Data Retention</h2>
                <p>
                    We retain your information for as long as your account is active. If you delete your account, we will remove your personal information within 30 days, except where required by law.
                </p>

                <h2>8. Cookies and Tracking</h2>
                <p>
                    TutorConnect uses minimal cookies necessary for authentication and session management. We do not use third-party advertising cookies.
                </p>

                <h2>9. Children's Privacy</h2>
                <p>
                    Learners under 18 must have parental consent. If we discover that a user under 13 has created an account, we will remove it.
                </p>

                <h2>10. Changes to This Policy</h2>
                <p>
                    We may update this policy from time to time. We will notify users of significant changes via email or on the platform.
                </p>

                <h2>11. Contact Us</h2>
                <p>
                    For privacy questions or to exercise your POPIA rights, contact us at <strong>privacy@tutorconnect.co.za</strong>.
                </p>

                <Link to="/" className="secondary-btn back-btn">← Back to Home</Link>
            </div>
        </div>
    );
}

export default PrivacyPage;