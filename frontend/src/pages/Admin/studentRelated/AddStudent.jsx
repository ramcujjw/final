import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const AddStudent = () => {
    const [studentData, setStudentData] = useState({
        name: '',
        rollNum: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Post student data to the backend
        axios.post('/api/admin/students', studentData)
            .then(response => {
                alert('Student added successfully');
                setStudentData({ name: '', rollNum: '', email: '', password: '' }); // Reset form
            })
            .catch(error => {
                console.error('Error adding student', error);
            });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>Add Student</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    margin="normal"
                    value={studentData.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Roll Number"
                    name="rollNum"
                    fullWidth
                    margin="normal"
                    value={studentData.rollNum}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={studentData.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={studentData.password}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Add Student</Button>
            </form>
        </Container>
    );
};

export default AddStudent;
