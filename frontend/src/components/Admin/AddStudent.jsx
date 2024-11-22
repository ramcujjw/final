import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const AddStudent = () => {
    const [student, setStudent] = useState({
        name: '',
        rollNum: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/students', student);
            console.log('Student added:', response.data);
        } catch (error) {
            console.error('Error adding student:', error);
        }
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
                    value={student.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Roll Number"
                    name="rollNum"
                    fullWidth
                    margin="normal"
                    value={student.rollNum}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={student.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={student.password}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Add Student</Button>
            </form>
        </Container>
    );
};

export default AddStudent;
