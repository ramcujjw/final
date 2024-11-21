import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginSelection = () => {
    const navigate = useNavigate();

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Typography variant="h4">Select User Type to Login</Typography>
            </Grid>
            <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
                <Button variant="contained" color="primary" onClick={() => navigate('/login/admin')}>
                    Admin Login
                </Button>
            </Grid>
            <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
                <Button variant="contained" color="primary" onClick={() => navigate('/login/teacher')}>
                    Teacher Login
                </Button>
            </Grid>
            <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
                <Button variant="contained" color="primary" onClick={() => navigate('/login/student')}>
                    Student Login
                </Button>
            </Grid>
        </Grid>
    );
};

export default LoginSelection;
