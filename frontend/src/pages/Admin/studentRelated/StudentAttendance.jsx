import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentAttendance = ({ situation }) => {
    const { studentID, subjectID } = useParams();
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        // Fetch attendance data from the backend
        axios.get(`/api/admin/students/${studentID}/attendance/${subjectID}`)
            .then(response => {
                setAttendance(response.data);
            })
            .catch(error => {
                console.error('Error fetching attendance data', error);
            });
    }, [studentID, subjectID]);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>Attendance</Typography>
            <List>
                {attendance.map((entry) => (
                    <ListItem key={entry._id}>
                        <ListItemText primary={`${entry.date}: ${entry.status}`} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default StudentAttendance;
