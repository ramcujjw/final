import React from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';

const StudentHomePage = () => {
    const [student, setStudent] = useState(null);

    useEffect(() => {
        // Fetch student data from MongoDB
        axios.get('/api/student/homepage')
            .then(response => {
                setStudent(response.data);
            })
            .catch(error => {
                console.error('Error fetching student data', error);
            });
    }, []);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>Welcome to the Student Dashboard</Typography>
            {student && (
                <Typography variant="h6" align="center" gutterBottom>{`Hello, ${student.name}`}</Typography>
            )}
            {/* Add additional content here */}
        </Container>
    );
};

export default StudentHomePage;
