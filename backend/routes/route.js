const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const Attendance = require('../models/attendanceSchema.js');
const Session = require('../models/sessionSchema.js');
const Student = require('../models/studentSchema.js');

const { adminRegister, adminLogIn, getAdminDetail, deleteAdmin } = require('../controllers/admin-controller.js');
const { sclassCreate, sclassList, deleteSclass, getSclassDetail, getSclassStudents } = require('../controllers/class-controller.js');
const {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass
} = require('../controllers/student-controller.js');
const { subjectCreate, classSubjects, deleteSubject, getSubjectDetail, generateQR: generateQRSubject } = require('../controllers/subject-controller.js');
const { teacherRegister, teacherLogIn, getTeachers, getTeacherDetail, deleteTeacher, teacherAttendance, generateQR: generateQRTeacher } = require('../controllers/teacher-controller.js');
const { generateQRAttendance, markAttendance } = require('../controllers/attendance-controller.js');

// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);
router.get("/Admin/:id", getAdminDetail);
router.delete("/Admin/:id", deleteAdmin);

// Student
router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn);
router.get("/Students/:id", getStudents);
router.get("/Student/:id", getStudentDetail);
router.delete("/Student/:id", deleteStudent);
router.delete("/StudentsClass/:id", deleteStudentsByClass);
router.put("/Student/:id", updateStudent);
router.put('/StudentAttendance/:id', studentAttendance);

// Teacher
router.post('/TeacherReg', teacherRegister);
router.post('/TeacherLogin', teacherLogIn);
router.get("/Teachers/:id", getTeachers);
router.get("/Teacher/:id", getTeacherDetail);
router.delete("/Teacher/:id", deleteTeacher);
router.post('/TeacherAttendance/:id', teacherAttendance);
router.post('/GenerateQRTeacher', generateQRTeacher);

// Class (Sclass)
router.post('/SclassCreate', sclassCreate);
router.get('/SclassList/:id', sclassList);
router.get("/Sclass/:id", getSclassDetail);
router.get("/Sclass/Students/:id", getSclassStudents);
router.delete("/Sclass/:id", deleteSclass);

// Subject
router.post('/SubjectCreate', subjectCreate);
router.get('/ClassSubjects/:id', classSubjects);
router.get("/Subject/:id", getSubjectDetail);
router.delete("/Subject/:id", deleteSubject);
router.post('/GenerateQRSubject', generateQRSubject);

// Attendance
router.post('/GenerateQR', generateQRAttendance);
router.post('/MarkAttendance', markAttendance);

// Endpoint to generate QR Code for attendance
router.post('/generate-qr', async (req, res) => {
    const { classId, teacherId, subject, date } = req.body;

    try {
        // Generate a unique session ID
        const sessionId = `${classId}-${Date.now()}`;

        // Save attendance record
        const newAttendance = new Attendance({
            classId,
            teacherId,
            subject,
            date,
            sessionId
        });

        await newAttendance.save();

        // Generate QR code with the attendance data
        const qrData = { sessionId, classId, teacherId, subject, date };
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
});

// Endpoint for students to mark attendance by scanning QR Code
router.post('/mark-attendance', async (req, res) => {
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
});

module.exports = router;
