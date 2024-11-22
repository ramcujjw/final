import React from 'react';
import Sidebar from './Sidebar';

const teacherItems = [
    { text: 'Dashboard', path: '/Teacher/dashboard' },
    { text: 'Profile', path: '/Teacher/profile' },
    { text: 'Class Details', path: '/Teacher/class' },
    { text: 'Generate QR Code', path: '/Teacher/generate-qr' },
];

const TeacherSideBar = () => {
    return <Sidebar items={teacherItems} />;
};

export default TeacherSideBar;
