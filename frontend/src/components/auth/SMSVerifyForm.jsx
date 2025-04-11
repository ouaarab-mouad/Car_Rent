// src/components/auth/SMSVerifyForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography } from '@mui/material';
import api from '../../services/api';

export default function SMSVerifyForm() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/verify-phone', { code });
      navigate('/dashboard'); // Redirect after successful verification
    } catch (err) {
      setError('Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6">Verify Your Phone Number</Typography>
      <TextField
        label="6-digit Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        fullWidth
        margin="normal"
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button 
        type="submit" 
        variant="contained" 
        disabled={isLoading}
      >
        {isLoading ? 'Verifying...' : 'Verify'}
      </Button>
    </Box>
  );
}