'use client';

import React from 'react';
import MainLayout from './MainLayout';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <MainLayout>
            {children}
        </MainLayout>
    );
};

export default DashboardLayout; 