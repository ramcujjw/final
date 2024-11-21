// models/Attendance.js
const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  classId: { type: String, required: true },
  teacherId: { type: String, required: true },
  subject: { type: String, required: true },
  date: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
