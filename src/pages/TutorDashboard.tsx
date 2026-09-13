// src/pages/TutorDashboard.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface TutorProfile {
    full_name: string;
    subjects: string[];
    experience: string;
    whatsapp_number: string;
    bio: string;
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

    // State for "Edit Profile"
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [experience, setExperience] = useState('');
    const [bio, setBio] = useState('');
    const [editError, setEditError] = useState('');
    const [editSuccess, setEditSuccess] = useState(false);

    // State for "Respond to Session"
    const [respondingTo, setRespondingTo] = useState<SessionRequest | null>(null);
    const [meetingLink, setMeetingLink] = useState('');
    const [whatsappSessionNumber, setWhatsappSessionNumber] = useState('');
    const [responseError, setResponseError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (profileData) {
                    setProfile(profileData);
                    setWhatsappNumber(profileData.whatsapp_number || '');
                    setExperience(profileData.experience || '');
                    setBio(profileData.bio || '');
                }

                const { data: sessionsData } = await supabase
                    .from('sessions')
                    .select('*, profiles(full_name)')
                    .eq('tutor_id', user.id);

                if (sessionsData) setSessionRequests(sessionsData);
            }
            setLoading(false);
        };

        void fetchData();    }, []);

    // Update Profile
    const handleProfileUpdate = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
            .from('profiles')
            .update({
                whatsapp_number: whatsappNumber,
                experience: experience,
                bio: bio
            })
            .eq('id', user.id);

        if (error) {
            setEditError(error.message);
            return;
        }

        setEditSuccess(true);
        setTimeout(() => setEditSuccess(false), 3000);
    };

    const openResponseModal = (session: SessionRequest) => {
        setRespondingTo(session);
        setMeetingLink(session.meeting_link || '');
        setWhatsappSessionNumber(session.whatsapp_number || '');
        setResponseError('');
    };

    const handleAccept = async () => {
        if (!respondingTo) return;

        if (!meetingLink && !whatsappSessionNumber) {
            setResponseError("Please add at least a WhatsApp number or a Meeting link (Zoom/Teams/Jitsi).");
            return;
        }

        const { error } = await supabase
            .from('sessions')
            .update({
                status: 'accepted',
                meeting_link: meetingLink,
                whatsapp_number: whatsappSessionNumber
            })
            .eq('id', respondingTo.id);

        if (error) {
            setResponseError(error.message);
            return;
        }

        setSessionRequests(prev => prev.map(s => s.id === respondingTo.id ? { ...s, status: 'accepted' } : s));
        setRespondingTo(null);
    };

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
                <p>{profile.subjects?.join(', ') || 'No subjects listed'}</p>
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
                        <p>No session requests yet.</p>
                    )}
                </div>

                {/* EDIT PROFILE SECTION */}
                <div className="dash-card">
                    <h3>📝 Edit My Profile</h3>
                    <p>Add your details so learners can see them and contact you.</p>

                    <div className="form-group">
                        <label>WhatsApp Number (e.g., 27821234567)</label>
                        <input
                            type="text"
                            placeholder="e.g. 27821234567"
                            value={whatsappNumber}
                            onChange={(e) => setWhatsappNumber(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Years of Experience</label>
                        <input
                            type="number"
                            placeholder="e.g. 3"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Short Bio</label>
                        <textarea
                            rows={3}
                            placeholder="e.g. I am a passionate Maths tutor with 5 years of experience..."
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>

                    {editError && <p className="error-text">{editError}</p>}
                    {editSuccess && <p className="success-text">✅ Profile updated!</p>}

                    <button className="primary-btn small-btn" onClick={handleProfileUpdate}>
                        Save Profile
                    </button>
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
                                value={whatsappSessionNumber}
                                onChange={(e) => setWhatsappSessionNumber(e.target.value)}
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