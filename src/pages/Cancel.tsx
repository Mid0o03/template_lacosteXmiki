
import * as React from 'react';
import { Link } from 'react-router-dom';

const Cancel: React.FC = () => {
    return (
        <div className="page-container" style={{ paddingTop: '150px', minHeight: '80vh', textAlign: 'center' }}>
            <div className="container">
                <div style={{ background: 'var(--surface)', padding: '60px', borderRadius: '12px', maxWidth: '600px', margin: '0 auto' }}>
                    <h1 style={{ color: '#ff6b6b', marginBottom: '20px' }}>Payment Cancelled</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '40px' }}>
                        Your payment was cancelled. No charges were made.
                    </p>
                    <Link to="/cart" className="cta-button">Return to Cart</Link>
                </div>
            </div>
        </div>
    );
};

export default Cancel;
