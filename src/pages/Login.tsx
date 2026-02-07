
import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
// import { useI18n } from '../contexts/I18nContext';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    // const { t } = useI18n(); // Assuming we might want to translate this later, but for now hardcode or add keys

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            navigate('/profile');
        }
    };

    return (
        <div className="page-container" style={{ paddingTop: '150px', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container" style={{ width: '100%', maxWidth: '400px' }}>
                <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Login</h1>
                <div style={{ background: 'var(--surface)', padding: '40px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {error && <div style={{ color: '#ff6b6b', background: 'rgba(255,107,107,0.1)', padding: '10px', borderRadius: '4px' }}>{error}</div>}
                        <div className="form-group">
                            <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: '8px' }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: '8px' }}
                            />
                        </div>
                        <button type="submit" className="cta-button" disabled={loading} style={{ width: '100%', marginTop: '10px' }}>
                            {loading ? 'Loading...' : 'Sign In'}
                        </button>
                    </form>
                    <div style={{ marginTop: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
