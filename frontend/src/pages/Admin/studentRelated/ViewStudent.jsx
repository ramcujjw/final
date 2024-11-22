import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewStudent = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        // Fetch student details from the backend
        axios.get(`/api/admin/students/${id}`)
            .then(response => {
                setStudent(response.data);
            })
            .catch(error => {
                console.error('Error fetching student details', error);
            });
    }, [id]);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>Student Details</Typography>
            {student && (
                <div>
                    <Typography variant="h6">Name: {student.name}</Typography>
                    <Typography variant="h6">Roll Number: {student.rollNum}</Typography>
                    <Typography variant="h6">Email: {student.email}</Typography>
                    <Typography variant="h6">Attendance:</Typography>
                    <List>
                        {student.attendance.map((entry) => (
                            <ListItem key={entry._id}>
                                <ListItemText primary={`${entry.date}: ${entry.status}`} />
                            </ListItem>
                        ))}
                    </List>
                    <Typography variant="h6">Marks:</Typography>
                    <List>
                        {student.marks.map((mark) => (
                            <ListItem key={mark._id}>
                                <ListItemText primary={`${mark.exam}: ${mark.score}`} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            )}
        </Container>
    );
};

export default ViewStudent;
