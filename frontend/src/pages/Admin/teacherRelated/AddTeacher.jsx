import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const AddTeacher = () => {
    const [teacherData, setTeacherData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Post teacher data to the backend
        axios.post('/api/admin/teachers', teacherData)
            .then(response => {
                alert('Teacher added successfully');
                setTeacherData({ name: '', email: '', password: '' }); // Reset form
            })
            .catch(error => {
                console.error('Error adding teacher', error);
            });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>Add Teacher</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    margin="normal"
                    value={teacherData.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={teacherData.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={teacherData.password}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Add Teacher</Button>
            </form>
        </Container>
    );
};

export default AddTeacher;
