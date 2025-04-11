// src/services/AuthService.js
import api from './api';

export default {
  register: (data) => api.post('/register', data),
  verifyEmail: (token) => api.get(`/email/verify/${token}`),
  verifyPhone: (code) => api.post('/verify-phone', { code }),
  resendVerification: (type) => api.post('/verification/resend', { type }),
};