import React from 'react';
import { Grid } from '@mui/material';
import Navbar from '../../components/Common/Navbar';
import Sidebar from '../../components/Common/Sidebar';
import AdminDashboard from '../../components/Admin/AdminDashboard';

const adminItems = [
    { text: 'Dashboard', path: '/admin-dashboard' },
    { text: 'Add Student', path: '/admin/add-student' },
    { text: 'Add Teacher', path: '/admin/add-teacher' },
    { text: 'Add Class', path: '/admin/add-class' }
];

const AdminPage = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Navbar />
            <Sidebar items={adminItems} />
            <main style={{ marginLeft: 240, padding: '1rem', flexGrow: 1 }}>
                <AdminDashboard />
            </main>
        </div>
    );
};

export default AdminPage;
