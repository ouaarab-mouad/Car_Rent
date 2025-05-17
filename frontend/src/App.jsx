import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Home } from "./pages/Home";
import { Listing } from "./pages/Listing";
import { Navbar } from "./fixed/Navbar";
import { Footer } from "./fixed/Footer";
import ModifyCar from "./louer-publication-crud/modify";
import CarManagement from "./louer-publication-crud/deleteAndModify/app";
import CarDetailsForm from "./louer-publication-crud/addcar";
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { ListeUsers } from './pages/Admin/ListeUsers';
import { UserDetails } from './pages/Admin/UserDetails';
import { ListeVoitures } from './pages/Admin/ListeVoitures';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Dashboard from './pages/Loueur/Dashboard';
import AdminSidebar from './pages/Admin/AdminSidebar';
import './App.css';
import { DetailsVoiture } from './pages/Admin/DetailsVoiture';
import { EditVoiture } from './pages/Admin/EditVoiture';
import Profile from './pages/Profile';
import LoueurProfile from './pages/Loueur/LoueurProfile';
import PublicProfile from './pages/PublicProfile';
import DetailCar from './pages/DetailCar';
import Reservation from './pages/Reservation';
import About from './pages/About';
import LoueurPublicProfile from './pages/LoueurPublicProfile';
import ClientDashboard from './pages/ClientDashboard';
import ClientRoutes from './pages/ClientRoutes';
import axios from 'axios';
import Reservations from './pages/Loueur/Reservations';
import LoueurStatistics from './pages/Loueur/Statistics';
import { ContactUs } from './pages/ContactUs';

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
                                <Route path="/loueur/public/:id" element={<LoueurPublicProfile />} />
                                <Route path="/" element={<Home />} />
                                <Route path="/listing" element={<Listing />} />
                                <Route path='/About' element={<About/>} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/contact" element={<ContactUs/>} />
                                <Route path="/profile" element={
                                  <PrivateRoute>
                                    <ProfileSwitcher />
                                  </PrivateRoute>
                                } />
                                <Route path="/profile/:id" element={
                                  <PrivateRoute>
                                    <PublicProfile />
                                  </PrivateRoute>
                                } />

                                {/* Loueur routes */}
                                <Route path="/loueur/*" element={
                                    <PrivateRoute>
                                        <LoueurRoute>
                                            <LoueurLayout>
                                                <Routes>
                                                    <Route path="dashboard" element={<Dashboard />} />
                                                    <Route path="addcar" element={<CarDetailsForm />} />
                                                    <Route path="modify/:id" element={<ModifyCar />} />
                                                    <Route path="manage-cars" element={<CarManagement />} />
                                                    <Route path="reservations" element={<Reservations />} />
                                                    <Route path="statistics" element={<LoueurStatistics />} />
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
                                            <ClientRoutes />
                                        </ClientRoute>
                                    </PrivateRoute>
                                }>
                                    <Route path="dashboard" element={<ClientDashboard />} />
                                    <Route path="reservations" element={<Listing />} />
                                    <Route index element={<Navigate to="dashboard" />} />
                                </Route>

                                {/* Admin routes */}
                                <Route path="/admin/*" element={
                                    <PrivateRoute>
                                        <AdminRoute>
                                            <AdminLayout>
                                                <Routes>
                                                    <Route path="dashboard" element={<AdminDashboard />} />
                                                    <Route path="dashboard/users" element={<ListeUsers />} />
                                                    <Route path="dashboard/voitures" element={<ListeVoitures />} />
                                                    <Route path="dashboard/voitures/:id" element={<DetailsVoiture />} />
                                                    <Route path="dashboard/voitures/:id/edit" element={<EditVoiture />} />
                                                    <Route path="users/:id" element={<UserDetails />} />
                                                    <Route index element={<Navigate to="dashboard" />} />
                                                </Routes>
                                            </AdminLayout>
                                        </AdminRoute>
                                    </PrivateRoute>
                                } />

                                <Route path="/cars/:id" element={<DetailCar />} />
                                <Route path="/reservation/:carId" element={<Reservation />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </AuthProvider>
        </React.StrictMode>
    );
};

const ProfileSwitcher = () => {
  const { user } = useAuth();
  if (!user) return null;
  if (user.role === 'loueur') return <LoueurProfile />;
  return <Profile />;
};

export default App; 