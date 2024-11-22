import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const AddClass = () => {
    const [classData, setClassData] = useState({
        name: '',
        grade: '',
    });

    const handleChange = (e) => {
        setClassData({ ...classData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Post class data to the backend
        axios.post('/api/admin/classes', classData)
            .then(response => {
                alert('Class added successfully');
                setClassData({ name: '', grade: '' }); // Reset form
            })
            .catch(error => {
                console.error('Error adding class', error);
            });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>Add Class</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Class Name"
                    name="name"
                    fullWidth
                    margin="normal"
                    value={classData.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Grade"
                    name="grade"
                    fullWidth
                    margin="normal"
                    value={classData.grade}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Add Class</Button>
            </form>
        </Container>
    );
};

export default AddClass;
