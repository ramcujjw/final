import React from 'react';
import Sidebar from './Sidebar';

const adminItems = [
    { text: 'Dashboard', path: '/Admin/dashboard' },
    { text: 'Profile', path: '/Admin/profile' },
    { text: 'Classes', path: '/Admin/classes' },
    { text: 'Students', path: '/Admin/students' },
    { text: 'Subjects', path: '/Admin/subjects' },
    { text: 'Teachers', path: '/Admin/teachers' },
];

const AdminSideBar = () => {
    return <Sidebar items={adminItems} />;
};

export default AdminSideBar;
