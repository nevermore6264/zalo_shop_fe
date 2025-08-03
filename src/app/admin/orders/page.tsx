'use client';
import React, { useState } from 'react';
import {
    ShoppingCart,
    Search,
    Filter,
    Download,
    Eye,
    Edit,
    Trash,
    CheckCircle,
    XCircle,
    Clock,
    AlertTriangle,
    Package,
    User,
    Calendar,
    DollarSign,
    MoreHorizontal
} from 'lucide-react';

const AdminOrdersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');

    // Mock data for orders
    const orders = [
        {
            id: 'ORD-001',
            customer: {
                name: 'Nguyễn Văn A',
                email: 'nguyenvana@email.com',
                phone: '0123456789'
            },
            service: 'Proxy Tĩnh - Gói A',
            amount: 500000,
            status: 'completed',
            paymentMethod: 'Bank Transfer',
            orderDate: '2024-01-20 14:30',
            completedDate: '2024-01-20 15:00',
            description: 'Proxy tĩnh cho dự án marketing'
        },
        {
            id: 'ORD-002',
            customer: {
                name: 'Trần Thị B',
                email: 'tranthib@email.com',
                phone: '0987654321'
            },
            service: 'Zalo Like - 1000 likes',
            amount: 200000,
            status: 'pending',
            paymentMethod: 'Momo',
            orderDate: '2024-01-20 16:45',
            completedDate: null,
            description: 'Tăng like cho bài viết Zalo'
        },
        {
            id: 'ORD-003',
            customer: {
                name: 'Lê Văn C',
                email: 'levanc@email.com',
                phone: '0369852147'
            },
            service: 'Proxy Động - Gói B',
            amount: 800000,
            status: 'processing',
            paymentMethod: 'Credit Card',
            orderDate: '2024-01-20 10:15',
            completedDate: null,
            description: 'Proxy động cho automation'
        },
        {
            id: 'ORD-004',
            customer: {
                name: 'Phạm Thị D',
                email: 'phamthid@email.com',
                phone: '0521478963'
            },
            service: 'Zalo Comment - 500 comments',
            amount: 300000,
            status: 'cancelled',
            paymentMethod: 'Bank Transfer',
            orderDate: '2024-01-19 09:30',
            completedDate: null,
            description: 'Tăng comment cho sản phẩm'
        },
        {
            id: 'ORD-005',
            customer: {
                name: 'Hoàng Văn E',
                email: 'hoangvane@email.com',
                phone: '0741236985'
            },
            service: 'Tài khoản Zalo - Premium',
            amount: 1200000,
            status: 'completed',
            paymentMethod: 'Momo',
            orderDate: '2024-01-19 11:20',
            completedDate: '2024-01-19 12:00',
            description: 'Tài khoản Zalo premium cho business'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'processing': return <Package className="w-4 h-4" />;
            case 'cancelled': return <XCircle className="w-4 h-4" />;
            default: return <AlertTriangle className="w-4 h-4" />;
        }
    };

    const getPaymentMethodColor = (method: string) => {
        switch (method) {
            case 'Bank Transfer': return 'bg-blue-100 text-blue-800';
            case 'Momo': return 'bg-pink-100 text-pink-800';
            case 'Credit Card': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.service.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const totalRevenue = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.amount, 0);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const processingOrders = orders.filter(o => o.status === 'processing').length;
    const completedOrders = orders.filter(o => o.status === 'completed').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản Lý Đơn Hàng</h1>
                    <p className="text-gray-600 mt-1">Quản lý và theo dõi tất cả đơn hàng của khách hàng</p>
                </div>
                <div className="flex items-center space-x-2">
                    <ShoppingCart className="w-6 h-6 text-red-500" />
                    <span className="text-sm text-gray-500">Order Management</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Tổng doanh thu</p>
                            <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Đơn hàng chờ</p>
                            <p className="text-3xl font-bold text-gray-900">{pendingOrders}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Đang xử lý</p>
                            <p className="text-3xl font-bold text-gray-900">{processingOrders}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Package className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Đã hoàn thành</p>
                            <p className="text-3xl font-bold text-gray-900">{completedOrders}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-purple-600" />
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
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm đơn hàng..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="input pl-10 w-full"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="input"
                                >
                                    <option value="all">Tất cả trạng thái</option>
                                    <option value="pending">Chờ xử lý</option>
                                    <option value="processing">Đang xử lý</option>
                                    <option value="completed">Đã hoàn thành</option>
                                    <option value="cancelled">Đã hủy</option>
                                </select>

                                <select
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value)}
                                    className="input"
                                >
                                    <option value="all">Tất cả ngày</option>
                                    <option value="today">Hôm nay</option>
                                    <option value="week">Tuần này</option>
                                    <option value="month">Tháng này</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="btn btn-outline btn-sm">
                                <Download className="w-4 h-4 mr-2" />
                                Xuất Excel
                            </button>
                            <button className="btn btn-primary btn-sm bg-red-600 hover:bg-red-700 text-white">
                                <Package className="w-4 h-4 mr-2" />
                                Tạo đơn hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="card">
                <div className="card-body p-0">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="p-4 text-left">Mã đơn hàng</th>
                                    <th className="p-4 text-left">Khách hàng</th>
                                    <th className="p-4 text-left">Dịch vụ</th>
                                    <th className="p-4 text-right">Số tiền</th>
                                    <th className="p-4 text-left">Trạng thái</th>
                                    <th className="p-4 text-left">Thanh toán</th>
                                    <th className="p-4 text-left">Ngày đặt</th>
                                    <th className="p-4 text-left">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 border-b">
                                        <td className="p-4">
                                            <div className="font-semibold text-gray-900">{order.id}</div>
                                            <div className="text-xs text-gray-500">{order.description}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                                                    <User className="w-4 h-4 text-white" />
                                                </div>
                                                <div className="ml-3">
                                                    <div className="font-medium text-gray-900">{order.customer.name}</div>
                                                    <div className="text-sm text-gray-500">{order.customer.email}</div>
                                                    <div className="text-xs text-gray-400">{order.customer.phone}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-medium text-gray-900">{order.service}</div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="font-semibold text-gray-900">{formatCurrency(order.amount)}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center">
                                                {getStatusIcon(order.status)}
                                                <span className={`ml-2 px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(order.status)}`}>
                                                    {order.status === 'completed' ? 'Đã hoàn thành' :
                                                        order.status === 'pending' ? 'Chờ xử lý' :
                                                            order.status === 'processing' ? 'Đang xử lý' : 'Đã hủy'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getPaymentMethodColor(order.paymentMethod)}`}>
                                                {order.paymentMethod}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {order.orderDate}
                                            </div>
                                            {order.completedDate && (
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Hoàn thành: {order.completedDate}
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center space-x-1">
                                                <button className="p-2 hover:bg-blue-50 rounded-md transition-colors" title="Xem chi tiết">
                                                    <Eye className="w-4 h-4 text-blue-600" />
                                                </button>
                                                <button className="p-2 hover:bg-green-50 rounded-md transition-colors" title="Chỉnh sửa">
                                                    <Edit className="w-4 h-4 text-green-600" />
                                                </button>
                                                <button className="p-2 hover:bg-red-50 rounded-md transition-colors" title="Xóa">
                                                    <Trash className="w-4 h-4 text-red-600" />
                                                </button>
                                                <button className="p-2 hover:bg-gray-50 rounded-md transition-colors" title="Thêm tùy chọn">
                                                    <MoreHorizontal className="w-4 h-4 text-gray-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">{filteredOrders.length}</span> trong tổng số <span className="font-medium">{orders.length}</span> đơn hàng
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

export default AdminOrdersPage; 