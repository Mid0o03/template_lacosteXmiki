
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';
import { products } from '../config/products'; // Assuming we want to show some
import ProductCard from '../components/ProductCard';

import { content } from '../config/content';

const Home: React.FC = () => {
    const { language } = useI18n();
    const text = content[language];

    // Get first 4 products for showcase
    const featuredProducts = Object.values(products).slice(0, 4);

    return (
        <>
            <section className="hero-section">
                <div className="banner">
                    <div className="slider" style={{ "--quantity": 6 } as React.CSSProperties}>
                        <div className="item" style={{ "--position": 1 } as React.CSSProperties}><img src="/images/SLIDER/POLAROI-POLO.png" alt="Polo Riviera" /></div>
                        <div className="item" style={{ "--position": 2 } as React.CSSProperties}><img src="/images/SLIDER/POLAROID-JACKET.png" alt="Veste Croisée Lavande" /></div>
                        <div className="item" style={{ "--position": 3 } as React.CSSProperties}><img src="/images/SLIDER/POLAROID-SNEAKER.png" alt="Sneaker Nuage" /></div>
                        <div className="item" style={{ "--position": 4 } as React.CSSProperties}><img src="/images/SLIDER/POLAROID-CAP.png" alt="Casquette Monogramme" /></div>
                        <div className="item" style={{ "--position": 5 } as React.CSSProperties}><img src="/images/SLIDER/POLAROID-SKIRT.png" alt="Jupe Plissée Horizon" /></div>
                        <div className="item" style={{ "--position": 6 } as React.CSSProperties}><img src="/images/SLIDER/POLAROID-SOCKS.png" alt="Chaussettes Gradient" /></div>
                    </div>
                    <div className="content">
                        <h1 data-content={text.hero.title}>{text.hero.title}</h1>
                        {/* Cleaned up author block for professional look */}
                    </div>
                </div>
                <div className="hero-content">
                    <h1 className="hero-title" style={{ mixBlendMode: 'overlay', fontSize: '6rem', marginBottom: '10px' }}>{text.hero.title}</h1>
                    <p className="hero-subtitle">{text.hero.subtitle}</p>
                    <Link to="/collection" className="cta-button">
                        {text.hero.cta}
                    </Link>
                </div>
            </section>

            <section className="collection-section">
                <div className="container">
                    {/* Collection title might not be in content yet, using hardcoded fallback or t if it works */}
                    <h2 className="section-title">Collection</h2>
                    <div className="product-grid">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '60px' }}>
                        <Link to="/collection" className="cta-button">View All</Link>
                    </div>
                </div>
            </section>

            <section className="about-section">
                <div className="container">
                    <div className="about-content">
                        <h2 className="section-title">{text.about.title}</h2>
                        <p>{text.about.description}</p>
                        <p>{text.about.teaser}</p>
                        <Link to="/about" className="cta-button" style={{ marginTop: '20px' }}>Read Our Story</Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
