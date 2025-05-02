import React, { useEffect, useState } from 'react'
import axios from "../../utils/axios"
import './ListeUsers.css'
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ListerUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    // Filter states
    const [filters, setFilters] = useState({
        nom: '',
        prenom: '',
        email: '',
        role: 'all',
        status: 'all'
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users');
                
                if (response.data.success) {
                    setUsers(response.data.data);
                    setFilteredUsers(response.data.data);
                } else {
                    throw new Error(response.data.message || 'Failed to load users');
                }
            } catch (error) {
                console.error('Error:', error);
                setMessage({
                    type: 'error',
                    text: error.response?.data?.message || error.message || 'Failed to load users. Please try again later.'
                });
                
                // Only redirect if it's a 403 error and user is not an admin
                if (error.response?.status === 403 && user?.role !== 'administrateur') {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [navigate, user]);

    // Filter users based on search criteria
    useEffect(() => {
        let filtered = [...users];
        
        if (filters.nom) {
            filtered = filtered.filter(user => 
                user.nom.toLowerCase().includes(filters.nom.toLowerCase())
            );
        }
        
        if (filters.prenom) {
            filtered = filtered.filter(user => 
                user.prenom.toLowerCase().includes(filters.prenom.toLowerCase())
            );
        }
        
        if (filters.email) {
            filtered = filtered.filter(user => 
                user.email.toLowerCase().includes(filters.email.toLowerCase())
            );
        }
        
        if (filters.role !== 'all') {
            filtered = filtered.filter(user => user.role === filters.role);
        }

        if (filters.status !== 'all') {
            filtered = filtered.filter(user => {
                if (filters.status === 'pending') {
                    return user.requested_role === 'loueur' && user.role_status === 'pending';
                } else if (filters.status === 'approved') {
                    return user.role_status === 'approved';
                }
                return true;
            });
        }
        
        setFilteredUsers(filtered);
    }, [filters, users]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const handleRoleChange = async (userId, newRole, currentRole, requestedRole) => {
        // If user has a pending loueur request, show confirmation
        if (requestedRole === 'loueur' && currentRole === 'client' && newRole === 'loueur') {
            if (!window.confirm('This user has requested to be a loueur. Do you want to approve their request?')) {
                return;
            }
        }

        try {
            const res = await axios.put(`/api/user/${userId}/role`, {
                role: newRole,
                role_status: newRole === 'loueur' ? 'approved' : 'pending'
            });
            
            if (res.data.success) {
                setUsers(prevUsers => 
                    prevUsers.map(user => 
                        user.id === userId ? { 
                            ...user, 
                            role: newRole,
                            role_status: newRole === 'loueur' ? 'approved' : 'pending'
                        } : user
                    )
                );
                
                setMessage({
                    type: 'success',
                    text: res.data.message || 'Role updated successfully'
                });
            } else {
                throw new Error(res.data.message || 'Failed to update role');
            }
        } catch (error) {
            console.error('Error updating role:', error);
            setMessage({
                type: 'error',
                text: error.response?.data?.message || error.message || 'Failed to update role'
            });
        }
    };

    const deleteUser = async (id) => {
        try {
            const res = await axios.delete(`api/user/${id}`);
            if (res.data.success) {
                setMessage({
                    type: 'success',
                    text: res.data.message || 'User deleted successfully'
                });
                setUsers(prev => prev.filter(p => p.id !== id));
            } else {
                throw new Error(res.data.message || 'Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to delete user. Please try again later.'
            });
        } finally {
            setShowDeleteModal(false);
            setUserToDelete(null);
        }
    };

    const handleDetailsClick = (userId) => {
        console.log('Navigating to user details for ID:', userId);
        if (!userId) {
            console.error('No user ID provided');
            setMessage({
                type: 'error',
                text: 'No user ID provided'
            });
            return;
        }
        navigate(`/admin/users/${userId}`, { replace: true });
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
            <p>Loading users...</p>
        </div>
    );

    return (
        <div className="user-table-container">
            {message.text && (
                <MessageAlert type={message.type} text={message.text} />
            )}
            <DeleteConfirmationModal />
            
            {/* Filter Section */}
            <div className="filter-section">
                <h3>
                    <i className="fas fa-filter"></i>
                    Filtres
                </h3>
                <div className="filter-group">
                    <div className="filter-item">
                        <label>Nom</label>
                        <input
                            type="text"
                            name="nom"
                            placeholder="Rechercher par nom"
                            value={filters.nom}
                            onChange={handleFilterChange}
                            className="filter-input"
                        />
                    </div>
                    <div className="filter-item">
                        <label>Prénom</label>
                        <input
                            type="text"
                            name="prenom"
                            placeholder="Rechercher par prénom"
                            value={filters.prenom}
                            onChange={handleFilterChange}
                            className="filter-input"
                        />
                    </div>
                    <div className="filter-item">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Rechercher par email"
                            value={filters.email}
                            onChange={handleFilterChange}
                            className="filter-input"
                        />
                    </div>
                    <div className="filter-item">
                        <label>Rôle</label>
                        <select
                            name="role"
                            value={filters.role}
                            onChange={handleFilterChange}
                            className="filter-select"
                        >
                            <option value="all">Tous les rôles</option>
                            <option value="client">Client</option>
                            <option value="loueur">Loueur</option>
                            <option value="administrateur">Administrateur</option>
                        </select>
                    </div>
                    {filters.role === 'client' || filters.role === 'all' && (
                        <div className="filter-item">
                            <label>Statut</label>
                            <select
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                                className="filter-select"
                            >
                                <option value="all">Tous les statuts</option>
                                <option value="pending">En attente</option>
                                <option value="approved">Approuvé</option>
                            </select>
                        </div>
                    )}
                </div>
                <div className="filter-results">
                    <i className="fas fa-users"></i>
                    {filteredUsers.length} utilisateur{filteredUsers.length !== 1 ? 's' : ''} trouvé{filteredUsers.length !== 1 ? 's' : ''}
                </div>
            </div>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Enterprise</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{user.nom}</td>
                            <td>{user.prenom}</td>
                            <td>{user.EnterpriseName ? user.EnterpriseName : 'Aucune entreprise'}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <select
                                    className={`role-select ${user.role} ${user.requested_role === 'loueur' && user.role_status === 'pending' ? 'has-pending' : ''}`}
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value, user.role, user.requested_role)}
                                >
                                    <option value="client">Client</option>
                                    <option value="loueur">Loueur</option>
                                    <option value="administrateur">Administrateur</option>
                                </select>
                            </td>
                            <td>
                                {user.role === 'client' && user.requested_role === 'loueur' ? (
                                    user.role_status === 'pending' ? (
                                        <span className="status-badge pending">
                                            <i className="fas fa-clock"></i> En attente
                                        </span>
                                    ) : user.role_status === 'approved' ? (
                                        <span className="status-badge approved">
                                            <i className="fas fa-check"></i> Approuvé
                                        </span>
                                    ) : null
                                ) : null}
                            </td>
                            <td>
                                <div className="action-buttons">
                                    <button 
                                        className="action-btn edit-btn"
                                        onClick={() => handleDetailsClick(user.id)}
                                    >
                                        <i className="fas fa-edit"></i> Details
                                    </button>
                                    <button 
                                        className="action-btn delete-btn" 
                                        onClick={() => handleDeleteClick(user)}
                                    >
                                        <i className="fas fa-trash"></i> Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}