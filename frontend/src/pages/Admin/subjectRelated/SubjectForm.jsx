import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const SubjectForm = () => {
    const [subjectData, setSubjectData] = useState({
        name: '',
        classID: '',
    });

    const handleChange = (e) => {
        setSubjectData({ ...subjectData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Post subject data to the backend
        axios.post('/api/admin/subjects', subjectData)
            .then(response => {
                alert('Subject added successfully');
                setSubjectData({ name: '', classID: '' }); // Reset form
            })
            .catch(error => {
                console.error('Error adding subject', error);
            });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>Add Subject</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Subject Name"
                    name="name"
                    fullWidth
                    margin="normal"
                    value={subjectData.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Class ID"
                    name="classID"
                    fullWidth
                    margin="normal"
                    value={subjectData.classID}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Add Subject</Button>
            </form>
        </Container>
    );
};

export default SubjectForm;
