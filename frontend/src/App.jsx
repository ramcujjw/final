import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSelection from './components/LoginSelection';
import AdminLogin from './components/AdminLogin';
import TeacherLogin from './components/TeacherLogin';
import StudentLogin from './components/StudentLogin';
import AdminPage from './pages/Admin/AdminDashboard';
import TeacherPage from './pages/Teacher/TeacherDashboard';
import StudentPage from './pages/Student/StudentDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router future={{ v7_relativeSplatPath: true }}>
            <Routes>
                <Route path="/" element={<LoginSelection />} />
                <Route path="/login/admin" element={<AdminLogin />} />
                <Route path="/login/teacher" element={<TeacherLogin />} />
                <Route path="/login/student" element={<StudentLogin />} />
                <Route path="/admin-dashboard" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
                <Route path="/teacher-dashboard" element={<ProtectedRoute><TeacherPage /></ProtectedRoute>} />
                <Route path="/student-dashboard" element={<ProtectedRoute><StudentPage /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

export default App;
