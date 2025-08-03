'use client';

import React, { useState } from 'react';
import { ShoppingCart, AlertCircle, Star, Shield, Clock, Users, CheckCircle, Zap } from 'lucide-react';

const AccountsServicesPage = () => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const zaloAccounts = [
        {
            id: 1,
            title: 'ZALO trên 1 tháng',
            description: 'Random trên 7bb có link bb đi kèm không báo xấu. random AVATAR, đầy đủ tính năng cover. Bảo hành sai pass login 1 đổi 1. Bảo hành pass 1 tháng ( hỗ trợ xt khi nick vô hiệu hóa )',
            available: 45,
            price: 450000,
            status: 'available',
            features: ['Random AVATAR', 'Đầy đủ tính năng', 'Bảo hành 1 đổi 1', 'Hỗ trợ xác thực']
        },
        {
            id: 2,
            title: '*** Bán Chạy ***',
            description: 'Zalo THU MUA NGƯỜI DÙNG THẬT - Đã Xác Minh CCCD. Không bị chặn tính năng.random bạn bè Đầy đủ thông tin, . Bảo hành sai pass, login lần đầu 1 đổi 1. Hỗ trợ gỡ xt mãi mãi ( Khuyến cáo sử dụng nick nên thay đổi mật khẩu luôn để ACC an toàn hơn)',
            available: 12,
            price: 350000,
            status: 'available',
            isHot: true,
            features: ['Người dùng thật', 'Đã xác minh CCCD', 'Không bị chặn', 'Hỗ trợ gỡ XT']
        },
        {
            id: 3,
            title: 'Zalo Vip - NICK NGƯỜI DÙNG THẬT',
            description: 'Đã Xác Thực CCCD.acc từ 1 tháng - 1 năm. Không bị chặn tính năng. RandomCó bạn bè, bài đăng. Đầy đủ thông tin. bảo hành sai pass. login lần đầu 1 đổi 1. Hỗ trợ gỡ xác thực mãi mãi, Bảo hành pass 1 tháng',
            available: 1,
            price: 550000,
            status: 'available',
            features: ['VIP Premium', '1-12 tháng', 'Có bạn bè', 'Bài đăng']
        },
        {
            id: 4,
            title: 'ZALO người dùng thật 6 tháng-3 năm',
            description: 'không báo xấu, Đăng nhập Điện Thoại. Random 20-100bb), , full tính năng , ... Bảo hành sai pass, login lỗi 1 đổi 1, Hỗ trợ định danh khi nick bị vô hiệu hoá, Bảo hành pass 1 tháng',
            available: 6,
            price: 600000,
            status: 'available',
            features: ['6 tháng - 3 năm', '20-100 bạn bè', 'Full tính năng', 'Đăng nhập điện thoại']
        },
        {
            id: 5,
            title: 'ZALO 1 - 7 ngày',
            description: 'Login bằng OTP từ Admin. Random AVATAR, đầy đủ tính năng cover. Bảo hành sai pass login 1 đổi 1. Bảo hành pass 1 tháng',
            available: 10,
            price: 180000,
            status: 'available',
            features: ['1-7 ngày', 'Login OTP', 'Random AVATAR', 'Giá rẻ']
        },
        {
            id: 6,
            title: 'ZALO người dùng thật trên 300bb',
            description: 'ACC trên 6 tháng random bài đăng, đầy đủ thông tin. bảo hành sai pass login, hỗ trợ xác thực khi nick vô hiệu hóa',
            available: 0,
            price: 700000,
            status: 'out_of_stock',
            features: ['Trên 300 bạn bè', '6+ tháng', 'Bài đăng', 'Cao cấp']
        }
    ];

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 rounded-2xl p-8 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-center space-y-4">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <span className="text-white font-bold text-xl">Z</span>
                        </div>
                        <h1 className="text-4xl font-bold">Mua Tài Khoản Zalo</h1>
                    </div>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Chọn tài khoản Zalo chất lượng cao với bảo hành 1 đổi 1.
                        Tất cả tài khoản đều được xác minh và hỗ trợ 24/7.
                    </p>
                </div>

                {/* Floating elements */}
                <div className="absolute top-4 left-4 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
            </div>

            {/* Warning Banner */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-1">Lưu ý quan trọng</h3>
                        <p className="text-white/90">
                            Đối với nick không có bạn bè, khách hàng cần kết bạn tối thiểu 10 bạn bè để Admin có thể hỗ trợ XÁC THỰC
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">6</p>
                            <p className="text-sm text-gray-600">Loại tài khoản</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">100%</p>
                            <p className="text-sm text-gray-600">Tài khoản thật</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Shield className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">1:1</p>
                            <p className="text-sm text-gray-600">Bảo hành</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <Clock className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">24/7</p>
                            <p className="text-sm text-gray-600">Hỗ trợ</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Accounts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {zaloAccounts.map((account) => (
                    <div
                        key={account.id}
                        className={`relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${hoveredCard === account.id ? 'ring-2 ring-blue-500' : ''
                            }`}
                        onMouseEnter={() => setHoveredCard(account.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        {/* Hot Badge */}
                        {account.isHot && (
                            <div className="absolute top-4 right-4 z-10">
                                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                                    <Star className="w-4 h-4" />
                                    <span>Bán Chạy</span>
                                </div>
                            </div>
                        )}

                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/10"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                            <span className="text-white font-bold text-lg">Z</span>
                                        </div>
                                        <h3 className="text-xl font-bold">{account.title}</h3>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold">{account.price.toLocaleString()}₫</div>
                                        <div className="text-blue-200 text-sm">Giá</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                            {/* Description */}
                            <p className="text-gray-700 leading-relaxed">{account.description}</p>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-2">
                                {account.features.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-2 text-sm">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-gray-600">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Status and Action */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${account.status === 'out_of_stock'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-green-100 text-green-800'
                                        }`}>
                                        {account.status === 'out_of_stock'
                                            ? 'HẾT HÀNG'
                                            : `Còn lại: ${account.available}`
                                        }
                                    </div>
                                </div>

                                <button
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${account.status === 'out_of_stock'
                                            ? 'bg-gray-400 text-white cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-lg transform hover:scale-105'
                                        }`}
                                    disabled={account.status === 'out_of_stock'}
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    <span>
                                        {account.status === 'out_of_stock' ? 'HẾT HÀNG' : 'MUA NGAY'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Hover Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 ${hoveredCard === account.id ? 'opacity-100' : ''
                            }`}></div>
                    </div>
                ))}
            </div>

            {/* Features Section */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Tại sao chọn chúng tôi?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Chúng tôi cam kết cung cấp dịch vụ chất lượng cao với sự hỗ trợ tận tâm
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center group">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Tài khoản thật 100%</h3>
                        <p className="text-gray-600">Tất cả tài khoản đều là người dùng thật, đã xác minh CCCD</p>
                    </div>

                    <div className="text-center group">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Bảo hành 1 đổi 1</h3>
                        <p className="text-gray-600">Bảo hành sai pass, login lỗi 1 đổi 1 ngay lập tức</p>
                    </div>

                    <div className="text-center group">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Hỗ trợ 24/7</h3>
                        <p className="text-gray-600">Hỗ trợ gỡ xác thực, định danh khi cần thiết</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountsServicesPage; 