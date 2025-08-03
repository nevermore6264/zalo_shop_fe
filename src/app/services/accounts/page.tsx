import React from 'react';
import { User, Shield, Clock, CheckCircle } from 'lucide-react';

const AccountsPage = () => {
    const accountTypes = [
        {
            id: 1,
            name: 'Tài Khoản Zalo Cơ Bản',
            description: 'Tài khoản Zalo mới, chưa có thông tin cá nhân',
            price: '100.000 VNĐ',
            features: [
                'Tài khoản mới 100%',
                'Chưa có thông tin cá nhân',
                'Có thể thay đổi mật khẩu',
                'Hỗ trợ 7 ngày'
            ],
            icon: User,
            popular: false,
        },
        {
            id: 2,
            name: 'Tài Khoản Zalo Premium',
            description: 'Tài khoản Zalo có sẵn followers và tương tác',
            price: '250.000 VNĐ',
            features: [
                'Tài khoản có sẵn followers',
                'Có lịch sử tương tác',
                'Avatar và thông tin đầy đủ',
                'Hỗ trợ 30 ngày',
                'Bảo hành 1 đổi 1'
            ],
            icon: Shield,
            popular: true,
        },
        {
            id: 3,
            name: 'Tài Khoản Zalo VIP',
            description: 'Tài khoản Zalo cao cấp với nhiều tính năng',
            price: '500.000 VNĐ',
            features: [
                'Tài khoản VIP với nhiều followers',
                'Có lịch sử hoạt động lâu năm',
                'Tích hợp đầy đủ tính năng',
                'Hỗ trợ trọn đời',
                'Bảo hành vĩnh viễn',
                'Tư vấn 24/7'
            ],
            icon: CheckCircle,
            popular: false,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Mua Tài Khoản</h1>
                    <p className="text-gray-600 mt-1">Các loại tài khoản Zalo chất lượng cao</p>
                </div>
                <div className="flex items-center space-x-2">
                    <User className="w-6 h-6 text-orange-500" />
                    <span className="text-sm text-gray-500">Tài khoản</span>
                </div>
            </div>

            {/* Account Types */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accountTypes.map((account) => (
                    <div key={account.id} className="relative">
                        {account.popular && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                    Phổ biến
                                </span>
                            </div>
                        )}

                        <div className="card hover:scale-105 transition-transform duration-200 h-full">
                            <div className="card-body">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <account.icon className="w-6 h-6 text-orange-600" />
                                    </div>
                                    {account.popular && (
                                        <div className="text-orange-500 font-semibold">★</div>
                                    )}
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {account.name}
                                </h3>

                                <p className="text-gray-600 text-sm mb-4">
                                    {account.description}
                                </p>

                                <div className="text-2xl font-bold text-orange-600 mb-4">
                                    {account.price}
                                </div>

                                <ul className="space-y-2 mb-6">
                                    {account.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-sm text-gray-600">
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button className="btn btn-primary w-full">
                                    Mua Ngay
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Information */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Thông tin quan trọng</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Shield className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Bảo mật</h3>
                                <p className="text-sm text-gray-600">Tài khoản được bảo mật tuyệt đối, không lưu trữ thông tin cá nhân</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Clock className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Giao hàng</h3>
                                <p className="text-sm text-gray-600">Nhận tài khoản ngay sau khi thanh toán thành công</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Chất lượng</h3>
                                <p className="text-sm text-gray-600">Tất cả tài khoản đều được kiểm tra chất lượng trước khi giao</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <User className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Hỗ trợ</h3>
                                <p className="text-sm text-gray-600">Hỗ trợ khách hàng 24/7 qua Zalo, Telegram</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountsPage; 