import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';

const TeacherDashboard = () => {
    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>Teacher Dashboard</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '1rem' }}>
                        <Typography variant="h6">Manage Subjects</Typography>
                        {/* Add components or links to manage subjects */}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '1rem' }}>
                        <Typography variant="h6">Attendance</Typography>
                        {/* Add components or links for attendance */}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '1rem' }}>
                        <Typography variant="h6">Manage Classes</Typography>
                        {/* Add components or links to manage classes */}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default TeacherDashboard;
