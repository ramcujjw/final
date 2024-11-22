import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TeacherViewStudent = () => {
    const { id } = useParams();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch student details for the class from MongoDB
        axios.get(`/api/teacher/class/${id}/students`)
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('Error fetching student details', error);
            });
    }, [id]);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>Students in Class</Typography>
            <List>
                {students.map((student) => (
                    <ListItem key={student._id}>
                        <ListItemText primary={`${student.name} (${student.rollNum})`} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default TeacherViewStudent;
