const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  classId: { type: String, required: true },
  teacherId: { type: String, required: true },
  subject: { type: String, required: true },
  date: { type: String, required: true },
  sessionId: { type: String, required: true }, // Add sessionId field
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

const Attendance = mongoose.model('attendance', AttendanceSchema);

module.exports = Attendance;
