import React from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';

const AdminHomePage = () => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        // Fetch admin data from MongoDB
        axios.get('/api/admin/homepage')
            .then(response => {
                setAdmin(response.data);
            })
            .catch(error => {
                console.error('Error fetching admin data', error);
            });
    }, []);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>Welcome to the Admin Dashboard</Typography>
            {admin && (
                <Typography variant="h6" align="center" gutterBottom>{`Hello, ${admin.name}`}</Typography>
            )}
        </Container>
    );
};

export default AdminHomePage;
