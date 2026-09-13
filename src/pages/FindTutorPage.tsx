// src/pages/FindTutorPage.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/useLanguage';

interface Tutor {
    id: string;
    full_name: string;
    subjects: string[];
    province: string;
    whatsapp_number: string;
    is_verified: boolean;
}

interface Rating {
    tutor_id: string;
    avg_rating: number;
    review_count: number;
}

function FindTutorPage() {
    const { t } = useLanguage();

    const [tutors, setTutors] = useState<Tutor[]>([]);
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [searchSubject, setSearchSubject] = useState('');
    const [searchProvince, setSearchProvince] = useState('');
    const [loading, setLoading] = useState(true);

    // State for the Booking Modal
    const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [bookingMessage, setBookingMessage] = useState('');
    const [bookingError, setBookingError] = useState('');
    const [isBooked, setIsBooked] = useState(false);

    useEffect(() => {
        const fetchTutors = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            // Get the current user's blocked list
            let blockedList: string[] = [];
            if (user) {
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('blocked_tutors')
                    .eq('id', user.id)
                    .single();
                blockedList = profileData?.blocked_tutors || [];
            }

            const { data, error } = await supabase
                .from('profiles')
                .select('id, full_name, subjects, province, whatsapp_number, is_verified')                .eq('role', 'tutor');

            if (error) {
                console.error("Error fetching tutors:", error);
            } else if (data) {
                // Filter out blocked tutors
                const filtered = data.filter(tutor => !blockedList.includes(tutor.id));
                setTutors(filtered);
            }

            // Fetch ratings
            const { data: ratingData } = await supabase
                .from('reviews')
                .select('tutor_id, rating');

            if (ratingData) {
                const ratingMap: { [key: string]: number[] } = {};
                ratingData.forEach((r) => {
                    if (!ratingMap[r.tutor_id]) ratingMap[r.tutor_id] = [];
                    ratingMap[r.tutor_id].push(r.rating);
                });

                const calculatedRatings: Rating[] = Object.keys(ratingMap).map((tutorId) => ({
                    tutor_id: tutorId,
                    avg_rating: ratingMap[tutorId].reduce((a, b) => a + b, 0) / ratingMap[tutorId].length,
                    review_count: ratingMap[tutorId].length,
                }));

                setRatings(calculatedRatings);
            }

            setLoading(false);
        };

        fetchTutors();
    }, []);

    const getAverageRating = (tutorId: string) => {
        const rating = ratings.find((r) => r.tutor_id === tutorId);
        return rating || null;
    };

    const filteredTutors = tutors.filter(tutor => {
        const subjectsArray = tutor.subjects || [];
        const matchesSubject = searchSubject ? subjectsArray.some(s => s.toLowerCase().includes(searchSubject.toLowerCase())) : true;
        const matchesProvince = searchProvince ? tutor.province === searchProvince : true;
        return matchesSubject && matchesProvince;
    });

    const openBookingModal = (tutor: Tutor) => {
        setSelectedTutor(tutor);
        setIsBooked(false);
        setBookingError('');
        setBookingDate('');
        setBookingTime('');
        setBookingMessage('');
    };

    const closeBookingModal = () => {
        setSelectedTutor(null);
    };

    const handleBookingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            setBookingError("You must be logged in to book a session.");
            return;
        }

        const { error } = await supabase
            .from('sessions')
            .insert([
                {
                    learner_id: user.id,
                    tutor_id: selectedTutor?.id,
                    date: bookingDate,
                    time: bookingTime,
                    message: bookingMessage,
                }
            ]);

        if (error) {
            setBookingError(error.message);
            return;
        }

        setIsBooked(true);
    };

    if (loading) return <div className="find-tutor-container">Loading...</div>;

    return (
        <div className="find-tutor-container">
            <h1 className="page-title">{t.findTutorTitle}</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder={t.searchSubject}
                    value={searchSubject}
                    onChange={(e) => setSearchSubject(e.target.value)}
                    className="search-input"
                />
                <select
                    value={searchProvince}
                    onChange={(e) => setSearchProvince(e.target.value)}
                    className="province-select"
                >
                    <option value="">{t.allProvinces}</option>
                    <option value="Gauteng">Gauteng</option>
                    <option value="Western Cape">Western Cape</option>
                    <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                    <option value="Free State">Free State</option>
                    <option value="Mpumalanga">Mpumalanga</option>
                </select>
            </div>

            <div className="tutor-grid">
                {filteredTutors.length > 0 ? (
                    filteredTutors.map((tutor) => {
                        const ratingInfo = getAverageRating(tutor.id);
                        const avg = ratingInfo ? ratingInfo.avg_rating : 0;

                        return (
                            <div className="tutor-card" key={tutor.id}>
                                {/* Profile Link */}
                                <Link to={`/tutor/${tutor.id}`} className="tutor-name-link">
                                    <h3>
                                        {tutor.full_name}
                                        {tutor.is_verified && <span className="verified-badge" title="Verified Tutor">✔</span>}
                                    </h3>                                </Link>
                                <p className="tutor-subject">📚 {tutor.subjects?.join(', ')}</p>
                                <p className="tutor-location">📍 {tutor.province}</p>

                                {/* Rating */}
                                <div className="rating-display">
                                    <div className="stars-display">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span key={star} className={star <= Math.round(avg) ? 'star-filled' : 'star-empty'}>
                        ★
                      </span>
                                        ))}
                                    </div>
                                    <span className="rating-text">
                    {ratingInfo ? `${avg.toFixed(1)} (${ratingInfo.review_count} reviews)` : "No ratings yet"}
                  </span>
                                </div>

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

                                <button
                                    className="primary-btn small-btn"
                                    onClick={() => openBookingModal(tutor)}
                                >
                                    {t.requestSession}
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p className="no-results">{t.noTutorsFound}</p>
                )}
            </div>

            {/* BOOKING MODAL */}
            {selectedTutor && (
                <div className="modal-overlay" onClick={closeBookingModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {isBooked ? (
                            <div className="booking-success">
                                <h2>🎉 {t.requestSent}</h2>
                                <p>{t.requestSentDesc}</p>
                                <p className="booking-summary">
                                    📅 {bookingDate} at ⏰ {bookingTime}
                                </p>
                                <button className="primary-btn" onClick={closeBookingModal}>{t.close}</button>
                            </div>
                        ) : (
                            <>
                                <h2>{selectedTutor.full_name}</h2>
                                <p className="modal-subtitle">📚 {selectedTutor.subjects?.join(', ')} | 📍 {selectedTutor.province}</p>

                                <form onSubmit={handleBookingSubmit} className="booking-form">
                                    <div className="form-group">
                                        <label>{t.preferredDate}</label>
                                        <input
                                            type="date"
                                            value={bookingDate}
                                            onChange={(e) => setBookingDate(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>{t.preferredTime}</label>
                                        <input
                                            type="time"
                                            value={bookingTime}
                                            onChange={(e) => setBookingTime(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>{t.helpWith}</label>
                                        <textarea
                                            rows={3}
                                            placeholder="e.g. I need help with Calculus and Trigonometry..."
                                            value={bookingMessage}
                                            onChange={(e) => setBookingMessage(e.target.value)}
                                        />
                                    </div>

                                    {bookingError && <p className="error-text">{bookingError}</p>}

                                    <button type="submit" className="primary-btn auth-btn">{t.confirmRequest}</button>
                                    <button type="button" className="secondary-btn cancel-btn" onClick={closeBookingModal}>{t.cancel}</button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FindTutorPage;