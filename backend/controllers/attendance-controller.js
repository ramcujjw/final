const QRCode = require('qrcode');
const Attendance = require('../models/attendanceSchema');
const Session = require('../models/sessionSchema.js');

// Generate QR Code for Attendance
const generateQRAttendance = async (req, res) => {
    const { classId, teacherId, subject, date } = req.body;
    try {
        // Generate a unique session ID
        const sessionId = `${classId}-${Date.now()}`;
        const qrData = { classId, teacherId, subject, date, sessionId };
        const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
        
        // Save session with QR code
        const newSession = new Session({
            classId,
            sessionId,
            qrCode
        });
        await newSession.save();
        res.json({ success: true, qrCode });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error generating QR Code' });
    }
};

// Mark Attendance by Scanning QR Code
const markAttendance = async (req, res) => {
    const { sessionId, studentId } = req.body;
    try {
        const session = await Session.findOne({ sessionId });
        if (!session) {
            return res.status(400).json({ success: false, message: 'Invalid session' });
        }

        const attendanceRecord = await Attendance.findOne({ sessionId });
        if (!attendanceRecord) {
            return res.status(400).json({ success: false, message: 'Attendance record not found' });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(400).json({ success: false, message: 'Student not found' });
        }

        // Check if the student has already marked attendance for this session
        if (attendanceRecord.students.includes(studentId)) {
            return res.status(400).json({ success: false, message: 'Attendance already marked' });
        }

        // Mark attendance
        attendanceRecord.students.push(studentId);
        await attendanceRecord.save();

        // Update student's attendance
        const date = new Date();
        student.attendance.push({
            date,
            status: 'Present',
            subName: attendanceRecord.subject,
            sessionId
        });
        await student.save();

        res.json({ success: true, message: 'Attendance marked' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error marking attendance' });
    }
};

module.exports = { generateQRAttendance, markAttendance };
