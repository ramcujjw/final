import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginSelection = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>Welcome to the School Management System</Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/login/admin')} style={{ margin: '10px' }}>
                Admin Login
            </Button>
            <Button variant="contained" color="primary" onClick={() => navigate('/login/teacher')} style={{ margin: '10px' }}>
                Teacher Login
            </Button>
            <Button variant="contained" color="primary" onClick={() => navigate('/login/student')} style={{ margin: '10px' }}>
                Student Login
            </Button>
        </Container>
    );
};

export default LoginSelection;
