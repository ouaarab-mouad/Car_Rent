import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

export const Register = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        role: 'client',
        EnterpriseName: '',
        licence: null
    });
    const { register, error } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        
        // Append basic user information
        formDataToSend.append('nom', formData.nom);
        formDataToSend.append('prenom', formData.prenom);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('password_confirmation', formData.password_confirmation);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('role', formData.role);

        // Only append EnterpriseName and licence if role is loueur
        if (formData.role === 'loueur') {
            formDataToSend.append('EnterpriseName', formData.EnterpriseName);
            if (formData.licence) {
                formDataToSend.append('licence', formData.licence);
            }
        }

        const success = await register(formDataToSend);
        if (success) {
            if (formData.role === 'loueur') {
                alert('Registration successful! Your loueur status is pending admin approval. You will be notified once approved.');
            }
            navigate('/client/dashboard');
        }
    };

    return (
        <div className="auth-container register-page">
            <div className="auth-box"  >
                <h2>Register</h2>
                {error && <div className="error-message" >{error}</div>}
                <form onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="client">Client</option>
                            <option value="loueur">Loueur</option>
                        </select>
                    </div>
                    {formData.role === 'loueur' && (
                        <div className="role-specific-fields">
                            <div className="form-group">
                                <label>Enterprise Name</label>
                                <input
                                    type="text"
                                    name="EnterpriseName"
                                    value={formData.EnterpriseName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your enterprise name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Licence Document</label>
                                <input
                                    type="file"
                                    name="licence"
                                    onChange={handleChange}
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    required
                                />
                                <small className="form-text">
                                    Please upload your business licence or authorization document
                                </small>
                            </div>
                        </div>
                    )}
                    <button type="submit" className="auth-button">Register</button>
                </form>
                <p className="auth-link">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
}; 