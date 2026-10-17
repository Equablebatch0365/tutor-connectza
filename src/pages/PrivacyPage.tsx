// src/pages/PrivacyPage.tsx
import { Link } from 'react-router-dom';

function PrivacyPage() {
    return (
        <div className="legal-page">
            <div className="legal-content">
                <h1>Privacy Policy</h1>
                <p className="legal-updated">Last updated: October 2026</p>

                <h2>1. Introduction</h2>
                <p>
                    TutorConnect ("we", "us", "our") is committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information in accordance with the <strong>Protection of Personal Information Act 4 of 2013 (POPIA)</strong> and the <strong>Children's Act 38 of 2005</strong>.
                </p>

                <h2>2. Who Can Use TutorConnect (Age Restrictions)</h2>
                <p>
                    The legal age of majority in South Africa is 18. We take the safety of minors extremely seriously.
                </p>
                <ul>
                    <li><strong>Under 13:</strong> We do not knowingly allow children under 13 to create accounts. If you are under 13, you may not use this platform.</li>
                    <li><strong>13 to 17:</strong> Minors between 13 and 17 may only use the platform with the <strong>verifiable consent of a parent or legal guardian</strong>. By allowing a minor to use the platform, the guardian agrees to these terms and takes responsibility for the minor's interactions.</li>
                </ul>

                <h2>3. Information We Collect (POPIA Compliance)</h2>
                <p>In line with POPIA's processing limitation, we only collect information necessary for the tutoring service:</p>
                <ul>
                    <li><strong>Account Information:</strong> Name, email, password, role (Learner/Tutor).</li>
                    <li><strong>Learner Data:</strong> Grade, province, subjects.</li>
                    <li><strong>Tutor Data:</strong> Qualifications, experience, subjects, banking details (for payouts).</li>
                    <li><strong>Usage Data:</strong> Session bookings, reviews, and messages.</li>
                </ul>

                <h2>4. How We Use Your Information</h2>
                <p>We process your information to:</p>
                <ul>
                    <li>Connect learners with tutors.</li>
                    <li>Facilitate bookings and payments (via manual EFT).</li>
                    <li>Verify tutor qualifications for safety.</li>
                    <li>Comply with legal obligations.</li>
                </ul>

                <h2>5. Security Safeguards (POPIA Section 19)</h2>
                <p>
                    We implement reasonable technical measures to protect your data. We use Supabase (PostgreSQL) with <strong>Row Level Security (RLS)</strong>, meaning users can only access their own data. Banking details are stored securely and are never shared with learners.
                </p>

                <h2>6. Your Rights Under POPIA</h2>
                <p>As a data subject, you have the right to:</p>
                <ul>
                    <li>Access the personal information we hold about you.</li>
                    <li>Request correction of inaccurate information.</li>
                    <li>Request deletion of your account (subject to legal retention requirements).</li>
                    <li>Object to processing.</li>
                    <li>Lodge a complaint with the <strong>Information Regulator</strong>.</li>
                </ul>

                <h2>7. Data Retention</h2>
                <p>
                    We retain your data while your account is active. If you delete your account, we will remove your personal information within 30 days, unless we are required by law to retain it.
                </p>

                <h2>8. Contact Us</h2>
                <p>
                    For privacy questions or to exercise your POPIA rights, contact us at <strong>privacy@tutorconnect.co.za</strong>.
                </p>

                <Link to="/" className="secondary-btn back-btn">← Back to Home</Link>
            </div>
        </div>
    );
}

export default PrivacyPage;