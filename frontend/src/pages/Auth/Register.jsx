import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const villesMaroc = [
    'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda', 'Kenitra', 'Tétouan', 'Safi', 'El Jadida', 'Béni Mellal', 'Nador', 'Taza', 'Khouribga', 'Settat', 'Larache', 'Ksar El Kebir', 'Guelmim', 'Berrechid', 'Ouarzazate', 'Al Hoceima', 'Errachidia', 'Khemisset', 'Khénifra', 'Mohammedia', 'Salé', 'Essaouira', 'Azrou', 'Ifrane', 'Taroudant', 'Taourirt', 'Sidi Slimane', 'Sidi Kacem', 'Sidi Bennour', 'Sefrou', 'Youssoufia', 'Midelt', 'Oued Zem', 'El Hajeb', 'Boujdour', 'Boulemane', 'Jerada', 'Tan-Tan', 'Dakhla', 'Laâyoune', 'Smara', 'Zagora', 'Tiznit', 'Chefchaouen'
];

export const Register = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        ville: '',
        role: 'client',
        EnterpriseName: '',
        licence: null
    });
    const { register, error, user, loading } = useAuth();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        ville: '',
        role: '',
        EnterpriseName: '',
        licence: '',
        general: ''
    });

    // Redirect if user is already authenticated
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

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="auth-container">
                <div className="auth-box">
                    <div className="loading-container">
                        <div className="loader"></div>
                        <p>Chargement...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Don't render the form if user is authenticated
    if (user) {
        return null;
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
        // Clear error for this field when user starts typing
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({
            nom: '',
            prenom: '',
            email: '',
            password: '',
            password_confirmation: '',
            phone: '',
            ville: '',
            role: '',
            EnterpriseName: '',
            licence: '',
            general: ''
        });

        const formDataToSend = new FormData();
        
        // Append basic user information
        formDataToSend.append('nom', formData.nom);
        formDataToSend.append('prenom', formData.prenom);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('password_confirmation', formData.password_confirmation);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('ville', formData.ville);
        formDataToSend.append('role', formData.role);

        // Only append EnterpriseName and licence if role is loueur
        if (formData.role === 'loueur') {
            formDataToSend.append('EnterpriseName', formData.EnterpriseName);
            if (formData.licence) {
                formDataToSend.append('licence', formData.licence);
            }
        }

        const result = await register(formDataToSend);
        console.log('Registration result:', result);

        if (result.success) {
            if (formData.role === 'loueur') {
                alert('Registration successful! Your loueur status is pending admin approval. You will be notified once approved.');
                navigate('/login');
            } else {
                // For regular clients, navigate to their dashboard
                navigate('/client/dashboard');
            }
        } else {
            if (result.error) {
                if (typeof result.error === 'object') {
                    setErrors(result.error);
                } else {
                    setErrors({
                        general: result.error
                    });
                }
            }
        }
    };

    return (
        <div className="auth-container register-page">
            <div className="auth-box-auth">
                <h2>Inscription</h2>
                {errors.general && (
                    <div className="error-message-auth" role="alert">
                        {errors.general}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="prenom">Prénom</label>
                        <input
                            id="prenom"
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            required
                            placeholder="Entrez votre prénom"
                            className={errors.prenom ? 'error' : ''}
                        />
                        {errors.prenom && <span className="error-text">{errors.prenom}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="nom">Nom</label>
                        <input
                            id="nom"
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            required
                            placeholder="Entrez votre nom"
                            className={errors.nom ? 'error' : ''}
                        />
                        {errors.nom && <span className="error-text">{errors.nom}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Entrez votre adresse email"
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Téléphone</label>
                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="Entrez votre numéro de téléphone (ex: 0612345678)"
                            className={errors.phone ? 'error' : ''}
                        />
                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="ville">Ville</label>
                        <select
                            id="ville"
                            name="ville"
                            value={formData.ville}
                            onChange={handleChange}
                            required
                            className={`form-select ${errors.ville ? 'error' : ''}`}
                        >
                            <option value="">Sélectionnez votre ville</option>
                            {villesMaroc.map((ville) => (
                                <option key={ville} value={ville}>
                                    {ville}
                                </option>
                            ))}
                        </select>
                        {errors.ville && <span className="error-text">{errors.ville}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Entrez votre mot de passe (min. 8 caractères)"
                            className={errors.password ? 'error' : ''}
                        />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password_confirmation">Confirmer le mot de passe</label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            required
                            placeholder="Confirmez votre mot de passe"
                            className={errors.password_confirmation ? 'error' : ''}
                        />
                        {errors.password_confirmation && <span className="error-text">{errors.password_confirmation}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Type de compte</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className={errors.role ? 'error' : ''}
                        >
                            <option value="client">Client</option>
                            <option value="loueur">Loueur</option>
                        </select>
                        {errors.role && <span className="error-text">{errors.role}</span>}
                    </div>
                    {formData.role === 'loueur' && (
                        <div className="role-specific-fields">
                            <div className="form-group">
                                <label htmlFor="EnterpriseName">Nom de l'entreprise</label>
                                <input
                                    id="EnterpriseName"
                                    type="text"
                                    name="EnterpriseName"
                                    value={formData.EnterpriseName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Entrez le nom de votre entreprise"
                                    className={errors.EnterpriseName ? 'error' : ''}
                                />
                                {errors.EnterpriseName && <span className="error-text">{errors.EnterpriseName}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="licence">Document de licence</label>
                                <input
                                    id="licence"
                                    type="file"
                                    name="licence"
                                    onChange={handleChange}
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    required
                                    className={errors.licence ? 'error' : ''}
                                />
                                {errors.licence && <span className="error-text">{errors.licence}</span>}
                                <small className="form-text">
                                    Veuillez télécharger votre licence commerciale ou document d'autorisation (PDF, DOC, ou image)
                                </small>
                            </div>
                        </div>
                    )}
                    <button type="submit" className="auth-button">S'inscrire</button>
                </form>
                <p className="auth-link">
                    Vous avez déjà un compte ? <a href="/login">Se connecter</a>
                </p>
            </div>
        </div>
    );
}; 