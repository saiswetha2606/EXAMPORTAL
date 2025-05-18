import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import { ThemeProvider, createTheme } from '@mui/material';

// Create a custom MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Protected Route component to restrict access based on authentication and roles
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve user details from localStorage
  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  // If no token or user exists, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  // If roles are specified, verify that the user has the correct role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  // Render children if authenticated and authorized
  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

