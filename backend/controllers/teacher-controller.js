const bcrypt = require('bcrypt');
const QRCode = require('qrcode');
const Teacher = require('../models/teacherSchema.js');
const Subject = require('../models/subjectSchema.js');
const Session = require('../models/sessionSchema.js');

// Register Teacher
const teacherRegister = async (req, res) => {
    const { name, email, password, role, school, teachSubject, teachSclass } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const existingTeacherByEmail = await Teacher.findOne({ email });
        if (existingTeacherByEmail) {
            return res.status(400).send({ message: 'Email already exists' });
        }

        const teacher = new Teacher({ name, email, password: hashedPass, role, school, teachSubject, teachSclass });

        const result = await teacher.save();
        await Subject.findByIdAndUpdate(teachSubject, { teacher: teacher._id });
        result.password = undefined;
        res.status(201).send(result);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Login Teacher
const teacherLogIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(404).send({ message: 'Teacher not found' });
        }

        const validated = await bcrypt.compare(password, teacher.password);
        if (!validated) {
            return res.status(400).send({ message: "Invalid password" });
        }

        teacher = await teacher.populate("teachSubject", "subName sessions");
        teacher = await teacher.populate("school", "schoolName");
        teacher = await teacher.populate("teachSclass", "sclassName");
        teacher.password = undefined;
        res.send(teacher);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Get Teachers
const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({ school: req.params.id })
            .populate("teachSubject", "subName")
            .populate("teachSclass", "sclassName");

        if (teachers.length === 0) {
            return res.status(404).send({ message: "No teachers found" });
        }

        const modifiedTeachers = teachers.map((teacher) => ({
            ...teacher._doc, password: undefined
        }));

        res.send(modifiedTeachers);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Get Teacher Details
const getTeacherDetail = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id)
            .populate("teachSubject", "subName sessions")
            .populate("school", "schoolName")
            .populate("teachSclass", "sclassName");

        if (!teacher) {
            return res.status(404).send({ message: "No teacher found" });
        }

        teacher.password = undefined;
        res.send(teacher);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Update Teacher's Subject
const updateTeacherSubject = async (req, res) => {
    const { teacherId, teachSubject } = req.body;
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(
            teacherId,
            { teachSubject },
            { new: true }
        );

        await Subject.findByIdAndUpdate(teachSubject, { teacher: updatedTeacher._id });
        res.send(updatedTeacher);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete Teacher
const deleteTeacher = async (req, res) => {
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);

        if (!deletedTeacher) {
            return res.status(404).send({ message: "Teacher not found" });
        }

        await Subject.updateOne(
            { teacher: deletedTeacher._id, teacher: { $exists: true } },
            { $unset: { teacher: 1 } }
        );

        res.send(deletedTeacher);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete Teachers
const deleteTeachers = async (req, res) => {
    try {
        const deletionResult = await Teacher.deleteMany({ school: req.params.id });

        if (deletionResult.deletedCount === 0) {
            return res.status(404).send({ message: "No teachers found to delete" });
        }

        const deletedTeachers = await Teacher.find({ school: req.params.id });

        await Subject.updateMany(
            { teacher: { $in: deletedTeachers.map(teacher => teacher._id) }, teacher: { $exists: true } },
            { $unset: { teacher: "" } }
        );

        res.send(deletionResult);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete Teachers by Class
const deleteTeachersByClass = async (req, res) => {
    try {
        const deletionResult = await Teacher.deleteMany({ sclassName: req.params.id });

        if (deletionResult.deletedCount === 0) {
            return res.status(404).send({ message: "No teachers found to delete" });
        }

        const deletedTeachers = await Teacher.find({ sclassName: req.params.id });

        await Subject.updateMany(
            { teacher: { $in: deletedTeachers.map(teacher => teacher._id) }, teacher: { $exists: true } },
            { $unset: { teacher: "" } }
        );

        res.send(deletionResult);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Record Teacher Attendance
const teacherAttendance = async (req, res) => {
    const { status, date } = req.body;
    try {
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.status(404).send({ message: 'Teacher not found' });
        }

        const existingAttendance = teacher.attendance.find(
            (a) => a.date.toDateString() === new Date(date).toDateString()
        );

        if (existingAttendance) {
            existingAttendance.status = status;
        } else {
            teacher.attendance.push({ date, status });
        }

        const result = await teacher.save();
        res.send(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Generate QR Code for Attendance
const generateQR = async (req, res) => {
    const { classId, sessionId } = req.body;
    try {
        const qrData = `${sessionId}-${new Date().toISOString()}`;
        const qrCode = await QRCode.toDataURL(qrData);

        const newSession = new Session({
            classId,
            sessionId,
            qrCode,
        });

        await newSession.save();
        res.send(qrCode);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

module.exports = {
    teacherRegister,
    teacherLogIn,
    getTeachers,
    getTeacherDetail,
    updateTeacherSubject,
    deleteTeacher,
    deleteTeachers,
    deleteTeachersByClass,
    teacherAttendance,
    generateQR
};
