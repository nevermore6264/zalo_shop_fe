'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    Users,
    ShoppingCart,
    Settings,
    BarChart3,
    Server,
    DollarSign,
    Package,
    MessageCircle,
    Bell,
    LogOut,
    User,
    Cog
} from 'lucide-react';

interface AdminSidebarProps {
    isOpen: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen }) => {
    const pathname = usePathname();

    const adminMenuItems = [
        // Dashboard Section
        {
            title: 'Dashboard',
            href: '/admin',
            icon: Home,
        },

        // Management Section
        {
            title: 'QUẢN LÝ',
            href: '#',
            icon: null,
            isHeader: true,
        },
        {
            title: 'Quản lý người dùng',
            href: '/admin/users',
            icon: Users,
        },
        {
            title: 'Quản lý đơn hàng',
            href: '/admin/orders',
            icon: ShoppingCart,
        },
        {
            title: 'Quản lý dịch vụ',
            href: '/admin/services',
            icon: Package,
        },
        {
            title: 'Quản lý proxy',
            href: '/admin/proxies',
            icon: Server,
        },

        // Analytics Section
        {
            title: 'THỐNG KÊ',
            href: '#',
            icon: null,
            isHeader: true,
        },
        {
            title: 'Báo cáo doanh thu',
            href: '/admin/revenue',
            icon: DollarSign,
        },
        {
            title: 'Thống kê người dùng',
            href: '/admin/user-stats',
            icon: BarChart3,
        },
        // Support Section
        {
            title: 'HỖ TRỢ',
            href: '#',
            icon: null,
            isHeader: true,
        },
        {
            title: 'Quản lý liên hệ',
            href: '/admin/contact',
            icon: MessageCircle,
        },
    ];

    return (
        <aside className={`
            fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            w-72 bg-gradient-to-b from-red-600 via-red-700 to-red-800 text-white shadow-2xl
            border-r border-red-500/20 backdrop-blur-sm
        `}>
            {/* Logo Section */}
            <div className="flex items-center justify-center h-20 border-b border-red-500/30 bg-gradient-to-r from-red-600/50 to-red-700/50">
                <div className="relative">
                    {/* Outer glow effect */}
                    <div className="absolute inset-0 bg-orange-400 rounded-full blur-lg opacity-30 animate-pulse"></div>

                    {/* Logo container */}
                    <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-orange-300">
                        <div className="relative w-8 h-8">
                            {/* Z Logo with gradient */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-6 h-6 bg-gradient-to-br from-red-600 to-red-700 rounded-sm transform rotate-45 shadow-md"></div>
                                <div className="absolute w-4 h-4 bg-gradient-to-br from-orange-400 to-orange-500 rounded-sm transform rotate-45 shadow-md"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ml-3">
                    <h1 className="text-xl font-bold text-white">Zalo Shop</h1>
                    <p className="text-xs text-red-200">Admin Panel</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {adminMenuItems.map((item, index) => {
                    const isActive = pathname === item.href;

                    if (item.isHeader) {
                        return (
                            <div key={index} className="pt-4 pb-2">
                                <h3 className="text-xs font-semibold text-red-200 uppercase tracking-wider">
                                    {item.title}
                                </h3>
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={index}
                            href={item.href}
                            className={`
                                flex items-center px-4 py-3 rounded-lg transition-all duration-200 group relative
                                ${isActive
                                    ? 'bg-white/20 text-white shadow-md'
                                    : 'text-red-100 hover:bg-white/10 hover:text-white'
                                }
                            `}
                        >
                            {item.icon && (
                                <item.icon className={`w-5 h-5 mr-3 transition-colors duration-200 ${isActive ? 'text-white' : 'text-red-200 group-hover:text-white'
                                    }`} />
                            )}
                            <span className="font-medium">{item.title}</span>

                            {isActive && (
                                <div className="ml-auto">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Admin Info */}
            <div className="p-4 border-t border-red-500/30">
                <div className="flex items-center space-x-3 p-3 bg-red-500/20 rounded-lg">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-white">Admin User</p>
                        <p className="text-xs text-red-200">admin@zaloshop.com</p>
                    </div>
                    <button className="p-1 hover:bg-white/10 rounded transition-colors">
                        <LogOut className="w-4 h-4 text-red-200" />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar; 