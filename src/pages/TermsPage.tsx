// src/pages/TermsPage.tsx
import { Link } from 'react-router-dom';

function TermsPage() {
    return (
        <div className="legal-page">
            <div className="legal-content">
                <h1>Terms of Service</h1>
                <p className="legal-updated">Last updated: October 2026</p>

                <h2>1. Introduction</h2>
                <p>
                    Welcome to TutorConnect. By using our platform, you agree to these Terms. This agreement is governed by South African law, including the <strong>Consumer Protection Act 68 of 2008 (CPA)</strong> and the <strong>Electronic Communications and Transactions Act 25 of 2002 (ECTA)</strong>.
                </p>

                <h2>2. Eligibility</h2>
                <p>
                    You must be at least 13 years old to use TutorConnect. If you are under 18, you may only use the platform with the consent of a parent or guardian.
                </p>

                <h2>3. The Service</h2>
                <p>
                    TutorConnect is a platform that connects learners with independent tutors. We are not a party to the agreement between the learner and the tutor. Tutors are independent contractors, not employees of TutorConnect.
                </p>

                <h2>4. Payments (Manual EFT)</h2>
                <p>
                    Payments are arranged directly between learners and tutors via EFT. TutorConnect does not process payments and is not responsible for refunds or payment disputes. Learners are responsible for paying the agreed rate.
                </p>

                <h2>5. Tutor Verification</h2>
                <p>
                    While we manually verify tutors to the best of our ability, TutorConnect does not guarantee the qualifications or conduct of any tutor. Learners (or their guardians) are responsible for their own safety and should exercise caution.
                </p>

                <h2>6. User Conduct</h2>
                <p>
                    You agree not to harass, abuse, or defraud other users. We reserve the right to suspend or terminate accounts that violate these terms.
                </p>

                <h2>7. Limitation of Liability</h2>
                <p>
                    To the maximum extent permitted by law, TutorConnect is not liable for any indirect or consequential damages arising from the use of our platform.
                </p>

                <h2>8. Contact</h2>
                <p>
                    For legal inquiries, contact <strong>legal@tutorconnect.co.za</strong>.
                </p>

                <Link to="/" className="secondary-btn back-btn">← Back to Home</Link>
            </div>
        </div>
    );
}

export default TermsPage;