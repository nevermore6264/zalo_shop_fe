'use client';
import React, { useState } from 'react';
import {
    Package,
    Search,
    Download,
    Plus,
    Edit,
    Trash,
    Eye,
    Settings,
    DollarSign,
    Star,
    TrendingUp,
    MoreHorizontal,
    CheckCircle,
    XCircle,
    Clock
} from 'lucide-react';

const AdminServicesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    // Mock data for services
    const services = [
        {
            id: 1,
            name: 'Proxy Tĩnh - Gói A',
            category: 'proxy',
            description: 'Proxy tĩnh chất lượng cao cho dự án marketing',
            price: 500000,
            originalPrice: 600000,
            status: 'active',
            stock: 50,
            sold: 25,
            rating: 4.8,
            orders: 120,
            features: ['Tốc độ cao', 'Ổn định', 'Hỗ trợ 24/7'],
            image: '/proxy-icon.png'
        },
        {
            id: 2,
            name: 'Proxy Động - Gói B',
            category: 'proxy',
            description: 'Proxy động tự động thay đổi IP',
            price: 800000,
            originalPrice: 1000000,
            status: 'active',
            stock: 30,
            sold: 15,
            rating: 4.6,
            orders: 85,
            features: ['Tự động thay IP', 'Không giới hạn', 'API support'],
            image: '/proxy-dynamic-icon.png'
        },
        {
            id: 3,
            name: 'Zalo Like - 1000 likes',
            category: 'zalo',
            description: 'Tăng like cho bài viết Zalo',
            price: 200000,
            originalPrice: 250000,
            status: 'active',
            stock: 100,
            sold: 75,
            rating: 4.9,
            orders: 200,
            features: ['Like thật', 'Tốc độ nhanh', 'An toàn'],
            image: '/zalo-like-icon.png'
        },
        {
            id: 4,
            name: 'Zalo Comment - 500 comments',
            category: 'zalo',
            description: 'Tăng comment cho bài viết Zalo',
            price: 300000,
            originalPrice: 350000,
            status: 'inactive',
            stock: 0,
            sold: 50,
            rating: 4.7,
            orders: 150,
            features: ['Comment tự nhiên', 'Đa dạng nội dung', 'Không spam'],
            image: '/zalo-comment-icon.png'
        },
        {
            id: 5,
            name: 'Tài khoản Zalo - Premium',
            category: 'accounts',
            description: 'Tài khoản Zalo premium cho business',
            price: 1200000,
            originalPrice: 1500000,
            status: 'active',
            stock: 10,
            sold: 8,
            rating: 4.5,
            orders: 45,
            features: ['Tài khoản thật', 'Bảo hành 1 đổi 1', 'Hỗ trợ 24/7'],
            image: '/zalo-account-icon.png'
        },
        {
            id: 6,
            name: 'Zalo OA - Official Account',
            category: 'accounts',
            description: 'Tài khoản Zalo Official Account',
            price: 2000000,
            originalPrice: 2500000,
            status: 'active',
            stock: 5,
            sold: 3,
            rating: 4.3,
            orders: 20,
            features: ['OA verified', 'Không giới hạn', 'API access'],
            image: '/zalo-oa-icon.png'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'inactive': return 'bg-gray-100 text-gray-800';
            case 'draft': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <CheckCircle className="w-4 h-4" />;
            case 'inactive': return <XCircle className="w-4 h-4" />;
            case 'draft': return <Clock className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'proxy': return 'bg-blue-100 text-blue-800';
            case 'zalo': return 'bg-purple-100 text-purple-800';
            case 'accounts': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const filteredServices = services.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' || service.status === statusFilter;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    const totalServices = services.length;
    const activeServices = services.filter(s => s.status === 'active').length;
    const totalRevenue = services.reduce((sum, s) => sum + (s.price * s.sold), 0);
    const totalOrders = services.reduce((sum, s) => sum + s.orders, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản Lý Dịch Vụ</h1>
                    <p className="text-gray-600 mt-1">Quản lý danh mục dịch vụ và cấu hình giá cả</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Package className="w-6 h-6 text-red-500" />
                    <span className="text-sm text-gray-500">Service Management</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Tổng dịch vụ</p>
                            <p className="text-3xl font-bold text-gray-900">{totalServices}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Package className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Đang hoạt động</p>
                            <p className="text-3xl font-bold text-gray-900">{activeServices}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Tổng doanh thu</p>
                            <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Tổng đơn hàng</p>
                            <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="card">
                <div className="card-body">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="flex flex-col sm:flex-row gap-4 flex-1">
                            <div className="flex-1">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm dịch vụ..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="input pl-10 w-full"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="input"
                                >
                                    <option value="all">Tất cả danh mục</option>
                                    <option value="proxy">Proxy</option>
                                    <option value="zalo">Zalo</option>
                                    <option value="accounts">Tài khoản</option>
                                </select>

                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="input"
                                >
                                    <option value="all">Tất cả trạng thái</option>
                                    <option value="active">Đang hoạt động</option>
                                    <option value="inactive">Không hoạt động</option>
                                    <option value="draft">Bản nháp</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="btn btn-outline btn-sm">
                                <Download className="w-4 h-4 mr-2" />
                                Xuất Excel
                            </button>
                            <button className="btn btn-primary btn-sm bg-red-600 hover:bg-red-700 text-white">
                                <Plus className="w-4 h-4 mr-2" />
                                Thêm dịch vụ
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                    <div key={service.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        {/* Service Header */}
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                                    <p className="text-sm text-gray-600 mb-3">{service.description}</p>

                                    <div className="flex items-center space-x-4 mb-3">
                                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(service.category)}`}>
                                            {service.category === 'proxy' ? 'Proxy' :
                                                service.category === 'zalo' ? 'Zalo' : 'Tài khoản'}
                                        </span>
                                        <div className="flex items-center">
                                            {getStatusIcon(service.status)}
                                            <span className={`ml-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(service.status)}`}>
                                                {service.status === 'active' ? 'Hoạt động' :
                                                    service.status === 'inactive' ? 'Không hoạt động' : 'Bản nháp'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-2xl font-bold text-gray-900">{formatCurrency(service.price)}</span>
                                    {service.originalPrice > service.price && (
                                        <span className="ml-2 text-sm text-gray-500 line-through">
                                            {formatCurrency(service.originalPrice)}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                    {service.rating}
                                </div>
                            </div>
                        </div>

                        {/* Service Stats */}
                        <div className="p-6 border-b border-gray-100">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-lg font-semibold text-gray-900">{service.stock}</div>
                                    <div className="text-xs text-gray-600">Tồn kho</div>
                                </div>
                                <div>
                                    <div className="text-lg font-semibold text-gray-900">{service.sold}</div>
                                    <div className="text-xs text-gray-600">Đã bán</div>
                                </div>
                                <div>
                                    <div className="text-lg font-semibold text-gray-900">{service.orders}</div>
                                    <div className="text-xs text-gray-600">Đơn hàng</div>
                                </div>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="p-6 border-b border-gray-100">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Tính năng:</h4>
                            <div className="space-y-1">
                                {service.features.map((feature, index) => (
                                    <div key={index} className="flex items-center text-sm text-gray-600">
                                        <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1">
                                    <button className="p-2 hover:bg-blue-50 rounded-md transition-colors" title="Xem chi tiết">
                                        <Eye className="w-4 h-4 text-blue-600" />
                                    </button>
                                    <button className="p-2 hover:bg-green-50 rounded-md transition-colors" title="Chỉnh sửa">
                                        <Edit className="w-4 h-4 text-green-600" />
                                    </button>
                                    <button className="p-2 hover:bg-purple-50 rounded-md transition-colors" title="Cài đặt">
                                        <Settings className="w-4 h-4 text-purple-600" />
                                    </button>
                                    <button className="p-2 hover:bg-red-50 rounded-md transition-colors" title="Xóa">
                                        <Trash className="w-4 h-4 text-red-600" />
                                    </button>
                                </div>
                                <button className="p-2 hover:bg-gray-50 rounded-md transition-colors" title="Thêm tùy chọn">
                                    <MoreHorizontal className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">{filteredServices.length}</span> trong tổng số <span className="font-medium">{services.length}</span> dịch vụ
                </div>
                <div className="flex items-center space-x-2">
                    <button className="btn btn-outline btn-sm">Trước</button>
                    <button className="btn btn-primary btn-sm bg-red-600 hover:bg-red-700 text-white">1</button>
                    <button className="btn btn-outline btn-sm">Sau</button>
                </div>
            </div>
        </div>
    );
};

export default AdminServicesPage; 