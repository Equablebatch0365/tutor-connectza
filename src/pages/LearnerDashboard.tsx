// src/pages/LearnerDashboard.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/useLanguage';

interface LearnerProfile {
    full_name: string;
    grade: string;
    province: string;
}

interface SessionRequest {
    id: string;
    date: string;
    time: string;
    message: string;
    status: string;
    meeting_link: string | null;
    whatsapp_number: string | null;
    tutor_name: string;
    tutor_id: string;
}

function LearnerDashboard() {
    const { t } = useLanguage();

    const [profile, setProfile] = useState<LearnerProfile | null>(null);
    const [sessions, setSessions] = useState<SessionRequest[]>([]);
    const [loading, setLoading] = useState(true);

    // State for the Review Modal
    const [reviewingSession, setReviewingSession] = useState<SessionRequest | null>(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviewError, setReviewError] = useState('');
    const [reviewSuccess, setReviewSuccess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('full_name, grade, province')
                    .eq('id', user.id)
                    .single();

                if (profileData) setProfile(profileData);

                const { data: sessionsData } = await supabase
                    .from('sessions')
                    .select('*')
                    .eq('learner_id', user.id);

                if (sessionsData) {
                    const sessionsWithTutorNames = await Promise.all(
                        sessionsData.map(async (session) => {
                            const { data: tutorData } = await supabase
                                .from('profiles')
                                .select('full_name')
                                .eq('id', session.tutor_id)
                                .single();

                            return { ...session, tutor_name: tutorData?.full_name || 'Unknown Tutor', tutor_id: session.tutor_id };
                        })
                    );
                    setSessions(sessionsWithTutorNames);
                }
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const openReviewModal = (session: SessionRequest) => {
        setReviewingSession(session);
        setRating(0);
        setComment('');
        setReviewError('');
        setReviewSuccess(false);
    };

    const closeReviewModal = () => {
        setReviewingSession(null);
    };

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0) {
            setReviewError("Please select a rating (1-5 stars).");
            return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
            .from('reviews')
            .insert([
                {
                    learner_id: user.id,
                    tutor_id: reviewingSession?.tutor_id,
                    rating: rating,
                    comment: comment,
                }
            ]);

        if (error) {
            setReviewError(error.message);
            return;
        }

        setReviewSuccess(true);
    };

    if (loading) return <div className="dashboard-container">Loading...</div>;
    if (!profile) return <div className="dashboard-container">Please log in to see your dashboard.</div>;

    return (
        <div className="dashboard-container">
            <div className="dash-header">
                <h1>{t.hi}, {profile.full_name} 👋</h1>
                <p>{profile.grade} | {profile.province}</p>
            </div>

            <div className="dash-grid">
                <div className="dash-card">
                    <h3>📅 {t.mySessions}</h3>
                    {sessions.length > 0 ? (
                        sessions.map((session) => (
                            <div key={session.id} className="session-card">
                                <p><strong>👨‍🏫 {t.tutorLabel}:</strong> {session.tutor_name}</p>
                                <p><strong>📅 {t.dateLabel}:</strong> {session.date} at {session.time}</p>
                                <p><strong>{t.messageLabel}:</strong> {session.message}</p>

                                <p>
                                    <strong>{t.statusLabel}:</strong>
                                    <span className={`status-${session.status}`}>
                    {session.status === 'pending' ? ' ⏳ ' + t.waitingTutor :
                        session.status === 'accepted' ? ' ✅ ' + t.accepted :
                            session.status === 'declined' ? ' ❌ ' + t.declined : session.status}
                  </span>
                                </p>

                                {session.status === 'accepted' && (
                                    <div className="meeting-details">
                                        {session.whatsapp_number && <p>💬 WhatsApp: <a href={`https://wa.me/${session.whatsapp_number}`} target="_blank">{t.chatWhatsApp}</a></p>}
                                        {session.meeting_link && <p>🔗 Link: <a href={session.meeting_link} target="_blank">{t.joinMeeting}</a></p>}
                                    </div>
                                )}

                                <button className="secondary-btn small-btn review-btn" onClick={() => openReviewModal(session)}>
                                    ⭐ Rate Tutor
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>{t.noSessionsBooked}</p>
                    )}
                </div>

                <div className="dash-card">
                    <h3>📊 {t.subjectProgress}</h3>
                    <p>{t.progressDesc}</p>
                </div>
            </div>

            {/* REVIEW MODAL */}
            {reviewingSession && (
                <div className="modal-overlay" onClick={closeReviewModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {reviewSuccess ? (
                            <div className="booking-success">
                                <h2>🎉 Review Submitted!</h2>
                                <p>Thank you for rating {reviewingSession.tutor_name}!</p>
                                <button className="primary-btn" onClick={closeReviewModal}>Close</button>
                            </div>
                        ) : (
                            <>
                                <h2>Rate {reviewingSession.tutor_name}</h2>
                                <form onSubmit={handleReviewSubmit} className="booking-form">
                                    <div className="form-group">
                                        <label>Your Rating</label>
                                        <div className="review-stars">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                    key={star}
                                                    className={star <= rating ? 'star-filled' : 'star-empty'}
                                                    onClick={() => setRating(star)}
                                                >
                          ★
                        </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Your Comment</label>
                                        <textarea
                                            rows={3}
                                            placeholder="e.g. Great tutor, explained everything clearly!"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    </div>

                                    {reviewError && <p className="error-text">{reviewError}</p>}

                                    <button type="submit" className="primary-btn auth-btn">Submit Review</button>
                                    <button type="button" className="secondary-btn cancel-btn" onClick={closeReviewModal}>Cancel</button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}

            <Link to="/find-tutor" className="primary-btn back-btn">{t.findTutorBtn}</Link>
        </div>
    );
}

export default LearnerDashboard;