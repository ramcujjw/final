import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewSubject = () => {
    const { classID, subjectID } = useParams();
    const [subject, setSubject] = useState(null);

    useEffect(() => {
        // Fetch subject details from the backend
        axios.get(`/api/admin/classes/${classID}/subjects/${subjectID}`)
            .then(response => {
                setSubject(response.data);
            })
            .catch(error => {
                console.error('Error fetching subject details', error);
            });
    }, [classID, subjectID]);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>Subject Details</Typography>
            {subject && (
                <div>
                    <Typography variant="h6">Subject Name: {subject.name}</Typography>
                    <Typography variant="h6">Class ID: {subject.classID}</Typography>
                    <Typography variant="h6">Assigned Teacher: {subject.teacher.name}</Typography>
                    <Typography variant="h6">Students:</Typography>
                    <List>
                        {subject.students.map((student) => (
                            <ListItem key={student._id}>
                                <ListItemText primary={`${student.name} (${student.rollNum})`} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            )}
        </Container>
    );
};

export default ViewSubject;
