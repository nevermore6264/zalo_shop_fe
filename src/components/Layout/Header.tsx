'use client';

import React from 'react';
import { Menu, Bell, User, Search, Settings } from 'lucide-react';

interface HeaderProps {
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    return (
        <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 px-6 py-4 sticky top-0 z-20">
            <div className="flex items-center justify-between">
                {/* Left side */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onMenuClick}
                        className="p-2 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 group"
                    >
                        <Menu className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform duration-300" />
                    </button>

                    <div className="hidden md:block">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm dịch vụ, tài khoản..."
                                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-80 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/80"
                            />
                        </div>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center space-x-3">
                    {/* Settings */}
                    <button className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 group">
                        <Settings className="w-5 h-5 text-gray-600 group-hover:rotate-90 transition-transform duration-300" />
                    </button>

                    {/* Notifications */}
                    <button className="p-2 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 group relative">
                        <Bell className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform duration-300" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></span>
                    </button>

                    {/* User menu */}
                    <div className="flex items-center space-x-3">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-semibold text-gray-900">Admin User</div>
                            <div className="text-xs text-gray-500">admin@zaloshop.com</div>
                        </div>
                        <button className="p-2 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 group">
                            <div className="relative">
                                <User className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile search */}
            <div className="md:hidden mt-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/50 backdrop-blur-sm"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header; 