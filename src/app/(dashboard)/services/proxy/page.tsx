'use client';

import React, { useState } from 'react';
import {
    Check,
    ShoppingCart,
    Clock,
    Wifi,
    Server,
    Home,
    Building
} from 'lucide-react';

const ProxyServicesPage = () => {
    const [activeTab, setActiveTab] = useState<'dynamic' | 'static'>('dynamic');

    // Dynamic proxy plans
    const dynamicPlans = [
        {
            id: 1,
            title: 'Min 1 phút',
            price: 10000,
            features: [
                'Hỗ trợ HTTP/SOCKS5',
                'Qua 1 phút được đổi IP khác',
                '1 IP sống được 30 phút',
                'Đổi IP không giới hạn',
                'Sử dụng số lượng có thương lượng giá'
            ]
        },
        {
            id: 2,
            title: 'Min 2 phút',
            price: 8000,
            features: [
                'Hỗ trợ HTTP/SOCKS5',
                'Qua 2 phút được đổi IP khác',
                '1 IP sống được 30 phút',
                'Đổi IP không giới hạn',
                'Sử dụng số lượng có thương lượng giá'
            ]
        },
        {
            id: 3,
            title: 'Min 4 phút',
            price: 6000,
            features: [
                'Hỗ trợ HTTP/SOCKS5',
                'Qua 4 phút được đổi IP khác',
                '1 IP sống được 30 phút',
                'Đổi IP không giới hạn',
                'Sử dụng số lượng có thương lượng giá'
            ]
        },
        {
            id: 4,
            title: 'Giữ IP lâu',
            price: 13000,
            features: [
                'Hỗ trợ HTTP/SOCKS5',
                'Qua 4 phút được đổi IP khác',
                'Không giới hạn thời gian',
                'Đổi IP không giới hạn',
                'Sử dụng số lượng có thương lượng giá'
            ]
        },
        {
            id: 5,
            title: 'Vip 30 giây',
            price: 20000,
            features: [
                'Hỗ trợ HTTP/SOCKS5',
                'Qua 30 giây được đổi IP khác',
                '1 IP sống được 30 phút',
                'Đổi IP không giới hạn',
                'Sử dụng số lượng có thương lượng giá'
            ]
        }
    ];

    // Static proxy plans
    const staticPlans = [
        {
            id: 1,
            title: 'Dân cư',
            subtitle: 'Viettel, FPT, VNPT',
            price: 1000,
            features: [
                'Proxy dân cư ipv4 Việt Nam tĩnh',
                'Nói không với cheat độ ổn định cao',
                'Không giới hạn dung lượng sử dụng',
                'Đã ký hợp đồng dài hạn với Viettel, VNPT, FPT',
                'Thời gian mua càng lâu giá càng rẻ có gia hạn'
            ]
        },
        {
            id: 2,
            title: 'Datacenter',
            subtitle: 'Việt Nam',
            price: 1000,
            features: [
                'Proxy dân cư ipv4 Việt Nam tĩnh',
                'Nói không với cheat độ ổn định cao',
                'Không giới hạn dung lượng sử dụng',
                'Đã ký hợp đồng dài hạn với Viettel, VNPT, FPT',
                'Thời gian mua càng lâu giá càng rẻ có gia hạn'
            ]
        }
    ];

    const currentPlans = activeTab === 'dynamic' ? dynamicPlans : staticPlans;

    return (
        <div className="space-y-6">
            {/* Information Banner */}
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">
                <p className="text-yellow-800 text-sm font-medium">
                    Hướng dẫn cài đặt proxy liên hệ Admin
                </p>
            </div>

            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">Mua Proxy</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Chọn loại proxy phù hợp với nhu cầu sử dụng của bạn.
                    Hỗ trợ cả proxy động và proxy tĩnh với chất lượng cao.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center">
                <div className="bg-gray-100 rounded-lg p-1">
                    <div className="flex space-x-1">
                        <button
                            onClick={() => setActiveTab('dynamic')}
                            className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 ${activeTab === 'dynamic'
                                    ? 'bg-white text-blue-600 shadow-md'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Clock className="w-5 h-5" />
                            <span>Mua Proxy Động</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('static')}
                            className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 ${activeTab === 'static'
                                    ? 'bg-white text-blue-600 shadow-md'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Server className="w-5 h-5" />
                            <span>Mua Proxy Tĩnh</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Plans Grid */}
            <div className={`grid gap-6 ${activeTab === 'dynamic'
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
                    : 'grid-cols-1 md:grid-cols-2'
                }`}>
                {currentPlans.map((plan) => (
                    <div key={plan.id} className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="card-body text-center space-y-6">
                            {/* Plan Title */}
                            <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                                    {activeTab === 'dynamic' ? (
                                        <Clock className="w-8 h-8 text-white" />
                                    ) : (
                                        <Home className="w-8 h-8 text-white" />
                                    )}
                                </div>
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-white px-3 py-1 rounded-full shadow-md border border-gray-200">
                                        <span className="text-sm font-bold text-gray-800">{plan.title}</span>
                                    </div>
                                </div>
                            </div>
                            {/* Subtitle for static plans */}
                            {activeTab === 'static' && 'subtitle' in plan && (
                                <div className="text-sm text-gray-600 font-medium">
                                    {String(plan.subtitle)}
                                </div>
                            )}

                            {/* Features */}
                            <div className="space-y-3">
                                {plan.features.map((feature, index) => (
                                    <div key={index} className="flex items-start space-x-2 text-left">
                                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Price */}
                            <div className="border-t border-gray-200 pt-4">
                                <div className="text-3xl font-bold text-blue-600">
                                    {plan.price.toLocaleString()} VNĐ
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                    {activeTab === 'dynamic' ? 'mỗi tháng' : 'mỗi IP'}
                                </div>
                            </div>

                            {/* Buy Button */}
                            <button className="btn btn-primary w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105">
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Mua Ngay
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Wifi className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Hỗ trợ 24/7</h3>
                        <p className="text-sm text-gray-600">Đội ngũ hỗ trợ kỹ thuật chuyên nghiệp</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Check className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Chất lượng cao</h3>
                        <p className="text-sm text-gray-600">Proxy ổn định, tốc độ nhanh</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Building className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Đối tác uy tín</h3>
                        <p className="text-sm text-gray-600">Hợp tác với các nhà mạng lớn</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProxyServicesPage; 