import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Alert, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    if (!form.email || !form.password) {
      setError('Email and password are required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Invalid email format');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);

      // Store token and user data in localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Set default authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

      // Redirect based on user role
      if (res.data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f6f8' }}>
      <Paper elevation={3} sx={{ p: 4, width: 400, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={700} mb={1}>Login</Typography>
        <Typography variant="body2" mb={3}>Enter your credentials to access the exam portal</Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
            required
            error={!!error && !form.email}
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
            error={!!error && !form.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 1 }}
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Login'}
          </Button>
        </form>

        <Typography variant="body2">
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
