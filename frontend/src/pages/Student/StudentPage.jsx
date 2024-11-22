import React from 'react';
import Navbar from '../../components/Common/Navbar';
import Sidebar from '../../components/Common/Sidebar';
import StudentDashboard from '../../components/Student/StudentDashboard';

const studentItems = [
    { text: 'Dashboard', path: '/student-dashboard' },
    // Add more links as necessary
];

const StudentPage = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Navbar />
            <Sidebar items={studentItems} />
            <main style={{ marginLeft: 240, padding: '1rem', flexGrow: 1 }}>
                <StudentDashboard />
            </main>
        </div>
    );
};

export default StudentPage;
