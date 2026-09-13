// src/pages/TutorProfilePage.tsx
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/useLanguage';

interface TutorProfile {
    id: string;
    full_name: string;
    subjects: string[];
    province: string;
    whatsapp_number: string;
    experience: string;
    is_verified: boolean;
}

interface Review {
    id: string;
    rating: number;
    comment: string;
    created_at: string;
    profiles: {
        full_name: string;
    };
}

function TutorProfilePage() {
    const { tutorId } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const [tutor, setTutor] = useState<TutorProfile | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    // Report Modal State
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [reportDetails, setReportDetails] = useState('');
    const [reportError, setReportError] = useState('');
    const [reportSuccess, setReportSuccess] = useState(false);

    // Block State
    const [showBlockConfirm, setShowBlockConfirm] = useState(false);
    const [blockError, setBlockError] = useState('');

    useEffect(() => {
        const fetchTutor = async () => {
            if (!tutorId) return;

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', tutorId)
                .single();

            if (error) {
                console.error("Error fetching tutor:", error);
            } else if (data) {
                setTutor(data);
            }

            const { data: reviewData } = await supabase
                .from('reviews')
                .select('*, profiles(full_name)')
                .eq('tutor_id', tutorId);

            if (reviewData) setReviews(reviewData);

            setLoading(false);
        };

        fetchTutor();
    }, [tutorId]);

    const handleReportSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!reportReason) {
            setReportError("Please select a reason.");
            return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setReportError("You must be logged in to report a tutor.");
            return;
        }

        const { error } = await supabase
            .from('reports')
            .insert([
                {
                    reporter_id: user.id,
                    reported_id: tutorId,
                    reason: reportReason,
                    details: reportDetails,
                }
            ]);

        if (error) {
            setReportError(error.message);
            return;
        }

        setReportSuccess(true);
    };

    const handleBlock = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setBlockError("You must be logged in to block a tutor.");
            return;
        }

        // Get current blocked list
        const { data: profile } = await supabase
            .from('profiles')
            .select('blocked_tutors')
            .eq('id', user.id)
            .single();

        const currentBlocked = profile?.blocked_tutors || [];
        const newBlocked = [...currentBlocked, tutorId];

        const { error } = await supabase
            .from('profiles')
            .update({ blocked_tutors: newBlocked })
            .eq('id', user.id);

        if (error) {
            setBlockError(error.message);
            return;
        }

        // Go back to find tutor
        navigate('/find-tutor');
    };

    if (loading) return <div className="dashboard-container">Loading...</div>;
    if (!tutor) return <div className="dashboard-container">Tutor not found.</div>;

    return (
        <div className="dashboard-container">
            <div className="tutor-profile-header">
                <h1>
                    {tutor.full_name}
                    {tutor.is_verified && <span className="verified-badge-large" title="Verified Tutor">✔</span>}
                </h1>                <p>📚 {tutor.subjects?.join(', ')} | 📍 {tutor.province}</p>
                <p>💼 {tutor.experience || 'No experience listed'} Years Experience</p>

                {tutor.whatsapp_number && (
                    <a
                        href={`https://wa.me/${tutor.whatsapp_number.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-btn"
                    >
                        💬 Chat on WhatsApp
                    </a>
                )}
            </div>

            <div className="reviews-section">
                <h3>Reviews ({reviews.length})</h3>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <div className="review-header">
                                <strong>{review.profiles?.full_name || 'Learner'}</strong>
                                <span className="review-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= review.rating ? 'star-filled' : 'star-empty'}>★</span>
                  ))}
                </span>
                            </div>
                            <p>{review.comment}</p>
                            <small>{new Date(review.created_at).toLocaleDateString()}</small>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>

            {/* TRUST & SAFETY ACTIONS */}
            <div className="trust-actions">
                <button
                    className="secondary-btn report-btn"
                    onClick={() => setShowReportModal(true)}
                >
                    🚩 Report this Tutor
                </button>
                <button
                    className="secondary-btn block-btn"
                    onClick={() => setShowBlockConfirm(true)}
                >
                    🚫 Block this Tutor
                </button>
            </div>

            {/* REPORT MODAL */}
            {showReportModal && (
                <div className="modal-overlay" onClick={() => setShowReportModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {reportSuccess ? (
                            <div className="booking-success">
                                <h2>✅ Report Submitted</h2>
                                <p>Thank you. Our team will review this report shortly.</p>
                                <button className="primary-btn" onClick={() => setShowReportModal(false)}>Close</button>
                            </div>
                        ) : (
                            <>
                                <h2>Report {tutor.full_name}</h2>
                                <p>Please tell us why you are reporting this tutor.</p>
                                <form onSubmit={handleReportSubmit} className="booking-form">
                                    <div className="form-group">
                                        <label>Reason</label>
                                        <select value={reportReason} onChange={(e) => setReportReason(e.target.value)}>
                                            <option value="">Select a reason</option>
                                            <option value="Inappropriate behavior">Inappropriate behavior</option>
                                            <option value="Did not show up">Did not show up to session</option>
                                            <option value="Harassment">Harassment</option>
                                            <option value="Fake profile">Fake profile</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Additional Details (optional)</label>
                                        <textarea
                                            rows={3}
                                            placeholder="Describe what happened..."
                                            value={reportDetails}
                                            onChange={(e) => setReportDetails(e.target.value)}
                                        />
                                    </div>

                                    {reportError && <p className="error-text">{reportError}</p>}

                                    <button type="submit" className="primary-btn auth-btn">Submit Report</button>
                                    <button type="button" className="secondary-btn cancel-btn" onClick={() => setShowReportModal(false)}>Cancel</button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* BLOCK CONFIRM MODAL */}
            {showBlockConfirm && (
                <div className="modal-overlay" onClick={() => setShowBlockConfirm(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Block {tutor.full_name}?</h2>
                        <p>You will no longer see this tutor in your searches. This action cannot be undone from the app.</p>
                        {blockError && <p className="error-text">{blockError}</p>}
                        <div className="modal-actions">
                            <button className="primary-btn block-confirm" onClick={handleBlock}>Yes, Block</button>
                            <button className="secondary-btn cancel-btn" onClick={() => setShowBlockConfirm(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <Link to="/find-tutor" className="secondary-btn back-btn">{t.home}</Link>
        </div>
    );
}

export default TutorProfilePage;