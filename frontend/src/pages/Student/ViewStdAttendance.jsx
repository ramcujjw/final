import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const ViewStdAttendance = () => {
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        // Fetch attendance data from MongoDB
        axios.get('/api/student/attendance')
            .then(response => {
                setAttendance(response.data);
            })
            .catch(error => {
                console.error('Error fetching attendance data', error);
            });
    }, []);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>My Attendance</Typography>
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

export default ViewStdAttendance;
