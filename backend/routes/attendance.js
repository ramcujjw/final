// routes/attendance.js
const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const Attendance = require('../models/Attendance');

// Endpoint to generate QR Code for attendance
router.post('/take-attendance', async (req, res) => {
  const { classId, teacherId, subject, date } = req.body;

  try {
    // Save attendance record 
    const newAttendance = new Attendance({
      classId,
      teacherId,
      subject,
      date
    });

    await newAttendance.save();

    // Generate QR code with the attendance data
    const qrData = { classId, teacherId, subject, date };
    const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

    res.json({ success: true, qrCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error generating QR Code' });
  }
});

module.exports = router;
