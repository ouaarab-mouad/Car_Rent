import React, { useEffect, useState } from 'react'
import axios from "axios"
import './ListeUsers.css'

export const ListerUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load users');
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loader">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="user-table-container">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Enterprise</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.nom}</td>
                            <td>{user.prenom}</td>
                            <td>{user.EnterpriseName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <span className={`user-role ${user.role}`}>
                                    {user.role}
                                </span>
                            </td>
                            <td>
                                <button className="action-btn edit-btn">
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className="action-btn delete-btn">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}