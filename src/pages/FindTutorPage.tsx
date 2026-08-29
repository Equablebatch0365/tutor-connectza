// src/pages/FindTutorPage.tsx
import { useState } from 'react';

// Mock Data
const tutorsData = [
    { id: 1, name: "Mr. Sipho Dlamini", subject: "Pure Maths", province: "Gauteng", rating: 4.9, price: "R150/hr" },
    { id: 2, name: "Ms. Sarah van Wyk", subject: "Physical Sciences", province: "Western Cape", rating: 4.8, price: "R180/hr" },
    { id: 3, name: "Mr. Thabo Mokoena", subject: "Accounting", province: "KwaZulu-Natal", rating: 4.7, price: "R140/hr" },
    { id: 4, name: "Mrs. Aisha Patel", subject: "Pure Maths", province: "Gauteng", rating: 5.0, price: "R200/hr" },
    { id: 5, name: "Mr. Johan Botha", subject: "Life Sciences", province: "Free State", rating: 4.6, price: "R120/hr" },
    { id: 6, name: "Ms. Lerato Maseko", subject: "English HL", province: "Mpumalanga", rating: 4.9, price: "R130/hr" }
];

function FindTutorPage() {
    const [searchSubject, setSearchSubject] = useState('');
    const [searchProvince, setSearchProvince] = useState('');

    // State for the Booking Modal
    const [selectedTutor, setSelectedTutor] = useState<typeof tutorsData[0] | null>(null);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [bookingMessage, setBookingMessage] = useState('');
    const [isBooked, setIsBooked] = useState(false);

    const filteredTutors = tutorsData.filter(tutor => {
        const matchesSubject = searchSubject ? tutor.subject.toLowerCase().includes(searchSubject.toLowerCase()) : true;
        const matchesProvince = searchProvince ? tutor.province === searchProvince : true;
        return matchesSubject && matchesProvince;
    });

    // Open Modal
    const openBookingModal = (tutor: typeof tutorsData[0]) => {
        setSelectedTutor(tutor);
        setIsBooked(false); // Reset success message for new booking
        setBookingDate('');
        setBookingTime('');
        setBookingMessage('');
    };

    // Close Modal
    const closeBookingModal = () => {
        setSelectedTutor(null);
    };

    // Submit Booking
    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // This is where we will send the data to a real database later
        console.log("Booking Request:", {
            tutor: selectedTutor?.name,
            date: bookingDate,
            time: bookingTime,
            message: bookingMessage
        });
        setIsBooked(true); // Show success message
    };

    return (
        <div className="find-tutor-container">
            <h1 className="page-title">Find Your Tutor</h1>

            {/* Search Filters */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by subject (e.g. Pure Maths)"
                    value={searchSubject}
                    onChange={(e) => setSearchSubject(e.target.value)}
                    className="search-input"
                />
                <select
                    value={searchProvince}
                    onChange={(e) => setSearchProvince(e.target.value)}
                    className="province-select"
                >
                    <option value="">All Provinces</option>
                    <option value="Gauteng">Gauteng</option>
                    <option value="Western Cape">Western Cape</option>
                    <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                    <option value="Free State">Free State</option>
                    <option value="Mpumalanga">Mpumalanga</option>
                </select>
            </div>

            {/* Tutor List */}
            <div className="tutor-grid">
                {filteredTutors.length > 0 ? (
                    filteredTutors.map((tutor) => (
                        <div className="tutor-card" key={tutor.id}>
                            <h3>{tutor.name}</h3>
                            <p className="tutor-subject">📚 {tutor.subject}</p>
                            <p className="tutor-location">📍 {tutor.province}</p>
                            <div className="tutor-meta">
                                <span className="rating">⭐ {tutor.rating}</span>
                                <span className="price">{tutor.price}</span>
                            </div>
                            <button
                                className="primary-btn small-btn"
                                onClick={() => openBookingModal(tutor)}
                            >
                                Request Session
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="no-results">No tutors found for your search. Try another subject or province.</p>
                )}
            </div>

            {/* BOOKING MODAL */}
            {selectedTutor && (
                <div className="modal-overlay" onClick={closeBookingModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {isBooked ? (
                            <div className="booking-success">
                                <h2>🎉 Request Sent!</h2>
                                <p>Your session request for <strong>{selectedTutor.name}</strong> has been sent successfully.</p>
                                <p className="booking-summary">
                                    📅 {bookingDate} at ⏰ {bookingTime}
                                </p>
                                <button className="primary-btn" onClick={closeBookingModal}>Close</button>
                            </div>
                        ) : (
                            <>
                                <h2>Book with {selectedTutor.name}</h2>
                                <p className="modal-subtitle">📚 {selectedTutor.subject} | 💰 {selectedTutor.price}</p>

                                <form onSubmit={handleBookingSubmit} className="booking-form">
                                    <div className="form-group">
                                        <label>Preferred Date</label>
                                        <input
                                            type="date"
                                            value={bookingDate}
                                            onChange={(e) => setBookingDate(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Preferred Time</label>
                                        <input
                                            type="time"
                                            value={bookingTime}
                                            onChange={(e) => setBookingTime(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>What do you need help with?</label>
                                        <textarea
                                            rows={3}
                                            placeholder="e.g. I need help with Calculus and Trigonometry..."
                                            value={bookingMessage}
                                            onChange={(e) => setBookingMessage(e.target.value)}
                                        />
                                    </div>

                                    <button type="submit" className="primary-btn auth-btn">Confirm Request</button>
                                    <button type="button" className="secondary-btn cancel-btn" onClick={closeBookingModal}>Cancel</button>
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