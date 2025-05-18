import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Sidebar = ({ selected, onSelect }) => (
  <Box sx={{ width: 200, height: '100vh', background: '#fafbfc', borderRight: '1px solid #e0e0e0', pt: 2 }}>
    <List>
      <ListItem button selected={selected === 'courses'} onClick={() => onSelect('courses')}>
        <ListItemIcon><MenuBookIcon /></ListItemIcon>
        <ListItemText primary="My Courses" />
      </ListItem>
      <ListItem button selected={selected === 'results'} onClick={() => onSelect('results')}>
        <ListItemIcon><AccessTimeIcon /></ListItemIcon>
        <ListItemText primary="Results" />
      </ListItem>
    </List>
  </Box>
);

export default Sidebar;