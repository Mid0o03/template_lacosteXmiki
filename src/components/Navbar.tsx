
import * as React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active state
import { useI18n } from '../contexts/I18nContext';
import { useCart } from '../contexts/CartContext';
const logo = '/images/LOGO x MIKI CLASSIQUE blanc.png';

import { branding } from '../config/branding';

const Navbar: React.FC = () => {
    const { t, language, setLanguage } = useI18n();
    const { cartCount } = useCart();

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt={branding.siteName} />
            </div>
            <div className="nav-links">
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                    {t('nav.home')}
                </NavLink>
                <NavLink to="/collection" className={({ isActive }) => (isActive ? 'active' : '')}>
                    {t('nav.collection')}
                </NavLink>
                <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
                    {t('nav.about')}
                </NavLink>
                <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
                    {t('nav.contact')}
                </NavLink>
                <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : '')}>
                    <span className="nav-cart-label">{t('nav.cart')}</span>
                    <span id="cart-count">({cartCount})</span>
                </NavLink>
            </div>
            <div className="language-switcher">
                <button
                    className={`language-btn ${language === 'fr' ? 'active' : ''}`}
                    onClick={() => setLanguage('fr')}
                >
                    FR
                </button>
                <button
                    className={`language-btn ${language === 'en' ? 'active' : ''}`}
                    onClick={() => setLanguage('en')}
                >
                    EN
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
