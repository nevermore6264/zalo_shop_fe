'use client';

import React, { useState } from 'react';
import {
    FileText,
    Search,
    Filter,
    Download,
    Eye,
    Calendar,
    DollarSign,
    CheckCircle,
    Clock,
    AlertCircle,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

const InvoicesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    const invoices = [
        {
            id: 'INV-001',
            customer: 'Nguyễn Văn A',
            amount: 500000,
            status: 'paid',
            date: '2024-01-15',
            dueDate: '2024-01-20',
            description: 'Dịch vụ Zalo Premium - 30 ngày',
            paymentMethod: 'Chuyển khoản'
        },
        {
            id: 'INV-002',
            customer: 'Trần Thị B',
            amount: 200000,
            status: 'pending',
            date: '2024-01-14',
            dueDate: '2024-01-19',
            description: 'Mua tài khoản Zalo Basic',
            paymentMethod: 'Chưa thanh toán'
        },
        {
            id: 'INV-003',
            customer: 'Lê Văn C',
            amount: 1000000,
            status: 'overdue',
            date: '2024-01-10',
            dueDate: '2024-01-15',
            description: 'Gói Proxy Premium - 90 ngày',
            paymentMethod: 'Chưa thanh toán'
        },
        {
            id: 'INV-004',
            customer: 'Phạm Thị D',
            amount: 300000,
            status: 'paid',
            date: '2024-01-12',
            dueDate: '2024-01-17',
            description: 'Nạp tiền tài khoản',
            paymentMethod: 'Chuyển khoản'
        },
        {
            id: 'INV-005',
            customer: 'Hoàng Văn E',
            amount: 750000,
            status: 'pending',
            date: '2024-01-13',
            dueDate: '2024-01-18',
            description: 'Dịch vụ Zalo VIP - 60 ngày',
            paymentMethod: 'Chưa thanh toán'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'text-green-600 bg-green-50';
            case 'pending':
                return 'text-yellow-600 bg-yellow-50';
            case 'overdue':
                return 'text-red-600 bg-red-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'paid':
                return 'Đã thanh toán';
            case 'pending':
                return 'Chờ thanh toán';
            case 'overdue':
                return 'Quá hạn';
            default:
                return 'Không xác định';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid':
                return <CheckCircle className="w-4 h-4" />;
            case 'pending':
                return <Clock className="w-4 h-4" />;
            case 'overdue':
                return <AlertCircle className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    const filteredInvoices = invoices.filter(invoice => {
        const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
    const paidAmount = filteredInvoices.filter(inv => inv.status === 'paid').reduce((sum, invoice) => sum + invoice.amount, 0);
    const pendingAmount = filteredInvoices.filter(inv => inv.status === 'pending').reduce((sum, invoice) => sum + invoice.amount, 0);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">Hóa Đơn</h1>
                    <p className="text-xl text-gray-600 mt-2">
                        Quản lý và theo dõi tất cả hóa đơn dịch vụ
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="btn btn-outline flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Xuất Excel</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="card">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Tổng hóa đơn</p>
                                <p className="text-2xl font-bold text-gray-900">{filteredInvoices.length}</p>
                            </div>
                            <FileText className="w-8 h-8 text-blue-500" />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Tổng giá trị</p>
                                <p className="text-2xl font-bold text-gray-900">{totalAmount.toLocaleString()} VNĐ</p>
                            </div>
                            <DollarSign className="w-8 h-8 text-green-500" />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Đã thanh toán</p>
                                <p className="text-2xl font-bold text-green-600">{paidAmount.toLocaleString()} VNĐ</p>
                            </div>
                            <CheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Chờ thanh toán</p>
                                <p className="text-2xl font-bold text-yellow-600">{pendingAmount.toLocaleString()} VNĐ</p>
                            </div>
                            <Clock className="w-8 h-8 text-yellow-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="card">
                <div className="card-body">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm hóa đơn, khách hàng..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="input pl-10 w-full"
                                />
                            </div>
                        </div>

                        {/* Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="btn btn-outline flex items-center space-x-2"
                        >
                            <Filter className="w-4 h-4" />
                            <span>Bộ lọc</span>
                            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                    </div>

                    {/* Filter Options */}
                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Trạng thái
                                    </label>
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="input w-full"
                                    >
                                        <option value="all">Tất cả trạng thái</option>
                                        <option value="paid">Đã thanh toán</option>
                                        <option value="pending">Chờ thanh toán</option>
                                        <option value="overdue">Quá hạn</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Thời gian
                                    </label>
                                    <select
                                        value={dateFilter}
                                        onChange={(e) => setDateFilter(e.target.value)}
                                        className="input w-full"
                                    >
                                        <option value="all">Tất cả thời gian</option>
                                        <option value="today">Hôm nay</option>
                                        <option value="week">Tuần này</option>
                                        <option value="month">Tháng này</option>
                                        <option value="quarter">Quý này</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Invoices Table */}
            <div className="card">
                <div className="card-header">
                    <h2 className="text-xl font-semibold text-gray-900">Danh sách hóa đơn</h2>
                </div>
                <div className="card-body">
                    {filteredInvoices.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy hóa đơn</h3>
                            <p className="text-gray-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 font-medium text-gray-700">Mã HĐ</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-700">Khách hàng</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-700">Mô tả</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-700">Số tiền</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-700">Trạng thái</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-700">Ngày tạo</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-700">Hạn thanh toán</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-700">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredInvoices.map((invoice) => (
                                        <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4">
                                                <span className="font-mono font-medium text-gray-900">{invoice.id}</span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="font-medium text-gray-900">{invoice.customer}</div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="text-gray-700">{invoice.description}</div>
                                                <div className="text-sm text-gray-500">{invoice.paymentMethod}</div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="font-semibold text-gray-900">
                                                    {invoice.amount.toLocaleString()} VNĐ
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                                                    {getStatusIcon(invoice.status)}
                                                    <span className="ml-1">{getStatusText(invoice.status)}</span>
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center text-gray-700">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    {new Date(invoice.date).toLocaleDateString('vi-VN')}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center text-gray-700">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    {new Date(invoice.dueDate).toLocaleDateString('vi-VN')}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <button className="p-1 hover:bg-gray-200 rounded" title="Xem chi tiết">
                                                        <Eye className="w-4 h-4 text-gray-500" />
                                                    </button>
                                                    <button className="p-1 hover:bg-gray-200 rounded" title="Tải xuống">
                                                        <Download className="w-4 h-4 text-gray-500" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InvoicesPage; 