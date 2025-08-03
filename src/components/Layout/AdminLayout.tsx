'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import Header from './Header';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) {
                setSidebarOpen(true);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
                  {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} />

            {/* Main Content */}
            <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen && !isMobile ? 'lg:ml-72' : 'ml-0'}`}>
                {/* Header */}
                <Header onMenuClick={toggleSidebar} />

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6 transition-all duration-300">
                    <div className="container mx-auto max-w-7xl">
                        <div className="animate-fade-in">
                            {children}
                        </div>
                    </div>
                </main>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && isMobile && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminLayout; 