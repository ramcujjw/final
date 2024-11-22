import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from '../config/axiosConfig';

const TeacherLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle teacher login
        axios.post('/api/teacher/login', credentials)
            .then(response => {
                // Handle successful login
                console.log(response.data);
            })
            .catch(error => {
                console.error('Login error', error);
            });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>Teacher Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
            </form>
        </Container>
    );
};

export default TeacherLogin;
