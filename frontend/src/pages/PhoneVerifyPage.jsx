// src/pages/PhoneVerifyPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import api from '../services/api';

export default function PhoneVerifyPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/verify-phone', { code });
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Verify Your Phone
      </Typography>
      <Typography sx={{ mb: 2 }}>
        We've sent a 6-digit code to your phone number
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 6 }}
        />
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify Phone'}
        </Button>
      </Box>
    </Box>
  );
}