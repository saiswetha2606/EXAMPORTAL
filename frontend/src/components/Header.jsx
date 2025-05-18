import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box } from '@mui/material';

const Header = ({ userName = 'John Doe' }) => (
  <AppBar position="static" color="default" elevation={1} sx={{ background: '#fff', borderBottom: '1px solid #e0e0e0' }}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h6" fontWeight={700} color="primary">Online Examination Portal</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" color="textSecondary">{userName}</Typography>
        <Avatar>{userName[0]}</Avatar>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
