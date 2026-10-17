// src/components/MotivationPopup.tsx
import { useEffect, useState } from 'react';

const QUOTES = [
    { text: "You’ve got the brains, now bring the fire! Matric is your stage.", author: "TutorConnect" },
    { text: "Don’t just pass. Make them remember your name.", author: "SA Idols Wisdom" },
    { text: "The only limit is the one you set for yourself. Go out there and smash it.", author: "TutorConnect" },
    { text: "Every expert was once a beginner. Keep showing up.", author: "SA Idols Wisdom" },
    { text: "Your future self is watching you right now through your actions.", author: "TutorConnect" }
];

function MotivationPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [quote, setQuote] = useState(QUOTES[0]);

    useEffect(() => {
        // Check if the popup has been shown in the last 24 hours
        const lastShown = localStorage.getItem('tutorconnect_motivation_last_shown');
        const now = Date.now();

        // 24 hours in milliseconds = 86,400,000
        if (!lastShown || (now - parseInt(lastShown)) > 86400000) {
            // Pick a random quote
            const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
            setQuote(randomQuote);
            setIsOpen(true);

            // Save the timestamp
            localStorage.setItem('tutorconnect_motivation_last_shown', now.toString());
        }
    }, []);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay popup-overlay" onClick={() => setIsOpen(false)}>
            <div className="motivation-popup" onClick={(e) => e.stopPropagation()}>
                <button className="popup-close" onClick={() => setIsOpen(false)}>✕</button>

                <div className="popup-icon">🌟</div>
                <h2>Daily Motivation</h2>
                <p className="quote-text">"{quote.text}"</p>
                <p className="quote-author">— {quote.author}</p>

                <button className="primary-btn auth-btn" onClick={() => setIsOpen(false)}>
                    Let's Go!
                </button>
            </div>
        </div>
    );
}

export default MotivationPopup;