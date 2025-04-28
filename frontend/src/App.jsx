import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Home } from "./pages/Home";
import { Listing } from "./pages/Listing";
import { Navbar } from "./fixed/Navbar";
import { SearchFilter } from "./pages/SearchFilter";
import { Footer } from "./fixed/Footer";
import CarDetailsForm from "./louer-publication-crud/addcar";
import CarManagement from "./louer-publication-crud/deleteAndModify/app";
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { ListerUsers } from './pages/Admin/ListerUsers';
import { UserDetails } from './pages/Admin/UserDetails';
import { ListerVoitures } from './pages/Admin/ListerVoitures';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Dashboard from './pages/Loueur/Dashboard';
import AdminSidebar from './pages/Admin/AdminSidebar';
import './App.css';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!user || user.role !== 'administrateur') {
        return <Navigate to="/" />;
    }
    
    return children;
};

const LoueurRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!user || user.role !== 'loueur') {
        return <Navigate to="/" />;
    }
    
    return children;
};

const ClientRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!user || user.role !== 'client') {
        return <Navigate to="/" />;
    }
    
    return children;
};

const AdminLayout = ({ children }) => {
    return (
        <div className="dashboard-layout">
            <AdminSidebar />
            <div className="dashboard-content">
                {children}
            </div>
        </div>
    );
};

const LoueurLayout = ({ children }) => {
    return (
        <div className="dashboard-layout">
            <div className="dashboard-content">
                {children}
            </div>
        </div>
    );
};

const ClientLayout = ({ children }) => {
    return (
        <div className="dashboard-layout">
            <div className="dashboard-content">
                {children}
            </div>
        </div>
    );
};

const App = () => {
    return (
        <React.StrictMode>
            <AuthProvider>
                <Router>
                    <div className="app-container">
                        <Navbar />
                        <main className="main-content">
                            <Routes>
                                {/* Public routes */}
                                <Route path="/" element={<Home />} />
                                <Route path="/listing" element={<Listing />} />
                                <Route path="/search" element={<SearchFilter />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />

                                {/* Loueur routes */}
                                <Route path="/loueur" element={
                                    <PrivateRoute>
                                        <LoueurRoute>
                                            <LoueurLayout>
                                                <Routes>
                                                    <Route path="dashboard" element={<Dashboard />} />
                                                    <Route path="add-car" element={<CarDetailsForm />} />
                                                    <Route path="manage-cars" element={<CarManagement />} />
                                                    <Route index element={<Navigate to="dashboard" />} />
                                                </Routes>
                                            </LoueurLayout>
                                        </LoueurRoute>
                                    </PrivateRoute>
                                } />

                                {/* Client routes */}
                                <Route path="/client" element={
                                    <PrivateRoute>
                                        <ClientRoute>
                                            <ClientLayout>
                                                <Routes>
                                                    <Route path="dashboard" element={<Listing />} />
                                                    <Route path="reservations" element={<Listing />} />
                                                    <Route index element={<Navigate to="dashboard" />} />
                                                </Routes>
                                            </ClientLayout>
                                        </ClientRoute>
                                    </PrivateRoute>
                                } />

                                {/* Admin routes */}
                                <Route path="/admin/*" element={
                                    <PrivateRoute>
                                        <AdminRoute>
                                            <AdminLayout>
                                                <Routes>
                                                    <Route path="dashboard" element={<AdminDashboard />} />
                                                    <Route path="dashboard/users" element={<ListerUsers />} />
                                                    <Route path="dashboard/voitures" element={<ListerVoitures />} />
                                                    <Route path="users/:id" element={<UserDetails />} />
                                                    <Route index element={<Navigate to="dashboard" />} />
                                                </Routes>
                                            </AdminLayout>
                                        </AdminRoute>
                                    </PrivateRoute>
                                } />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </AuthProvider>
        </React.StrictMode>
    );
};

export default App; 