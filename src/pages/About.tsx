
import * as React from 'react';
import { useI18n } from '../contexts/I18nContext';

const About: React.FC = () => {
    const { t } = useI18n();

    return (
        <section className="about-section" style={{ paddingTop: '150px', minHeight: '80vh' }}>
            <div className="container">
                <div className="about-content">
                    <h2 className="section-title">{t('about.title')}</h2>
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <p>{t('about.paragraph1')}</p>
                        <p>{t('about.paragraph2')}</p>
                        <p>{t('about.paragraph3')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
