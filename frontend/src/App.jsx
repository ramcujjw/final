import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSelection from './components/LoginSelection';
import AdminLogin from './components/AdminLogin';
import TeacherLogin from './components/TeacherLogin';
import StudentLogin from './components/StudentLogin';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginSelection />} />
                <Route path="/login/admin" element={<AdminLogin />} />
                {/* <Route path="/login/teacher" element={<TeacherLogin />} />
                <Route path="/login/student" element={<StudentLogin />} /> */}
            </Routes>
        </Router>
    );
};

export default App;
