import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';

const CourseCard = ({ title, tests }) => (
  <Paper elevation={2} sx={{ p: 2, minWidth: 350, flex: 1, m: 1 }}>
    <Typography variant="h6" fontWeight={600} mb={2}>{title}</Typography>
    {tests.map((test, idx) => (
      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 2, background: '#fff' }}>
        <Box>
          <Typography fontWeight={500}>{test.name}</Typography>
          <Typography variant="body2" color="textSecondary">Duration: {test.duration} • {test.questions} Questions</Typography>
        </Box>
        <Button variant="contained" color="primary">Start Test</Button>
      </Box>
    ))}
  </Paper>
);

export default CourseCard;