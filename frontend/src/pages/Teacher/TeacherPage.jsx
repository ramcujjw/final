import React from 'react';
import Navbar from '../../components/Common/Navbar';
import Sidebar from '../../components/Common/Sidebar';
import TeacherDashboard from '../../components/Teacher/TeacherDashboard';

const teacherItems = [
    { text: 'Dashboard', path: '/teacher-dashboard' },
    // Add more links as necessary
];

const TeacherPage = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Navbar />
            <Sidebar items={teacherItems} />
            <main style={{ marginLeft: 240, padding: '1rem', flexGrow: 1 }}>
                <TeacherDashboard />
            </main>
        </div>
    );
};

export default TeacherPage;
