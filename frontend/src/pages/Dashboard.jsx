import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CourseCard from '../components/CourseCard';

const courses = [
  {
    title: 'GATE - 2025',
    tests: [
      { name: 'Test - 1', duration: '3 hours', questions: 65 },
      { name: 'Test - 2', duration: '3 hours', questions: 65 },
    ],
  },
  {
    title: 'Advanced Data Structures',
    tests: [
      { name: 'Mid-term', duration: '1.5 hours', questions: 30 },
      { name: 'Final Exam', duration: '3 hours', questions: 60 },
    ],
  },
];

const Dashboard = () => {
  const [selected, setSelected] = useState('courses');

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f6f8' }}>
      <Header userName="John Doe" />
      <Box sx={{ display: 'flex' }}>
        <Sidebar selected={selected} onSelect={setSelected} />
        <Box sx={{ flex: 1, p: 4 }}>
          {selected === 'courses' && (
            <>
              <Typography variant="h5" fontWeight={700} mb={3}>My Courses</Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                {courses.map((course, idx) => (
                  <CourseCard key={idx} title={course.title} tests={course.tests} />
                ))}
              </Box>
            </>
          )}
          {selected === 'results' && (
            <Typography variant="h6">Results page coming soon...</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
