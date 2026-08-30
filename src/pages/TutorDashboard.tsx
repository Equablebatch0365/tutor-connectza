// src/pages/TutorDashboard.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface TutorProfile {
    full_name: string;
    subjects: string[];
    experience: string;
    whatsapp_link: string;
}

interface SessionRequest {
    id: string;
    date: string;
    time: string;
    message: string;
    status: string;
    meeting_link: string | null;
    whatsapp_number: string | null;
    profiles: {
        full_name: string;
    };
}

function TutorDashboard() {
    const [profile, setProfile] = useState<TutorProfile | null>(null);
    const [sessionRequests, setSessionRequests] = useState<SessionRequest[]>([]);
    const [loading, setLoading] = useState(true);

    // State for the "Add WhatsApp" form
    const [whatsappLink, setWhatsappLink] = useState('');
    const [whatsappError, setWhatsappError] = useState('');

    // State for the "Response Modal"
    const [respondingTo, setRespondingTo] = useState<SessionRequest | null>(null);
    const [meetingLink, setMeetingLink] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [responseError, setResponseError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('full_name, subjects, experience, whatsapp_link')
                    .eq('id', user.id)
                    .single();

                if (profileData) {
                    setProfile(profileData);
                    setWhatsappLink(profileData.whatsapp_link || '');
                }

                const { data: sessionsData } = await supabase
                    .from('sessions')
                    .select('*, profiles(full_name)')
                    .eq('tutor_id', user.id);

                if (sessionsData) setSessionRequests(sessionsData);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    // Add or update WhatsApp link
    const handleWhatsappSubmit = async () => {
        if (!whatsappLink.trim()) {
            setWhatsappError("Please enter a valid WhatsApp link or number.");
            return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
            .from('profiles')
            .update({ whatsapp_link: whatsappLink })
            .eq('id', user.id);

        if (error) {
            setWhatsappError(error.message);
            return;
        }

        setProfile((prev) => prev ? { ...prev, whatsapp_link: whatsappLink } : prev);
        setWhatsappError('');
    };

    // Open the response modal
    const openResponseModal = (session: SessionRequest) => {
        setRespondingTo(session);
        setMeetingLink(session.meeting_link || '');
        setWhatsappNumber(session.whatsapp_number || '');
        setResponseError('');
    };

    // Accept the request
    const handleAccept = async () => {
        if (!respondingTo) return;

        if (!meetingLink && !whatsappNumber) {
            setResponseError("Please add at least a WhatsApp number or a Meeting link (Zoom/Teams/Jitsi).");
            return;
        }

        const { error } = await supabase
            .from('sessions')
            .update({
                status: 'accepted',
                meeting_link: meetingLink,
                whatsapp_number: whatsappNumber
            })
            .eq('id', respondingTo.id);

        if (error) {
            setResponseError(error.message);
            return;
        }

        setSessionRequests(prev => prev.map(s => s.id === respondingTo.id ? { ...s, status: 'accepted' } : s));
        setRespondingTo(null);
    };

    // Decline the request
    const handleDecline = async () => {
        if (!respondingTo) return;

        const { error } = await supabase
            .from('sessions')
            .update({ status: 'declined' })
            .eq('id', respondingTo.id);

        if (error) {
            setResponseError(error.message);
            return;
        }

        setSessionRequests(prev => prev.map(s => s.id === respondingTo.id ? { ...s, status: 'declined' } : s));
        setRespondingTo(null);
    };

    if (loading) return <div className="dashboard-container">Loading...</div>;
    if (!profile) return <div className="dashboard-container">Please log in to see your dashboard.</div>;

    return (
        <div className="dashboard-container">
            <div className="dash-header">
                <h1>Welcome, {profile.full_name} 💼</h1>
                <p>{profile.subjects?.join(', ') || 'No subjects listed'} | {profile.experience || 'No experience'} Years Experience</p>
            </div>

            <div className="dash-grid">
                <div className="dash-card">
                    <h3>📅 Session Requests</h3>
                    {sessionRequests.length > 0 ? (
                        sessionRequests.map((session) => (
                            <div key={session.id} className="session-card">
                                <p><strong>👨‍🎓 Student:</strong> {session.profiles?.full_name || 'Student'}</p>
                                <p><strong>📅 Date:</strong> {session.date} at {session.time}</p>
                                <p><strong>Message:</strong> {session.message}</p>
                                <p>Status: <strong className={`status-${session.status}`}>{session.status}</strong></p>

                                {session.status === 'accepted' && (
                                    <div className="meeting-details">
                                        {session.whatsapp_number && <p>💬 WhatsApp: <a href={`https://wa.me/${session.whatsapp_number}`} target="_blank">{session.whatsapp_number}</a></p>}
                                        {session.meeting_link && <p>🔗 Link: <a href={session.meeting_link} target="_blank">Join Meeting</a></p>}
                                    </div>
                                )}

                                {session.status === 'pending' && (
                                    <button className="primary-btn small-btn respond-btn" onClick={() => openResponseModal(session)}>
                                        Respond to Request
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No session requests yet. Your profile will be visible to learners soon!</p>
                    )}
                </div>

                <div className="dash-card">
                    <h3>📱 Connect with Learners</h3>
                    <p>Add your WhatsApp number (with country code) or link so learners can reach you before booking.</p>

                    <div className="form-group">
                        <label>WhatsApp Link or Number</label>
                        <input
                            type="text"
                            placeholder="e.g. https://wa.me/27821234567"
                            value={whatsappLink}
                            onChange={(e) => setWhatsappLink(e.target.value)}
                        />
                    </div>
                    {whatsappError && <p className="error-text">{whatsappError}</p>}
                    <button className="primary-btn small-btn" onClick={handleWhatsappSubmit}>Save WhatsApp Link</button>
                </div>

                <div className="dash-card earnings-card">
                    <h3>💰 Earnings (This Month)</h3>
                    <p className="earnings-number">R0.00</p>
                    <p className="earnings-sub">Payouts will be available once payment integration is live.</p>
                </div>
            </div>

            {/* RESPONSE MODAL */}
            {respondingTo && (
                <div className="modal-overlay" onClick={() => setRespondingTo(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Respond to Request</h2>
                        <p>Accept the session and provide your contact details or meeting link.</p>

                        <div className="form-group">
                            <label>WhatsApp Number (including country code, e.g., +27...)</label>
                            <input
                                type="text"
                                placeholder="e.g. +27821234567"
                                value={whatsappNumber}
                                onChange={(e) => setWhatsappNumber(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Meeting Link (Zoom, Teams, Jitsi, Google Meet)</label>
                            <input
                                type="text"
                                placeholder="https://zoom.us/j/..."
                                value={meetingLink}
                                onChange={(e) => setMeetingLink(e.target.value)}
                            />
                        </div>

                        {responseError && <p className="error-text">{responseError}</p>}

                        <div className="modal-actions">
                            <button className="primary-btn" onClick={handleAccept}>✅ Accept</button>
                            <button className="secondary-btn cancel-btn" onClick={handleDecline}>❌ Decline</button>
                        </div>
                    </div>
                </div>
            )}

            <Link to="/" className="secondary-btn back-btn">Back to Home</Link>
        </div>
    );
}

export default TutorDashboard;