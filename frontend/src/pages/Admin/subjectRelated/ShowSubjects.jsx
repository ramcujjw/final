import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShowSubjects = () => {
    const [subjects, setSubjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch subjects from the backend
        axios.get('/api/admin/subjects')
            .then(response => {
                setSubjects(response.data);
            })
            .catch(error => {
                console.error('Error fetching subjects', error);
            });
    }, []);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>Subjects</Typography>
            <List>
                {subjects.map((subject) => (
                    <ListItem button key={subject._id} onClick={() => navigate(`/Admin/subjects/subject/${subject.classID}/${subject._id}`)}>
                        <ListItemText primary={subject.name} />
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" color="primary" onClick={() => navigate('/Admin/addsubject')}>Add New Subject</Button>
        </Container>
    );
};

export default ShowSubjects;
