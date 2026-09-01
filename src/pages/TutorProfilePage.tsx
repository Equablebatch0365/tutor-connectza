// src/pages/TutorProfilePage.tsx
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/useLanguage';

interface TutorProfile {
    id: string;
    full_name: string;
    subjects: string[];
    province: string;
    whatsapp_number: string;
    experience: string;
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
    const { t } = useLanguage();

    const [tutor, setTutor] = useState<TutorProfile | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

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

            // Fetch reviews for this tutor
            const { data: reviewData } = await supabase
                .from('reviews')
                .select('*, profiles(full_name)')
                .eq('tutor_id', tutorId);

            if (reviewData) setReviews(reviewData);

            setLoading(false);
        };

        fetchTutor();
    }, [tutorId]);

    if (loading) return <div className="dashboard-container">Loading...</div>;
    if (!tutor) return <div className="dashboard-container">Tutor not found.</div>;

    return (
        <div className="dashboard-container">
            <div className="tutor-profile-header">
                <h1>{tutor.full_name}</h1>
                <p>📚 {tutor.subjects?.join(', ')} | 📍 {tutor.province}</p>
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

            <Link to="/find-tutor" className="secondary-btn back-btn">{t.home}</Link>
        </div>
    );
}

export default TutorProfilePage;