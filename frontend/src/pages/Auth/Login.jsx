import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setError] = useState(null);

    useEffect(() => {
        if (user) {
            // Redirect based on role
            switch(user.role) {
                case 'loueur':
                    navigate('/loueur/dashboard');
                    break;
                case 'client':
                    navigate('/client/dashboard');
                    break;
                case 'administrateur':
                case 'admin':
                    navigate('/admin/dashboard');
                    break;
                default:
                    navigate('/');
            }
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const result = await login(email, password);
        
        if (result.success) {
            const userRole = result.user.role;
            console.log('Login successful, user role:', userRole);
            
            // Redirect based on role
            switch(userRole) {
                case 'loueur':
                    navigate('/loueur/dashboard');
                    break;
                case 'client':
                    navigate('/client/dashboard');
                    break;
                case 'administrateur':
                case 'admin':
                    navigate('/admin/dashboard');
                    break;
                default:
                    navigate('/');
            }
        } else {
            setError(result.error);
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box-auth" style={{maxWidth: '500px'}}>
                <h2>Connexion</h2>
                {errorMessage && <div className="error-message-auth">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Entrez votre adresse email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Entrez votre mot de passe"
                        />
                    </div>
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Connexion en cours...' : 'Se connecter'}
                    </button>
                </form>
                <p className="auth-link">
                    Vous n'avez pas de compte ? <a href="/register">S'inscrire</a>
                </p>
            </div>
        </div>
    );
}; 