import React from 'react';
import { Package, Users, Clock, Star } from 'lucide-react';

const ZaloServicesPage = () => {
    const services = [
        {
            id: 1,
            name: 'Tăng Followers Zalo',
            description: 'Tăng số lượng followers cho tài khoản Zalo của bạn',
            price: '50.000 VNĐ',
            duration: '24 giờ',
            rating: 4.8,
            icon: Users,
        },
        {
            id: 2,
            name: 'Tăng Views Story',
            description: 'Tăng lượt xem cho story Zalo',
            price: '30.000 VNĐ',
            duration: '12 giờ',
            rating: 4.6,
            icon: Clock,
        },
        {
            id: 3,
            name: 'Tăng Likes Post',
            description: 'Tăng lượt thích cho bài đăng Zalo',
            price: '25.000 VNĐ',
            duration: '6 giờ',
            rating: 4.7,
            icon: Star,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dịch Vụ Zalo</h1>
                    <p className="text-gray-600 mt-1">Các dịch vụ tăng tương tác Zalo uy tín</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Package className="w-6 h-6 text-orange-500" />
                    <span className="text-sm text-gray-500">Dịch vụ</span>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div key={service.id} className="card hover:scale-105 transition-transform duration-200">
                        <div className="card-body">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <service.icon className="w-6 h-6 text-orange-600" />
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-sm font-medium">{service.rating}</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {service.name}
                            </h3>

                            <p className="text-gray-600 text-sm mb-4">
                                {service.description}
                            </p>

                            <div className="flex items-center justify-between mb-4">
                                <div className="text-2xl font-bold text-orange-600">
                                    {service.price}
                                </div>
                                <div className="text-sm text-gray-500">
                                    Thời gian: {service.duration}
                                </div>
                            </div>

                            <button className="btn btn-primary w-full">
                                Mua Ngay
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tại sao chọn chúng tôi?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-start space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <Clock className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Giao hàng nhanh</h3>
                            <p className="text-sm text-gray-600">Hoàn thành trong 24 giờ</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Uy tín</h3>
                            <p className="text-sm text-gray-600">Hơn 10.000 khách hàng tin tưởng</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Star className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Chất lượng</h3>
                            <p className="text-sm text-gray-600">Đánh giá 4.8/5 sao</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ZaloServicesPage; 