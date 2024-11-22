import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ChooseSubject = ({ situation }) => {
    const { id } = useParams();
    const [subjects, setSubjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch subjects from the backend
        axios.get(`/api/admin/classes/${id}/subjects`)
            .then(response => {
                setSubjects(response.data);
            })
            .catch(error => {
                console.error('Error fetching subjects', error);
            });
    }, [id]);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>Choose Subject</Typography>
            <List>
                {subjects.map((subject) => (
                    <ListItem button key={subject._id} onClick={() => navigate(`/Admin/${situation.toLowerCase()}/subject/${subject._id}`)}>
                        <ListItemText primary={subject.name} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default ChooseSubject;
