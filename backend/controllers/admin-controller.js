const bcrypt = require('bcrypt');
const Admin = require('../models/adminSchema.js');
const Sclass = require('../models/sclassSchema.js');
const Student = require('../models/studentSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Subject = require('../models/subjectSchema.js');

// Register Admin
const adminRegister = async (req, res) => {
    try {
        // Check if email or school name already exists
        const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
        const existingSchool = await Admin.findOne({ schoolName: req.body.schoolName });

        if (existingAdminByEmail) {
            return res.send({ message: 'Email already exists' });
        }

        if (existingSchool) {
            return res.send({ message: 'School name already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        // Create new admin
        const admin = new Admin({
            ...req.body,
            password: hashedPass
        });

        // Save the admin and send response
        const result = await admin.save();
        result.password = undefined;
        res.send(result);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Login Admin
const adminLogIn = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.send({ message: 'Email and password are required' });
        }

        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) {
            return res.send({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, admin.password);
        if (!isPasswordValid) {
            return res.send({ message: 'Invalid password' });
        }

        admin.password = undefined;
        res.send(admin);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Get Admin Details
const getAdminDetail = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.send({ message: 'No admin found' });
        }

        admin.password = undefined;
        res.send(admin);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Delete Admin
const deleteAdmin = async (req, res) => {
    try {
        // Find and delete the admin
        const result = await Admin.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.send({ message: 'Admin not found' });
        }

        // Delete related data
        await Sclass.deleteMany({ school: req.params.id });
        await Student.deleteMany({ school: req.params.id });
        await Teacher.deleteMany({ school: req.params.id });
        await Subject.deleteMany({ school: req.params.id });

        res.send({ message: 'Admin and related data deleted', admin: result });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error });
    }
};

module.exports = { adminRegister, adminLogIn, getAdminDetail, deleteAdmin };
