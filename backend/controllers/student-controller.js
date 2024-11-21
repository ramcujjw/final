const bcrypt = require('bcrypt');
const QRCode = require('qrcode');
const Student = require('../models/studentSchema.js');
const Subject = require('../models/subjectSchema.js');
const Session = require('../models/sessionSchema.js');

// Register Student
const studentRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const existingStudent = await Student.findOne({
            rollNum: req.body.rollNum,
            school: req.body.adminID,
            sclassName: req.body.sclassName,
        });

        if (existingStudent) {
            res.send({ message: 'Roll Number already exists' });
        } else {
            const student = new Student({
                ...req.body,
                school: req.body.adminID,
                password: hashedPass
            });

            let result = await student.save();

            result.password = undefined;
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Login Student
const studentLogIn = async (req, res) => {
    try {
        let student = await Student.findOne({ rollNum: req.body.rollNum, name: req.body.studentName });
        if (student) {
            const validated = await bcrypt.compare(req.body.password, student.password);
            if (validated) {
                student = await student.populate("school", "schoolName");
                student = await student.populate("sclassName", "sclassName");
                student.password = undefined;
                student.examResult = undefined;
                student.attendance = undefined;
                res.send(student);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "Student not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get All Students
const getStudents = async (req, res) => {
    try {
        let students = await Student.find({ school: req.params.id }).populate("sclassName", "sclassName");
        if (students.length > 0) {
            let modifiedStudents = students.map((student) => {
                return { ...student._doc, password: undefined };
            });
            res.send(modifiedStudents);
        } else {
            res.send({ message: "No students found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get Student Details
const getStudentDetail = async (req, res) => {
    try {
        let student = await Student.findById(req.params.id)
            .populate("school", "schoolName")
            .populate("sclassName", "sclassName")
            .populate("examResult.subName", "subName")
            .populate("attendance.subName", "subName sessions");
        if (student) {
            student.password = undefined;
            res.send(student);
        } else {
            res.send({ message: "No student found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete Student
const deleteStudent = async (req, res) => {
    try {
        const result = await Student.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Delete All Students in School
const deleteStudents = async (req, res) => {
    try {
        const result = await Student.deleteMany({ school: req.params.id });
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" });
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Delete Students by Class
const deleteStudentsByClass = async (req, res) => {
    try {
        const result = await Student.deleteMany({ sclassName: req.params.id });
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" });
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update Student
const updateStudent = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        let result = await Student.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true });

        result.password = undefined;
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update Exam Result
const updateExamResult = async (req, res) => {
    const { subName, marksObtained } = req.body;

    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.send({ message: 'Student not found' });
        }

        const existingResult = student.examResult.find(
            (result) => result.subName.toString() === subName
        );

        if (existingResult) {
            existingResult.marksObtained = marksObtained;
        } else {
            student.examResult.push({ subName, marksObtained });
        }

        const result = await student.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Mark Student Attendance using QR Code
const studentAttendance = async (req, res) => {
    const { sessionId, studentId } = req.body;

    try {
        const session = await Session.findOne({ sessionId });
        if (!session) {
            return res.send({ message: 'Invalid session' });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.send({ message: 'Student not found' });
        }

        const existingAttendance = student.attendance.find(
            (a) => a.sessionId.toString() === sessionId
        );

        if (existingAttendance) {
            return res.send({ message: 'Attendance already marked' });
        } else {
            student.attendance.push({ sessionId, date: new Date(), status: 'Present' });
        }

        const result = await student.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Clear Attendance by Subject
const clearAllStudentsAttendanceBySubject = async (req, res) => {
    const subName = req.params.id;

    try {
        const result = await Student.updateMany(
            { 'attendance.subName': subName },
            { $pull: { attendance: { subName } } }
        );
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Clear All Attendance in School
const clearAllStudentsAttendance = async (req, res) => {
    const schoolId = req.params.id;

    try {
        const result = await Student.updateMany(
            { school: schoolId },
            { $set: { attendance: [] } }
        );

        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Remove Attendance by Subject for Student
const removeStudentAttendanceBySubject = async (req, res) => {
    const studentId = req.params.id;
    const subName = req.body.subId;

    try {
        const result = await Student.updateOne(
            { _id: studentId },
            { $pull: { attendance: { subName: subName } } }
        );

        return res.send(result);
    } catch (error) {
        res.status (500).json(error);
    }
};

// Remove All Attendance for Student
const removeStudentAttendance = async (req, res) => {
    const studentId = req.params.id;

    try {
        const result = await Student.updateOne(
            { _id: studentId },
            { $set: { attendance: [] } }
        );

        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,
    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance,
};
