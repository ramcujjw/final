const router = require('express').Router();
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
const { generateQR: generateQRAttendance, markAttendance } = require('./attendance.js'); // Ensure attendance routes are updated accordingly

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

module.exports = router;
