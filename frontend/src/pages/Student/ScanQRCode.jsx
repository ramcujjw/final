import React, { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { QrReader } from 'react-qr-scanner';
import axios from 'axios';

const ScanQRCode = () => {
    const [result, setResult] = useState('No result');
    const [scanSuccessful, setScanSuccessful] = useState(false);

    const handleScan = (data) => {
        if (data) {
            setResult(data.text);
            // Handle the scanned data (e.g., send to backend)
            axios.post('/api/student/attendance/scan', { qrCodeData: data.text })
                .then(response => {
                    setScanSuccessful(true);
                    alert('Attendance marked successfully');
                })
                .catch(error => {
                    console.error('Error marking attendance', error);
                });
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const handleReset = () => {
        setResult('No result');
        setScanSuccessful(false);
    };

    const previewStyle = {
        height: 240,
        width: 320,
    };

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>Scan QR Code</Typography>
            {!scanSuccessful ? (
                <QrReader
                    delay={300}
                    style={previewStyle}
                    onError={handleError}
                    onScan={handleScan}
                />
            ) : (
                <Typography variant="h6" style={{ marginTop: '20px' }}>Attendance marked successfully!</Typography>
            )}
            <Typography variant="subtitle1" style={{ marginTop: '20px' }}>{result}</Typography>
            {scanSuccessful && (
                <Button variant="contained" color="primary" onClick={handleReset} style={{ marginTop: '20px' }}>
                    Scan Another QR Code
                </Button>
            )}
        </Container>
    );
};

export default ScanQRCode;
