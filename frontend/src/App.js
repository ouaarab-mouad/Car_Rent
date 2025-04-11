// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import EmailVerifyPage from './pages/EmailVerifyPage'; // Add this
import PhoneVerifyPage from './pages/PhoneVerifyPage'; // Add this
import CheckEmailPage from './pages/CheckEmailPage'; // Add this

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Verification Routes */}
        <Route path="/email/verify/:token" element={<EmailVerifyPage />} />
        <Route path="/verify-phone" element={<PhoneVerifyPage />} />
        <Route path="/check-email" element={<CheckEmailPage />} />
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App; 