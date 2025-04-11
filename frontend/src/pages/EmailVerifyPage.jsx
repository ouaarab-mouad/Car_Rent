// src/pages/EmailVerifyPage.js
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Alert, CircularProgress, Box } from '@mui/material';

export default function EmailVerifyPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await api.get(`/email/verify/${token}`);
        setTimeout(() => navigate('/verify-phone'), 3000); // Redirect after 3 sec
      } catch (error) {
        console.error('Verification failed', error);
      }
    };
    verifyEmail();
  }, [token, navigate]);

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <CircularProgress />
      <Alert severity="info" sx={{ mt: 2 }}>
        Verifying your email address...
      </Alert>
    </Box>
  );
}