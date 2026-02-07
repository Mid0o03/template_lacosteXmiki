
import * as React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Profile: React.FC = () => {
    const { user, signOut, session } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!session) {
            navigate('/login');
        }
    }, [session, navigate]);

    if (!user) return null;

    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <div className="page-container" style={{ paddingTop: '150px', minHeight: '80vh' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
                    <h1 className="section-title" style={{ margin: 0, textAlign: 'left' }}>My Account</h1>
                    <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
                        Sign Out
                    </button>
                </div>

                <div className="profile-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
                    <div className="profile-card" style={{ background: 'var(--surface)', padding: '30px', borderRadius: '12px', height: 'fit-content' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: '#000', marginBottom: '20px' }}>
                            {user.email?.charAt(0).toUpperCase()}
                        </div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{user.email}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Member since {new Date(user.created_at).toLocaleDateString()}</p>
                    </div>

                    <div className="orders-section">
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Order History</h2>
                        <div style={{ background: 'var(--surface)', padding: '40px', borderRadius: '12px', textAlign: 'center', color: 'var(--text-muted)' }}>
                            <p>No orders yet.</p>
                            <button className="cta-button" style={{ marginTop: '20px', fontSize: '0.9rem', padding: '10px 25px' }} onClick={() => navigate('/collection')}>
                                Start Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
