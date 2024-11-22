import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';

const AdminDashboard = () => {
    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>Admin Dashboard</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '1rem' }}>
                        <Typography variant="h6">Manage Teachers</Typography>
                        {/* Add components or links to manage teachers */}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '1rem' }}>
                        <Typography variant="h6">Manage Students</Typography>
                        {/* Add components or links to manage students */}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '1rem' }}>
                        <Typography variant="h6">Manage Classes</Typography>
                        {/* Add components or links to manage classes */}
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

export default AdminDashboard;
