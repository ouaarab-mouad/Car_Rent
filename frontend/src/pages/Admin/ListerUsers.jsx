import React, { useEffect, useState } from 'react'
import axios from "axios"
import './ListeUsers.css'
import ClipLoader from "react-spinners/ClipLoader";

export const ListerUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(err => {
                setMessage({
                    type: 'error',
                    text: 'Failed to load users'
                });
                setLoading(false);
            });
    }, []);

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            const res = await axios.put(`http://localhost:8000/api/user/${userId}/role`, {
                role: newRole
            });
            
            setUsers(prevUsers => 
                prevUsers.map(user => 
                    user.id === userId ? { ...user, role: newRole } : user
                )
            );
            
            
            setMessage({
                type: 'success',
                text: 'Role updated successfully'
            });
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to update role'
            });
        }
    };

    const deleteUser = async (id) => {
        try {
          const res = await axios.delete(`http://localhost:8000/api/user/${id}`);
          setMessage({
            type: 'success',
            text: res.data.message
          });
          setUsers(prev => prev.filter(p => p.id !== id));
          setShowDeleteModal(false);
          setUserToDelete(null);
        } catch (error) {
          setMessage({
            type: 'error',
            text: error.response?.data?.message || 'Something went wrong'
          });
          setShowDeleteModal(false);
          setUserToDelete(null);
        }
    };

    // Message component
    const MessageAlert = ({ type, text }) => {
        if (!text) return null;
        
        return (
            <div className={`message-alert ${type}`}>
                <div className="message-icon">
                    {type === 'success' ? (
                        <i className="fas fa-check-circle"></i>
                    ) : (
                        <i className="fas fa-exclamation-circle"></i>
                    )}
                </div>
                <div className="message-content">
                    <p>{text}</p>
                </div>
                <button 
                    className="message-close"
                    onClick={() => setMessage({ type: '', text: '' })}
                >
                    <i className="fas fa-times"></i>
                </button>
            </div>
        );
    };

    // Delete Confirmation Modal
    const DeleteConfirmationModal = () => {
        if (!showDeleteModal) return null;

        return (
            <div className="modal-overlay">
                <div className="delete-modal">
                    <h3>Confirm Delete</h3>
                    <p>Are you sure you want to delete {userToDelete?.nom} {userToDelete?.prenom}?</p>
                    <div className="modal-buttons">
                        <button 
                            className="modal-btn cancel-btn"
                            onClick={() => {
                                setShowDeleteModal(false);
                                setUserToDelete(null);
                            }}
                        >
                            Cancel
                        </button>
                        <button 
                            className="modal-btn confirm-btn"
                            onClick={() => deleteUser(userToDelete.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) return (
        <div className="loader-container">
            <ClipLoader
                color="#6342ff"
                loading={loading}
                size={50}
                aria-label="Loading Spinner"
            />
        </div>
    );

    return (
        <div className="user-table-container">
            {message.text && (
                <MessageAlert type={message.type} text={message.text} />
            )}
            <DeleteConfirmationModal />
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
                            <td>{user.EnterpriseName ? user.EnterpriseName : 'Aucune entreprise' }</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <select
                                    className={`role-select ${user.role}`}
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                >
                                    <option value="client">Client</option>
                                    <option value="loueur">Loueur</option>
                                </select>
                            </td>
                            <td>
                                <button className="action-btn edit-btn">
                                    <i className="fas fa-edit">Edit</i>
                                </button>
                                <button 
                                    className="action-btn delete-btn" 
                                    onClick={() => handleDeleteClick(user)}
                                >
                                    <i className="fas fa-trash">Delete</i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}