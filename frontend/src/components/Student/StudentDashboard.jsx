import React from 'react';
import { Typography, Container, Grid, Paper } from '@mui/material';

const StudentDashboard = () => {
    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>Student Dashboard</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '1rem' }}>
                        <Typography variant="h6">Subjects</Typography>
                        {/* Add components or links to view subjects */}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '1rem' }}>
                        <Typography variant="h6">Attendance</Typography>
                        {/* Add components or links to view attendance */}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '1rem' }}>
                        <Typography variant="h6">Reports</Typography>
                        {/* Add components or links for reports */}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default StudentDashboard;
