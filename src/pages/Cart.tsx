
import * as React from 'react';
import { useCart } from '../contexts/CartContext';
import { useI18n } from '../contexts/I18nContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabase';

const Cart: React.FC = () => {
    const { items, removeFromCart, updateQuantity, cartTotal } = useCart();
    const { t } = useI18n();
    const { user } = useAuth();
    const [loading, setLoading] = React.useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.functions.invoke('create-checkout-session', {
                body: {
                    items: items.map(item => ({
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image // Ensure this full URL or handle in backend
                    })),
                    email: user?.email
                }
            });

            if (error) throw error;
            if (data?.url) {
                window.location.href = data.url;
            }
        } catch (err: any) {
            console.error('Payment error:', err);
            alert('Error starting checkout: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="page-container cart-page empty" style={{ paddingTop: '150px', minHeight: '80vh', textAlign: 'center' }}>
                <div className="container">
                    <h1 className="section-title">{t('nav.cart')}</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Your cart is empty.</p>
                    <Link to="/collection" className="cta-button">{t('collection.title')}</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container cart-page" style={{ paddingTop: '150px', minHeight: '80vh' }}>
            <div className="container">
                <h1 className="section-title">{t('nav.cart')}</h1>
                <div className="cart-content" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                    <div className="cart-items">
                        {items.map(item => (
                            <div key={item.cartId} className="cart-item" style={{ display: 'flex', gap: '20px', marginBottom: '20px', background: 'var(--surface)', padding: '20px', borderRadius: '12px', alignItems: 'center' }}>
                                <img src={item.image} alt={item.name} className="cart-item-image" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                                <div className="cart-item-details" style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{item.name}</h3>
                                    <p className="price" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>€{item.price}</p>
                                    <p className="size" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('label.size')}: {item.size}</p>
                                    <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                        <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-main)', width: '25px', height: '25px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-main)', width: '25px', height: '25px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                                    </div>
                                </div>
                                <button className="remove-btn" onClick={() => removeFromCart(item.cartId)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer', alignSelf: 'flex-start' }}>×</button>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary" style={{ background: 'var(--surface)', padding: '30px', borderRadius: '12px', height: 'fit-content' }}>
                        <div className="total" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                            <span>Total:</span>
                            <span>€{cartTotal.toFixed(2)}</span>
                        </div>
                        <button
                            className="cta-button"
                            style={{ width: '100%', textAlign: 'center', opacity: loading ? 0.7 : 1 }}
                            onClick={handleCheckout}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Checkout'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
