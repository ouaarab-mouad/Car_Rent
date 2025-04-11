// src/pages/CheckEmailPage.js
import { Button, Box, Typography, Alert } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CheckEmailPage() {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, textAlign: 'center' }}>
      <Alert severity="success" sx={{ mb: 3 }}>
        Registration successful!
      </Alert>
      <Typography variant="h5" gutterBottom>
        Verify Your Email
      </Typography>
      <Typography sx={{ mb: 3 }}>
        We've sent a verification link to your email address. 
        Please check your inbox and click the link to verify your account.
      </Typography>
      <Typography sx={{ mb: 3 }}>
        Didn't receive the email? <Link to="#">Resend verification email</Link>
      </Typography>
      <Button component={Link} to="/" variant="outlined">
        Back to Home
      </Button>
    </Box>
  );
}