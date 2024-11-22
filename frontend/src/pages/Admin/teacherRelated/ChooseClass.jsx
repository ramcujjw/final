import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChooseClass = ({ situation }) => {
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch classes from the backend
        axios.get('/api/admin/classes')
            .then(response => {
                setClasses(response.data);
            })
            .catch(error => {
                console.error('Error fetching classes', error);
            });
    }, []);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>Choose Class</Typography>
            <List>
                {classes.map((cls) => (
                    <ListItem button key={cls._id} onClick={() => navigate(`/Admin/${situation.toLowerCase()}/class/${cls._id}`)}>
                        <ListItemText primary={`${cls.name} (Grade: ${cls.grade})`} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default ChooseClass;
