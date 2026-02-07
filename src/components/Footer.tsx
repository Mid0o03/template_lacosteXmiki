
import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';

import { branding } from '../config/branding';
import { content } from '../config/content';

const Footer: React.FC = () => {
    const { t, language } = useI18n();
    const text = content[language];

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>{branding.siteName}</h3>
                    <p>{text.about.teaser}</p>
                    <div className="social-links">
                        <a href={branding.contact.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">📷</a>
                        <a href={branding.contact.socials.twitter} target="_blank" rel="noreferrer" aria-label="Facebook">📘</a>
                        <a href={branding.contact.socials.facebook} target="_blank" rel="noreferrer" aria-label="Twitter">🐦</a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>{t('footer.products.title')}</h4>
                    <ul>
                        <li><Link to="/collection">{t('footer.products.new')}</Link></li>
                        <li><Link to="/collection">{t('footer.products.men')}</Link></li>
                        <li><Link to="/collection">{t('footer.products.women')}</Link></li>
                        {/* Other links can point to collection or dummy pages */}
                        <li><Link to="#">{t('footer.products.kids')}</Link></li>
                        <li><Link to="#">{t('footer.products.accessories')}</Link></li>
                        <li><Link to="#">{t('footer.products.footwear')}</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>{t('footer.services.title')}</h4>
                    <ul>
                        <li><Link to="#">{t('footer.services.shipping')}</Link></li>
                        <li><Link to="#">{t('footer.services.returns')}</Link></li>
                        {/* etc */}
                        <li><Link to="#">{t('footer.services.support')}</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>{t('footer.company.title')}</h4>
                    <ul>
                        <li><Link to="/about">{t('footer.company.story')}</Link></li>
                        {/* etc */}
                        <li><Link to="/contact">{t('footer.company.careers')}</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>{t('footer.newsletter.title')}</h4>
                    <p>{t('footer.newsletter.copy')}</p>
                    <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder={t('footer.newsletter.placeholder')} required />
                        <button type="submit">{t('footer.newsletter.cta')}</button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <div className="footer-links">
                        <Link to="#">{t('footer.legal.terms')}</Link>
                        <Link to="#">{t('footer.legal.privacy')}</Link>
                        {/* ... */}
                    </div>
                    <div className="footer-copyright">
                        <p>&copy; 2025 LACOSTE X MIKI. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
