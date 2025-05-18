import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Alert } from '@mui/material';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    collegeName: '',
    collegeIdNumber: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [collegeIdCard, setCollegeIdCard] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    const maxSize = name === 'profilePicture' ? 250 * 1024 : 500 * 1024; // 250KB or 500KB

    if (file && file.size > maxSize) {
      setError(`File size for ${name === 'profilePicture' ? 'Profile Picture' : 'College ID Card'} exceeds the maximum limit of ${maxSize / 1024}KB.`);
      if (name === 'profilePicture') {
        setProfilePicture(null);
      } else {
        setCollegeIdCard(null);
      }
      return;
    }

    if (name === 'profilePicture') {
      setProfilePicture(file);
    } else {
      setCollegeIdCard(file);
    }
    setError(''); // Clear error if file is valid
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword || !form.phoneNumber || !form.collegeName || !form.collegeIdNumber || !profilePicture || !collegeIdCard) {
      setError('All fields including file uploads are required');
      return false;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Invalid email format');
      return false;
    }

    // Basic phone number validation (optional, could be more complex)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(form.phoneNumber)) {
      setError('Invalid phone number format (10 digits required)');
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

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('password', form.password);
    formData.append('phoneNumber', form.phoneNumber);
    formData.append('collegeName', form.collegeName);
    formData.append('collegeIdNumber', form.collegeIdNumber);
    formData.append('profilePicture', profilePicture);
    formData.append('collegeIdCard', collegeIdCard);

    try {
      // Removed confirmPassword as it's not needed in the backend payload
      const res = await axios.post('http://localhost:5000/api/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Assuming backend handles password generation and email sending
      // And the backend response indicates success

      // Redirect to login page after successful registration
      navigate('/login');
      // Optionally show a success message before redirecting
      alert('Registration successful! Please check your email for your password and login.');

    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f6f8' }}>
      <Paper elevation={3} sx={{ p: 4, width: 400, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={700} mb={1}>Create Account</Typography>
        <Typography variant="body2" mb={3}>Sign up to get started</Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField 
            label="Full Name" 
            name="name" 
            fullWidth 
            margin="normal" 
            value={form.name}
            onChange={handleChange} 
            required 
            error={!!error && !form.name}
          />
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
            label="Phone Number" 
            name="phoneNumber" 
            fullWidth 
            margin="normal" 
            value={form.phoneNumber}
            onChange={handleChange} 
            required 
            error={!!error && !form.phoneNumber}
          />
          <TextField 
            label="College Name" 
            name="collegeName" 
            fullWidth 
            margin="normal" 
            value={form.collegeName}
            onChange={handleChange} 
            required 
            error={!!error && !form.collegeName}
          />
          <TextField 
            label="College ID Number" 
            name="collegeIdNumber" 
            fullWidth 
            margin="normal" 
            value={form.collegeIdNumber}
            onChange={handleChange} 
            required 
            error={!!error && !form.collegeIdNumber}
          />
          <TextField 
            label="Password" 
            name="password" 
            type="password" 
            fullWidth 
            margin="normal" 
            value={form.password}
            onChange={handleChange} 
            required 
            error={!!error && !form.password}
          />
          <TextField 
            label="Confirm Password" 
            name="confirmPassword" 
            type="password" 
            fullWidth 
            margin="normal" 
            value={form.confirmPassword}
            onChange={handleChange} 
            required 
            error={!!error && !form.confirmPassword}
          />
          <Box sx={{ textAlign: 'left', mt: 2 }}>
            <Typography variant="body2" gutterBottom>Upload Profile Picture (50KB - 250KB)</Typography>
            <input
              type="file"
              accept="image/*"
              name="profilePicture"
              onChange={handleFileChange}
              required
            />
            {error && !profilePicture && error.includes('Profile Picture') && (
              <Typography variant="caption" color="error">{error}</Typography>
            )}
          </Box>
          <Box sx={{ textAlign: 'left', mt: 2 }}>
            <Typography variant="body2" gutterBottom>Upload College ID Card (100KB - 500KB)</Typography>
            <input
              type="file"
              accept="image/*"
              name="collegeIdCard"
              onChange={handleFileChange}
              required
            />
            {error && !collegeIdCard && error.includes('College ID Card') && (
              <Typography variant="caption" color="error">{error}</Typography>
            )}
          </Box>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 3, mb: 1 }}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        
        <Typography variant="body2">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
