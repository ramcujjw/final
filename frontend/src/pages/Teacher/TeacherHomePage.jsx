import React from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';

const TeacherHomePage = () => {
    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        // Fetch teacher data from MongoDB
        axios.get('/api/teacher/homepage')
            .then(response => {
                setTeacher(response.data);
            })
            .catch(error => {
                console.error('Error fetching teacher data', error);
            });
    }, []);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>Welcome to the Teacher Dashboard</Typography>
            {teacher && (
                <Typography variant="h6" align="center" gutterBottom>{`Hello, ${teacher.name}`}</Typography>
            )}
        </Container>
    );
};

export default TeacherHomePage;
