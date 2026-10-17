// src/pages/LearnerProfilePage.tsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';


// All SA curriculum subjects (NSC)
const SA_SUBJECTS = [
    // Languages
    'English HL', 'English FAL',
    'Afrikaans HL', 'Afrikaans FAL',
    'isiZulu HL', 'isiZulu FAL',
    'isiXhosa HL', 'isiXhosa FAL',
    'Sesotho HL', 'Sesotho FAL',
    'Setswana HL', 'Setswana FAL',
    'Sepedi HL', 'Sepedi FAL',
    'Xitsonga HL', 'Xitsonga FAL',
    'Tshivenda HL', 'Tshivenda FAL',
    'siSwati HL', 'siSwati FAL',
    'isiNdebele HL', 'isiNdebele FAL',
    // Mathematics
    'Pure Maths', 'Maths Lit',
    // Sciences
    'Physical Sciences', 'Life Sciences', 'Agricultural Sciences',
    // Commerce
    'Accounting', 'Business Studies', 'Economics',
    // Humanities
    'Geography', 'History', 'Tourism', 'Religion Studies',
    // Technical
    'Information Technology', 'Computer Applications Technology (CAT)',
    'Engineering Graphics & Design', 'Technical Mathematics',
    'Technical Sciences', 'Civil Technology', 'Electrical Technology',
    'Mechanical Technology',
    // Arts & Culture
    'Visual Arts', 'Dramatic Arts', 'Music', 'Dance Studies',
    'Design', 'Consumer Studies',
    // Other
    'Life Orientation'
];

interface LearnerProfile {
    full_name: string;
    grade: string;
    province: string;
    learner_subjects: string[];
}

function LearnerProfilePage() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState<LearnerProfile | null>(null);
    const [fullName, setFullName] = useState('');
    const [grade, setGrade] = useState('');
    const [province, setProvince] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/login');
                return;
            }

            const { data, error } = await supabase
                .from('profiles')
                .select('full_name, grade, province, learner_subjects')
                .eq('id', user.id)
                .single();

            if (error) {
                setError(error.message);
            } else if (data) {
                setProfile(data);
                setFullName(data.full_name || '');
                setGrade(data.grade || '');
                setProvince(data.province || '');
                setSelectedSubjects(data.learner_subjects || []);
            }
            setLoading(false);
        };

        fetchProfile();
    }, [navigate]);

    const toggleSubject = (subject: string) => {
        setSelectedSubjects(prev =>
            prev.includes(subject)
                ? prev.filter(s => s !== subject)
                : [...prev, subject]
        );
    };

    const handleSave = async () => {
        setError('');
        setSuccess(false);

        if (!fullName.trim()) {
            setError('Please enter your full name.');
            return;
        }

        setSaving(true);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setError('Not logged in.');
            setSaving(false);
            return;
        }

        const { error } = await supabase
            .from('profiles')
            .update({
                full_name: fullName.trim(),
                grade: grade,
                province: province,
                learner_subjects: selectedSubjects,
            })
            .eq('id', user.id);

        if (error) {
            setError(error.message);
        } else {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }
        setSaving(false);
    };

    if (loading) return <div className="dashboard-container">Loading...</div>;
    if (!profile) return <div className="dashboard-container">Profile not found.</div>;

    return (
        <div className="dashboard-container">
            <div className="dash-header">
                <h1>My Profile</h1>
                <p>Keep your details up to date so tutors can help you better.</p>
            </div>

            <div className="profile-edit-card">
                {/* Full Name */}
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                    />
                </div>

                {/* Grade */}
                <div className="form-group">
                    <label>Current Grade</label>
                    <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                        <option value="">Select Grade</option>
                        <option value="10">Grade 10</option>
                        <option value="11">Grade 11</option>
                        <option value="12">Grade 12 (Matric)</option>
                    </select>
                </div>

                {/* Province */}
                <div className="form-group">
                    <label>Province</label>
                    <select value={province} onChange={(e) => setProvince(e.target.value)}>
                        <option value="">Select Province</option>
                        <option value="Gauteng">Gauteng</option>
                        <option value="Western Cape">Western Cape</option>
                        <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                        <option value="Eastern Cape">Eastern Cape</option>
                        <option value="Free State">Free State</option>
                        <option value="Limpopo">Limpopo</option>
                        <option value="Mpumalanga">Mpumalanga</option>
                        <option value="North West">North West</option>
                        <option value="Northern Cape">Northern Cape</option>
                    </select>
                </div>

                {/* Subjects */}
                <div className="form-group">
                    <label>Subjects I'm Taking ({selectedSubjects.length} selected)</label>
                    <div className="subject-checkbox-grid">
                        {SA_SUBJECTS.map((subject) => (
                            <label key={subject} className="subject-checkbox">
                                <input
                                    type="checkbox"
                                    checked={selectedSubjects.includes(subject)}
                                    onChange={() => toggleSubject(subject)}
                                />
                                <span>{subject}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {error && <p className="error-text">{error}</p>}
                {success && <p className="success-text">✅ Profile saved!</p>}

                <div className="profile-actions">
                    <button className="primary-btn" onClick={handleSave} disabled={saving}>
                        {saving ? 'Saving...' : 'Save Profile'}
                    </button>
                    <Link to="/learner-dashboard" className="secondary-btn">Cancel</Link>
                </div>
            </div>
        </div>
    );
}

export default LearnerProfilePage;