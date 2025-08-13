'use client';

import React from 'react';
import {
    Wifi,
    Server,
    Globe,
    Home,
    ExternalLink,
    Shield,
    Zap,
    Users
} from 'lucide-react';

const ProxyServicesPage = () => {
    const proxyTypes = [
        {
            id: 1,
            title: 'Proxy IPV4 Tĩnh',
            description: 'Static IPv4 Proxy',
            icon: <Server className="w-8 h-8" />,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            link: 'https://proxy.biz.vn/?home=muaproxy'
        },
        {
            id: 2,
            title: 'Gói Proxy IPV4 Tĩnh',
            description: 'Static IPv4 Proxy Package',
            icon: <Wifi className="w-8 h-8" />,
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            link: 'https://proxy.biz.vn/?home=combo'
        },
        {
            id: 3,
            title: 'Key Proxy Xoay IPV4',
            description: 'Rotating IPv4 Proxy Key',
            icon: <Zap className="w-8 h-8" />,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200',
            link: 'https://proxy.biz.vn/?home=proxyxoay'
        },
        {
            id: 4,
            title: 'Proxy IPV6 Dân Cư Tĩnh',
            description: 'Residential IPv6 Proxy Static',
            icon: <Home className="w-8 h-8" />,
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
            link: 'https://proxy.biz.vn/?home=muaipv6'
        }
    ];

    const handleProxyClick = (link: string) => {
        window.open(link, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">Dịch Vụ Proxy</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Chọn loại proxy phù hợp với nhu cầu sử dụng của bạn.
                    Tất cả proxy đều được đảm bảo chất lượng cao và ổn định.
                </p>
            </div>

            {/* Information Banner */}
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">
                <p className="text-yellow-800 text-sm font-medium text-center">
                    💡 Hướng dẫn cài đặt proxy liên hệ Admin để được hỗ trợ
                </p>
            </div>

            {/* Proxy Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {proxyTypes.map((proxy) => (
                    <div
                        key={proxy.id}
                        onClick={() => handleProxyClick(proxy.link)}
                        className={`${proxy.bgColor} ${proxy.borderColor} border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl group`}
                    >
                        <div className="flex items-start space-x-4">
                            {/* Icon */}
                            <div className={`bg-gradient-to-r ${proxy.color} p-3 rounded-lg text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                                {proxy.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                                        {proxy.title}
                                    </h3>
                                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                </div>

                                <p className="text-gray-600 font-medium">
                                    {proxy.description}
                                </p>

                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <Shield className="w-4 h-4" />
                                    <span>Bảo mật cao</span>
                                    <span>•</span>
                                    <Users className="w-4 h-4" />
                                    <span>Hỗ trợ 24/7</span>
                                </div>
                            </div>
                        </div>

                        {/* Hover effect indicator */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">
                                    Nhấp để mua ngay
                                </span>
                                <div className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-600 group-hover:bg-gray-100 transition-colors">
                                    Mở tab mới
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Features Section */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                    Tại sao chọn dịch vụ proxy của chúng tôi?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center space-y-3">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                            <Shield className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Bảo mật tuyệt đối</h3>
                        <p className="text-sm text-gray-600">
                            Proxy được mã hóa SSL/TLS, đảm bảo dữ liệu của bạn luôn an toàn
                        </p>
                    </div>

                    <div className="text-center space-y-3">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <Zap className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Tốc độ cao</h3>
                        <p className="text-sm text-gray-600">
                            Máy chủ proxy được tối ưu hóa để đạt tốc độ truy cập nhanh nhất
                        </p>
                    </div>

                    <div className="text-center space-y-3">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                            <Users className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Hỗ trợ 24/7</h3>
                        <p className="text-sm text-gray-600">
                            Đội ngũ kỹ thuật chuyên nghiệp sẵn sàng hỗ trợ mọi lúc
                        </p>
                    </div>
                </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-center space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Cần hỗ trợ thêm?
                    </h3>
                    <p className="text-gray-600">
                        Liên hệ với chúng tôi qua Zalo hoặc email để được tư vấn chi tiết
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                        <span>📞 Hotline: 1900-xxx-xxx</span>
                        <span>•</span>
                        <span>📧 Email: support@example.com</span>
                        <span>•</span>
                        <span>💬 Zalo: @support</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProxyServicesPage; 