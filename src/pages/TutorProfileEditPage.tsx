// src/pages/TutorProfileEditPage.tsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// Same SA subjects list as learner
const SA_SUBJECTS = [
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
    'Pure Maths', 'Maths Lit',
    'Physical Sciences', 'Life Sciences', 'Agricultural Sciences',
    'Accounting', 'Business Studies', 'Economics',
    'Geography', 'History', 'Tourism', 'Religion Studies',
    'Information Technology', 'Computer Applications Technology (CAT)',
    'Engineering Graphics & Design', 'Technical Mathematics',
    'Technical Sciences', 'Civil Technology', 'Electrical Technology',
    'Mechanical Technology',
    'Visual Arts', 'Dramatic Arts', 'Music', 'Dance Studies',
    'Design', 'Consumer Studies',
    'Life Orientation'
];


function TutorProfileEditPage() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Form state
    const [fullName, setFullName] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [experience, setExperience] = useState('');
    const [bio, setBio] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');

    // Banking state
    const [bankName, setBankName] = useState('');
    const [bankAccountName, setBankAccountName] = useState('');
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [bankBranchCode, setBankBranchCode] = useState('');
    const [bankAccountType, setBankAccountType] = useState('Cheque');

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/login');
                return;
            }

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) {
                setError(error.message);
            } else if (data) {
                setFullName(data.full_name || '');
                setSelectedSubjects(data.subjects || []);
                setExperience(data.experience || '');
                setBio(data.bio || '');
                setWhatsappNumber(data.whatsapp_number || '');
                setBankName(data.bank_name || '');
                setBankAccountName(data.bank_account_name || '');
                setBankAccountNumber(data.bank_account_number || '');
                setBankBranchCode(data.bank_branch_code || '');
                setBankAccountType(data.bank_account_type || 'Cheque');
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

        if (selectedSubjects.length === 0) {
            setError('Please select at least one subject you teach.');
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
                subjects: selectedSubjects,
                experience: experience,
                bio: bio,
                whatsapp_number: whatsappNumber,
                bank_name: bankName,
                bank_account_name: bankAccountName,
                bank_account_number: bankAccountNumber,
                bank_branch_code: bankBranchCode,
                bank_account_type: bankAccountType,
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

    return (
        <div className="dashboard-container">
            <div className="dash-header">
                <h1>Edit My Tutor Profile</h1>
                <p>Update your details so learners can find and trust you.</p>
            </div>

            <div className="profile-edit-card">
                {/* Basic Info */}
                <h3 className="section-heading">👤 Basic Info</h3>

                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                    />
                </div>

                <div className="form-group">
                    <label>Years of Experience</label>
                    <input
                        type="number"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="e.g. 3"
                    />
                </div>

                <div className="form-group">
                    <label>Bio</label>
                    <textarea
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell learners about yourself, your teaching style, and your qualifications..."
                    />
                </div>

                <div className="form-group">
                    <label>WhatsApp Number (with country code, e.g. 27821234567)</label>
                    <input
                        type="text"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        placeholder="e.g. 27821234567"
                    />
                </div>

                {/* Subjects */}
                <h3 className="section-heading">📚 Subjects I Teach ({selectedSubjects.length} selected)</h3>
                <div className="form-group">
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

                {/* Banking Details */}
                <h3 className="section-heading">🏦 Banking Details (for payouts)</h3>
                <p className="section-note">
                    These details are only visible to TutorConnect. They will be used to pay you for completed sessions.
                </p>

                <div className="form-group">
                    <label>Account Holder Name</label>
                    <input
                        type="text"
                        value={bankAccountName}
                        onChange={(e) => setBankAccountName(e.target.value)}
                        placeholder="Name on the bank account"
                    />
                </div>

                <div className="form-group">
                    <label>Bank Name</label>
                    <input
                        type="text"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="e.g. Capitec, FNB, Absa, Standard Bank, Nedbank"
                    />
                </div>

                <div className="form-group">
                    <label>Account Number</label>
                    <input
                        type="text"
                        value={bankAccountNumber}
                        onChange={(e) => setBankAccountNumber(e.target.value)}
                        placeholder="e.g. 1234567890"
                    />
                </div>

                <div className="form-group">
                    <label>Branch Code</label>
                    <input
                        type="text"
                        value={bankBranchCode}
                        onChange={(e) => setBankBranchCode(e.target.value)}
                        placeholder="e.g. 470010"
                    />
                </div>

                <div className="form-group">
                    <label>Account Type</label>
                    <select value={bankAccountType} onChange={(e) => setBankAccountType(e.target.value)}>
                        <option value="Cheque">Cheque / Current</option>
                        <option value="Savings">Savings</option>
                        <option value="Transmission">Transmission</option>
                    </select>
                </div>

                {error && <p className="error-text">{error}</p>}
                {success && <p className="success-text">✅ Profile saved!</p>}

                <div className="profile-actions">
                    <button className="primary-btn" onClick={handleSave} disabled={saving}>
                        {saving ? 'Saving...' : 'Save Profile'}
                    </button>
                    <Link to="/tutor-dashboard" className="secondary-btn">Cancel</Link>
                </div>
            </div>
        </div>
    );
}

export default TutorProfileEditPage;