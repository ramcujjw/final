const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

module.exports = mongoose.model('attendance', attendanceSchema);
