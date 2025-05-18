import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    Button,
    Avatar,
    Menu,
    MenuItem,
    IconButton,
    Divider,
    List,
    ListItem,
    ListItemText,
    Chip
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [examResults, setExamResults] = useState([]);
    const [examsForCourse, setExamsForCourse] = useState([]); // State to hold exams for a selected course
    const [selectedCourse, setSelectedCourse] = useState(null); // State to hold the selected course
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeView, setActiveView] = useState('courses'); // 'courses', 'results', or 'examsForCourse'
    const openProfileMenu = Boolean(anchorEl);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch enrolled courses
                const coursesResponse = await axios.get('/api/courses/enrolled');
                setEnrolledCourses(coursesResponse.data);

                // Fetch exam results
                const resultsResponse = await axios.get('/api/exams/results');
                setExamResults(resultsResponse.data);

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                if (error.response && error.response.status === 401) {
                    handleLogout();
                }
            }
        };

        fetchDashboardData();
    }, []); // Fetch on component mount

     // Effect to fetch exams when a course is selected
    useEffect(() => {
        const fetchExamsForCourse = async () => {
            if (selectedCourse) {
                try {
                    const examsResponse = await axios.get(`/api/courses/${selectedCourse.id}/exams`);
                    setExamsForCourse(examsResponse.data);
                    setActiveView('examsForCourse');
                } catch (error) {
                    console.error(`Error fetching exams for course ${selectedCourse.name}:`, error);
                    // TODO: Handle error (e.g., show an error message)
                }
            }
        };

        fetchExamsForCourse();
    }, [selectedCourse]); // Re-run effect when selectedCourse changes

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        axios.defaults.headers.common['Authorization'] = null;
        navigate('/login');
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        navigate('/profile'); // Assuming a route for profile exists
        handleCloseMenu();
    };

    const handleChangePasswordClick = () => {
        navigate('/change-password'); // Assuming a route for change password exists
        handleCloseMenu();
    };

    const handleSelectCourse = (course) => {
        setSelectedCourse(course);
        // The useEffect for selectedCourse will handle fetching and setting activeView
    };

    const handleViewResultsClick = () => {
        setSelectedCourse(null); // Clear selected course when viewing results
        setActiveView('results');
    };

    const handleTakeExam = (examId) => {
        navigate(`/exam/${examId}`); // Navigate to the test interface route
    };

    const handleViewDetails = (resultId) => {
        navigate(`/results/${resultId}`); // Navigate to result details page
    };

     const renderCoursesList = () => (
        <List>
            {enrolledCourses.length > 0 ? (
                enrolledCourses.map((course) => (
                     <ListItem
                        key={course.id}
                        button
                        onClick={() => handleSelectCourse(course)}
                        sx={{
                            mb: 1,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                            boxShadow: 1,
                            '&:hover': { bgcolor: '#e0e0e0' }
                        }}
                    >
                        <ListItemText primary={course.name} />
                    </ListItem>
                 ))
            ) : (
                <Typography variant="body1">You are not enrolled in any courses yet.</Typography>
            )}
        </List>
    );

    const renderExamsListForCourse = () => (
        <Box>
            <Typography variant="h6" gutterBottom>{selectedCourse?.name} Exams</Typography>
             {examsForCourse.length > 0 ? (
                examsForCourse.map((exam) => (
                     <Card key={exam.id} sx={{ mb: 2 }}>
                         <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                             <Box>
                                 <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>
                                     {exam.title}
                                 </Typography>
                                 <Typography variant="body2" color="text.secondary">
                                     Duration: {exam.duration_minutes} minutes
                                 </Typography>
                             </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleTakeExam(exam.id)}
                            >
                                Take Exam
                            </Button>
                         </CardContent>
                     </Card>
                 ))
             ) : (
                 <Typography variant="body1">No exams available for this course yet.</Typography>
             )}
             <Button onClick={() => setActiveView('courses')} sx={{ mt: 2 }}>
                 Back to Courses
             </Button>
        </Box>
    );

    const renderResultsList = () => (
        <List>
             {examResults.length > 0 ? (
                examResults.map((result) => (
                     <ListItem
                         key={result.id}
                         sx={{
                             mb: 2,
                             bgcolor: 'background.paper',
                             borderRadius: 1,
                             boxShadow: 1,
                             display: 'flex',
                             justifyContent: 'space-between',
                             alignItems: 'center',
                             py: 2
                         }}
                     >
                         <ListItemText
                             primary={
                                 <Typography variant="h6" component="span">
                                     {result.exam_title}
                                 </Typography>
                             }
                             secondary={
                                 <>
                                     <Typography
                                         sx={{ display: 'inline' }}
                                         component="span"
                                         variant="body2"
                                         color="text.primary"
                                     >
                                         Score: {result.score} | Grade: {result.grade}
                                     </Typography>
                                     <br />
                                     <Typography component="span" variant="body2" color="text.secondary">
                                         Date: {new Date(result.date_taken).toLocaleDateString()}
                                     </Typography>
                                 </>
                             }
                         />
                         <Button
                             variant="outlined"
                             size="small"
                             onClick={() => handleViewDetails(result.id)}
                         >
                             View Details
                         </Button>
                     </ListItem>
                 ))
            ) : (
                <Typography variant="body1">No exam results available yet.</Typography>
            )}
        </List>
    );

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Left Panel (Sidebar) */}
            <Box sx={{ width: 240, flexShrink: 0, bgcolor: '#f4f4f4', p: 2 }}>
                <Typography variant="h6" gutterBottom>Menu</Typography>
                <Button
                    fullWidth
                    sx={{ mb: 1, justifyContent: 'flex-start' }}
                    onClick={() => {
                        setSelectedCourse(null); // Clear selected course
                        setActiveView('courses');
                    }}
                    color={activeView === 'courses' || activeView === 'examsForCourse' ? 'primary' : 'inherit'}
                >
                    My Courses
                </Button>
                <Button
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                    onClick={handleViewResultsClick}
                    color={activeView === 'results' ? 'primary' : 'inherit'}
                >
                    Results
                </Button>
            </Box>

            {/* Main Content Area */}
            <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4">Exam Portal</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ mr: 1 }}>
                            Welcome, {user?.full_name || user?.email}
                        </Typography>
                        <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                            <Avatar
                                alt={user?.full_name || user?.email}
                                src={user?.profile_picture || '/static/images/avatar/1.jpg'}
                            />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={openProfileMenu}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem onClick={handleProfileClick}>My Profile</MenuItem>
                            <MenuItem onClick={handleChangePasswordClick}>Change Password</MenuItem>
                            <Divider />
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Box>

                {/* Content Area */}
                <Paper elevation={2} sx={{ p: 3 }}>
                    {activeView === 'courses' && (
                        <Box>
                            <Typography variant="h5" gutterBottom>My Courses</Typography>
                            {renderCoursesList()}
                        </Box>
                    )}
                    {activeView === 'examsForCourse' && selectedCourse && (
                         <Box>
                            {renderExamsListForCourse()}
                        </Box>
                    )}
                    {activeView === 'results' && (
                        <Box>
                             <Typography variant="h5" gutterBottom>Exam Results</Typography>
                             {renderResultsList()}
                        </Box>
                    )}
                </Paper>
            </Box>
        </Box>
    );
};

export default Dashboard; 