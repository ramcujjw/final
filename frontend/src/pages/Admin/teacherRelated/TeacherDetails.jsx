import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TeacherDetails = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        // Fetch teacher details from the backend
        axios.get(`/api/admin/teachers/${id}`)
            .then(response => {
                setTeacher(response.data);
            })
            .catch(error => {
                console.error('Error fetching teacher details', error);
            });
    }, [id]);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>Teacher Details</Typography>
            {teacher && (
                <div>
                    <Typography variant="h6">Name: {teacher.name}</Typography>
                    <Typography variant="h6">Email: {teacher.email}</Typography>
                    <Typography variant="h6">Subjects:</Typography>
                    <List>
                        {teacher.subjects.map((subject) => (
                            <ListItem key={subject._id}>
                                <ListItemText primary={subject.name} />
                            </ListItem>
                        ))}
                    </List>
                    <Typography variant="h6">Classes:</Typography>
                    <List>
                        {teacher.classes.map((cls) => (
                            <ListItem key={cls._id}>
                                <ListItemText primary={cls.name} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            )}
        </Container>
    );
};

export default TeacherDetails;
