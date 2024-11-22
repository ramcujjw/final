import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const StudentProfile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        rollNum: '',
    });

    useEffect(() => {
        // Fetch profile data from MongoDB
        axios.get('/api/student/profile')
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error('Error fetching profile data', error);
            });
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update profile data in MongoDB
        axios.put('/api/student/profile', profile)
            .then(response => {
                alert('Profile updated successfully');
            })
            .catch(error => {
                console.error('Error updating profile', error);
            });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>Student Profile</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    margin="normal"
                    value={profile.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={profile.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Roll Number"
                    name="rollNum"
                    fullWidth
                    margin="normal"
                    value={profile.rollNum}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Update Profile</Button>
            </form>
        </Container>
    );
};

export default StudentProfile;
