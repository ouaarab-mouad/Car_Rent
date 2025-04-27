import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../utils/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize auth state from localStorage
    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Set the token in axios headers
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    
                    const response = await axios.get('/api/user');
                    if (response.data && typeof response.data === 'object' && !response.data.message) {
                        setUser(response.data);
                    } else {
                        throw new Error('Invalid user data');
                    }
                } catch (error) {
                    console.error('Auth initialization failed:', error);
                    // Only clear token if it's an authentication error
                    if (error.response?.status === 401) {
                        localStorage.removeItem('token');
                        delete axios.defaults.headers.common['Authorization'];
                        setUser(null);
                    }
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (email, password) => {
        try {
            console.log('Attempting login with:', { email });
            const response = await axios.post('/api/login', {
                email,
                password
            });
            
            console.log('Login response:', response.data);
            
            if (response.data.token && response.data.user) {
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
                return { success: true, user: response.data.user };
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Login error:', error);
            console.error('Error response:', error.response);
            return { 
                success: false, 
                error: error.response?.data?.message || 'Login failed' 
            };
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post('/api/register', userData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if (response.data?.token && response.data?.user) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setUser(response.data.user);
                setError(null);
                return true;
            }
            throw new Error('Invalid registration response');
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
            return false;
        }
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post('/api/logout');
            }
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            setUser(null);
        }
    };

    // Add a function to update user data
    const updateUser = (newUserData) => {
        setUser(prevUser => ({
            ...prevUser,
            ...newUserData
        }));
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            login,
            register,
            logout,
            updateUser
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 