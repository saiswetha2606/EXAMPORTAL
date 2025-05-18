import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';

const AdminDashboard = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Dashboard
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Welcome! You are logged in as an admin.
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                    {/* Placeholder for Admin Functionality 1 */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" gutterBottom>
                                Manage Exams
                            </Typography>
                            <Typography>
                                Section to create, edit, and delete exams.
                            </Typography>
                        </Paper>
                    </Grid>
                    {/* Placeholder for Admin Functionality 2 */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" gutterBottom>
                                Manage Users
                            </Typography>
                            <Typography>
                                Section to view and manage users.
                            </Typography>
                        </Paper>
                    </Grid>
                    {/* Placeholder for Admin Functionality 3 */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" gutterBottom>
                                View Results
                            </Typography>
                            <Typography>
                                Section to view student exam results.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default AdminDashboard;
