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
}

function LearnerDashboard() {
    const { t } = useLanguage(); // <--- Use translations

    const [profile, setProfile] = useState<LearnerProfile | null>(null);
    const [sessions, setSessions] = useState<SessionRequest[]>([]);
    const [loading, setLoading] = useState(true);

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
                    // Manually fetch each tutor's name
                    const sessionsWithTutorNames = await Promise.all(
                        sessionsData.map(async (session) => {
                            const { data: tutorData } = await supabase
                                .from('profiles')
                                .select('full_name')
                                .eq('id', session.tutor_id)
                                .single();

                            return { ...session, tutor_name: tutorData?.full_name || 'Unknown Tutor' };
                        })
                    );
                    setSessions(sessionsWithTutorNames);
                }
            }
            setLoading(false);
        };

        fetchData();
    }, []);

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

                                {/* Show meeting details if accepted */}
                                {session.status === 'accepted' && (
                                    <div className="meeting-details">
                                        {session.whatsapp_number && <p>💬 WhatsApp: <a href={`https://wa.me/${session.whatsapp_number}`} target="_blank">{t.chatWhatsApp}</a></p>}
                                        {session.meeting_link && <p>🔗 Link: <a href={session.meeting_link} target="_blank">{t.joinMeeting}</a></p>}
                                    </div>
                                )}
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

            <Link to="/find-tutor" className="primary-btn back-btn">{t.findTutorBtn}</Link>
        </div>
    );
}

export default LearnerDashboard;