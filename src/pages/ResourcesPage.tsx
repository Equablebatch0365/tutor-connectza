// src/pages/ResourcesPage.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/useLanguage';

interface Resource {
    id: string;
    title: string;
    subject: string;
    grade: string;
    description: string;
    file_url: string;
    source_url: string;
}

function ResourcesPage() {
    const { t } = useLanguage(); // <--- Use translations

    const [resources, setResources] = useState<Resource[]>([]);
    const [searchSubject, setSearchSubject] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            const { data, error } = await supabase
                .from('resources')
                .select('*')
                .order('grade', { ascending: true });

            if (error) {
                console.error("Error fetching resources:", error);
            } else if (data) {
                setResources(data);
            }
            setLoading(false);
        };

        fetchResources();
    }, []);

    const filteredResources = resources.filter(resource =>
        searchSubject ? resource.subject.toLowerCase().includes(searchSubject.toLowerCase()) : true
    );

    if (loading) return <div className="resources-container">Loading...</div>;

    return (
        <div className="resources-container">
            <h1 className="page-title">{t.resourcesTitle}</h1>
            <p className="section-subtitle">{t.resourcesSubtitle}</p>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by subject (e.g. Pure Maths)"
                    value={searchSubject}
                    onChange={(e) => setSearchSubject(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="resource-grid">
                {filteredResources.length > 0 ? (
                    filteredResources.map((resource) => (
                        <div className="resource-card" key={resource.id}>
                            <h3>{resource.title}</h3>
                            <p className="resource-meta">📖 {resource.subject} | 🎓 {resource.grade}</p>
                            <p className="resource-description">{resource.description}</p>

                            {/* Data-Light Feature */}
                            <div className="resource-actions">
                                <a href={resource.file_url} target="_blank" rel="noopener noreferrer" className="primary-btn small-btn">
                                    📥 {t.downloadPDF}
                                </a>
                                <a href={resource.source_url} target="_blank" rel="noopener noreferrer" className="secondary-btn small-btn">
                                    📖 {t.officialSource}
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-results">No resources found for this subject. Check back soon!</p>
                )}
            </div>
        </div>
    );
}

export default ResourcesPage;