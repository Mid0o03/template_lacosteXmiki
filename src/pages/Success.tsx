
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useEffect } from 'react';

const Success: React.FC = () => {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="page-container" style={{ paddingTop: '150px', minHeight: '80vh', textAlign: 'center' }}>
            <div className="container">
                <div style={{ background: 'var(--surface)', padding: '60px', borderRadius: '12px', maxWidth: '600px', margin: '0 auto' }}>
                    <h1 style={{ color: '#4cc9f0', marginBottom: '20px' }}>Payment Successful!</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '40px' }}>
                        Thank you for your purchase. Your order has been confirmed.
                    </p>
                    <Link to="/profile" className="cta-button">View Order History</Link>
                </div>
            </div>
        </div>
    );
};

export default Success;
