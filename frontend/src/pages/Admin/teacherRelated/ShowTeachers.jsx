import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShowTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch teachers from the backend
        axios.get('/api/admin/teachers')
            .then(response => {
                setTeachers(response.data);
            })
            .catch(error => {
                console.error('Error fetching teachers', error);
            });
    }, []);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>Teachers</Typography>
            <List>
                {teachers.map((teacher) => (
                    <ListItem button key={teacher._id} onClick={() => navigate(`/Admin/teachers/teacher/${teacher._id}`)}>
                        <ListItemText primary={teacher.name} />
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" color="primary" onClick={() => navigate('/Admin/addteacher')}>Add New Teacher</Button>
        </Container>
    );
};

export default ShowTeachers;
