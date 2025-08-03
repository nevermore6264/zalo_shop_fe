'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    ShoppingCart,
    CreditCard,
    RefreshCw,
    Building2,
    FileText,
    HelpCircle,
    MessageCircle
} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    const pathname = usePathname();

    const menuItems = [
        // Services Section
        {
            title: 'Dịch Vụ Zalo',
            href: '/services/zalo',
            icon: ShoppingCart,
        },
        {
            title: 'Mua Tài Khoản',
            href: '/services/accounts',
            icon: ShoppingCart,
        },
        {
            title: 'Mua Proxy',
            href: '/services/proxy',
            icon: ShoppingCart,
        },
        {
            title: 'Lịch Sử Mua Hàng',
            href: '/purchase-history',
            icon: RefreshCw,
        },
        {
            title: 'Danh Sách Proxy',
            href: '/proxy-list',
            icon: RefreshCw,
        },

        // Recharge Section
        {
            title: 'NẠP TIỀN',
            href: '#',
            icon: null,
            isHeader: true,
        },
        {
            title: 'Nạp Tiền',
            href: '/recharge',
            icon: Building2,
        },
        {
            title: 'Hóa Đơn',
            href: '/invoices',
            icon: FileText,
        },

        // Other Section
        {
            title: 'KHÁC',
            href: '#',
            icon: null,
            isHeader: true,
        },
        {
            title: 'Hướng Dẫn Dùng Zalo',
            href: '/guide',
            icon: HelpCircle,
        },
        {
            title: 'Liên Hệ',
            href: '/contact',
            icon: MessageCircle,
        },
    ];

    return (
        <aside className={`
      fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      w-72 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 text-white shadow-2xl
      border-r border-blue-500/20 backdrop-blur-sm
    `}>
            {/* Logo Section */}
            <div className="flex items-center justify-center h-20 border-b border-blue-500/30 bg-gradient-to-r from-blue-600/50 to-blue-700/50">
                <div className="relative">
                    {/* Outer glow effect */}
                    <div className="absolute inset-0 bg-orange-400 rounded-full blur-lg opacity-30 animate-pulse"></div>

                    {/* Logo container */}
                    <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-orange-300">
                        <div className="relative w-8 h-8">
                            {/* Z Logo with gradient */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-sm transform rotate-45 shadow-md"></div>
                                <div className="absolute w-4 h-4 bg-gradient-to-br from-orange-400 to-orange-500 rounded-sm transform rotate-45 shadow-md"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="mt-8 px-6 pb-6 h-[calc(100vh-5rem)] overflow-y-auto">
                <ul className="space-y-3">
                    {menuItems.map((item, index) => {
                        if (item.isHeader) {
                            return (
                                <li key={index} className="mt-8 mb-4">
                                    <div className="text-xs font-bold text-blue-200 uppercase tracking-wider px-4 py-2 bg-blue-500/20 rounded-lg border border-blue-400/30">
                                        {item.title}
                                    </div>
                                </li>
                            );
                        }

                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    className={`
                    group flex items-center px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden
                    ${isActive
                                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 transform scale-105'
                                            : 'text-blue-100 hover:bg-gradient-to-r hover:from-blue-500/50 hover:to-blue-600/50 hover:text-white hover:shadow-md hover:transform hover:scale-105'
                                        }
                  `}
                                >
                                    {/* Active indicator */}
                                    {isActive && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
                                    )}

                                    {/* Hover effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Content */}
                                    <div className="relative flex items-center w-full">
                                        {Icon && (
                                            <div className={`
                        p-2 rounded-lg mr-3 transition-all duration-300
                        ${isActive
                                                    ? 'bg-white/20 shadow-md'
                                                    : 'bg-blue-500/20 group-hover:bg-white/20 group-hover:shadow-md'
                                                }
                      `}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                        )}
                                        <span className="text-sm font-medium">{item.title}</span>

                                        {/* Arrow indicator for active */}
                                        {isActive && (
                                            <div className="ml-auto">
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Bottom section */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-500/30 bg-gradient-to-r from-blue-700/50 to-blue-800/50">
                <div className="flex items-center justify-between">
                    <div className="text-xs text-blue-300 opacity-60">
                        Zalo Shop v1.0
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* Custom scrollbar */}
            <style jsx>{`
        nav::-webkit-scrollbar {
          width: 4px;
        }
        nav::-webkit-scrollbar-track {
          background: rgba(59, 130, 246, 0.1);
          border-radius: 2px;
        }
        nav::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 2px;
        }
        nav::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
      `}</style>
        </aside>
    );
};

export default Sidebar; 