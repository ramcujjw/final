import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShowStudents = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch students from the backend
        axios.get('/api/admin/students')
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('Error fetching students', error);
            });
    }, []);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>Students</Typography>
            <List>
                {students.map((student) => (
                    <ListItem button key={student._id} onClick={() => navigate(`/Admin/students/student/${student._id}`)}>
                        <ListItemText primary={`${student.name} (Roll Number: ${student.rollNum})`} />
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" color="primary" onClick={() => navigate('/Admin/addstudents')}>Add New Student</Button>
        </Container>
    );
};

export default ShowStudents;
