import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Alert } from '@mui/material';
import api from '../../services/api';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/register', formData);
      navigate('/check-email');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Full Name"
        fullWidth
        margin="normal"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      <TextField
        label="Phone Number"
        fullWidth
        margin="normal"
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
      />
      <TextField
        label="Password"
        fullWidth
        margin="normal"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
      />
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? 'Registering...' : 'Register'}
      </Button>
    </Box>
  );
}