import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const TeacherClassDetails = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        // Fetch class details from MongoDB
        axios.get('/api/teacher/classes')
            .then(response => {
                setClasses(response.data);
            })
            .catch(error => {
                console.error('Error fetching class details', error);
            });
    }, []);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>My Classes</Typography>
            <List>
                {classes.map((cls) => (
                    <ListItem key={cls._id}>
                        <ListItemText primary={`${cls.name} (${cls.subject})`} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default TeacherClassDetails;
