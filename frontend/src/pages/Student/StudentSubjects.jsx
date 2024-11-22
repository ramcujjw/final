import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const StudentSubjects = () => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        // Fetch subjects data from MongoDB
        axios.get('/api/student/subjects')
            .then(response => {
                setSubjects(response.data);
            })
            .catch(error => {
                console.error('Error fetching subjects data', error);
            });
    }, []);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>My Subjects</Typography>
            <List>
                {subjects.map((subject) => (
                    <ListItem key={subject._id}>
                        <ListItemText primary={subject.name} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default StudentSubjects;
