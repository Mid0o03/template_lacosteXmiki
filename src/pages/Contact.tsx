
import * as React from 'react';
import { useI18n } from '../contexts/I18nContext';

import { content } from '../config/content';

const Contact: React.FC = () => {
    const { language } = useI18n();
    const text = content[language];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Message sent! (Demo)');
    };

    return (
        <div className="about-section" style={{ paddingTop: '150px', minHeight: '80vh' }}>
            <div className="container">
                <div className="contact-content" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h1 className="section-title">{text.contact.title}</h1>
                    <p style={{ textAlign: 'center', marginBottom: '30px' }}>{text.contact.subtitle}</p>
                    <form className="contact-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="form-group">
                            <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Name</label>
                            <input type="text" id="name" required style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: '8px' }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Email</label>
                            <input type="email" id="email" required style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: '8px' }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Message</label>
                            <textarea id="message" rows={5} required style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: '8px' }}></textarea>
                        </div>
                        <button type="submit" className="cta-button" style={{ marginTop: '10px' }}>Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
