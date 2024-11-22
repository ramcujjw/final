import React, { useState } from 'react';
import { Container, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';

const GenerateQRCode = () => {
    const [classId, setClassId] = useState('');
    const [subjectId, setSubjectId] = useState('');
    const [qrCode, setQrCode] = useState('');

    const handleGenerateQRCode = async () => {
        try {
            const response = await axios.post('/api/teacher/generate-qr', {
                classId,
                subjectId,
            });
            setQrCode(response.data.qrCode);
        } catch (error) {
            console.error('Error generating QR code', error);
        }
    };

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>Generate QR Code</Typography>
            <TextField
                label="Class ID"
                fullWidth
                margin="normal"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                required
            />
            <TextField
                label="Subject ID"
                fullWidth
                margin="normal"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                required
            />
            <Button variant="contained" color="primary" onClick={handleGenerateQRCode} style={{ marginTop: '20px' }}>
                Generate QR Code
            </Button>
            {qrCode && (
                <div style={{ marginTop: '20px' }}>
                    <img src={qrCode} alt="QR Code" />
                </div>
            )}
        </Container>
    );
};

export default GenerateQRCode;
