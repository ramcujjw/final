import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ClassDetails = () => {
    const { id } = useParams();
    const [classDetails, setClassDetails] = useState(null);

    useEffect(() => {
        // Fetch class details from the backend
        axios.get(`/api/admin/classes/${id}`)
            .then(response => {
                setClassDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching class details', error);
            });
    }, [id]);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>Class Details</Typography>
            {classDetails && (
                <div>
                    <Typography variant="h6">Class Name: {classDetails.name}</Typography>
                    <Typography variant="h6">Grade: {classDetails.grade}</Typography>
                    <Typography variant="h6">Students:</Typography>
                    <List>
                        {classDetails.students.map((student) => (
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

export default ClassDetails;
