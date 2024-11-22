import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShowClasses = () => {
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
            <Typography variant="h4" align="center" gutterBottom>Classes</Typography>
            <List>
                {classes.map((cls) => (
                    <ListItem button key={cls._id} onClick={() => navigate(`/Admin/classes/class/${cls._id}`)}>
                        <ListItemText primary={`${cls.name} (Grade: ${cls.grade})`} />
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" color="primary" onClick={() => navigate('/Admin/addclass')}>Add New Class</Button>
        </Container>
    );
};

export default ShowClasses;
