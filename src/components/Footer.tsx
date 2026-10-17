// src/components/Footer.tsx
import { Link } from 'react-router-dom';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-content">

                {/* Column 1: Brand & Mission */}
                <div className="footer-col brand-col">
                    <h2 className="footer-logo">⛰️ Tutor<span>Connect</span></h2>
                    <p className="footer-mission">
                        Empowering South African learners to unlock their university potential,
                        and creating income opportunities for local tutors.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div className="footer-col">
                    <h4>Platform</h4>
                    <Link to="/find-tutor">Find a Tutor</Link>
                    <Link to="/resources">Past Papers & Notes</Link>
                    <Link to="/register">Become a Tutor</Link>
                    <Link to="/faq">FAQ</Link>
                </div>

                {/* Column 3: Legal */}
                <div className="footer-col">
                    <h4>Legal</h4>
                    <Link to="/terms">Terms of Service</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                    <a href="mailto:support@tutorconnect.co.za">Contact Support</a>
                </div>

            </div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} TutorConnect SA. All rights reserved.</p>
                <p>Proudly built in South Africa 🇿🇦</p>
            </div>
        </footer>
    );
}

export default Footer;