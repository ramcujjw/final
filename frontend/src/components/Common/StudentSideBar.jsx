import React from 'react';
import Sidebar from './Sidebar';

const studentItems = [
    { text: 'Dashboard', path: '/Student/dashboard' },
    { text: 'Profile', path: '/Student/profile' },
    { text: 'Subjects', path: '/Student/subjects' },
    { text: 'Attendance', path: '/Student/attendance' },
    { text: 'Scan QR Code', path: '/Student/scan-qr' },
];

const StudentSideBar = () => {
    return <Sidebar items={studentItems} />;
};

export default StudentSideBar;
