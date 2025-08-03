'use client';
import React, { useState } from 'react';
import {
    Server,
    Search,
    Filter,
    Download,
    Plus,
    Edit,
    Trash,
    Eye,
    Settings,
    RefreshCw,
    CheckCircle,
    XCircle,
    Clock,
    AlertTriangle,
    Globe,
    Wifi,
    Shield,
    Activity,
    MoreHorizontal,
    Copy,
    ExternalLink
} from 'lucide-react';

const AdminProxiesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    // Mock data for proxies
    const proxies = [
        {
            id: 1,
            ip: '192.168.1.100',
            port: 8080,
            type: 'static',
            protocol: 'HTTP',
            location: 'Vietnam',
            provider: 'Viettel',
            status: 'active',
            speed: 85,
            uptime: 99.5,
            lastCheck: '2024-01-20 15:30',
            expiresAt: '2024-12-31',
            bandwidth: 'Unlimited',
            assignedTo: 'Nguyễn Văn A',
            package: 'Gói A',
            price: 500000
        },
        {
            id: 2,
            ip: '192.168.1.101',
            port: 3128,
            type: 'static',
            protocol: 'SOCKS5',
            location: 'Vietnam',
            provider: 'Mobifone',
            status: 'active',
            speed: 92,
            uptime: 98.8,
            lastCheck: '2024-01-20 15:25',
            expiresAt: '2024-11-30',
            bandwidth: 'Unlimited',
            assignedTo: 'Trần Thị B',
            package: 'Gói B',
            price: 800000
        },
        {
            id: 3,
            ip: '192.168.2.100',
            port: 8080,
            type: 'dynamic',
            protocol: 'HTTP',
            location: 'Vietnam',
            provider: 'VinaPhone',
            status: 'active',
            speed: 78,
            uptime: 97.2,
            lastCheck: '2024-01-20 15:20',
            expiresAt: '2024-12-31',
            bandwidth: '100GB/month',
            assignedTo: 'Lê Văn C',
            package: 'Gói C',
            price: 600000
        },
        {
            id: 4,
            ip: '192.168.1.102',
            port: 8080,
            type: 'static',
            protocol: 'HTTP',
            location: 'Vietnam',
            provider: 'Viettel',
            status: 'inactive',
            speed: 0,
            uptime: 0,
            lastCheck: '2024-01-19 10:15',
            expiresAt: '2024-01-15',
            bandwidth: 'Unlimited',
            assignedTo: null,
            package: 'Gói A',
            price: 500000
        },
        {
            id: 5,
            ip: '192.168.2.101',
            port: 3128,
            type: 'dynamic',
            protocol: 'SOCKS5',
            location: 'Vietnam',
            provider: 'Mobifone',
            status: 'maintenance',
            speed: 45,
            uptime: 85.5,
            lastCheck: '2024-01-20 14:45',
            expiresAt: '2024-12-31',
            bandwidth: '50GB/month',
            assignedTo: 'Phạm Thị D',
            package: 'Gói D',
            price: 400000
        },
        {
            id: 6,
            ip: '192.168.3.100',
            port: 8080,
            type: 'static',
            protocol: 'HTTP',
            location: 'Singapore',
            provider: 'International',
            status: 'active',
            speed: 95,
            uptime: 99.9,
            lastCheck: '2024-01-20 15:35',
            expiresAt: '2024-12-31',
            bandwidth: 'Unlimited',
            assignedTo: 'Hoàng Văn E',
            package: 'Premium',
            price: 1500000
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'inactive': return 'bg-gray-100 text-gray-800';
            case 'maintenance': return 'bg-yellow-100 text-yellow-800';
            case 'error': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <CheckCircle className="w-4 h-4" />;
            case 'inactive': return <XCircle className="w-4 h-4" />;
            case 'maintenance': return <Clock className="w-4 h-4" />;
            case 'error': return <AlertTriangle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'static': return 'bg-blue-100 text-blue-800';
            case 'dynamic': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getProtocolColor = (protocol: string) => {
        switch (protocol) {
            case 'HTTP': return 'bg-green-100 text-green-800';
            case 'SOCKS5': return 'bg-orange-100 text-orange-800';
            case 'HTTPS': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getSpeedColor = (speed: number) => {
        if (speed >= 90) return 'text-green-600';
        if (speed >= 70) return 'text-yellow-600';
        return 'text-red-600';
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const filteredProxies = proxies.filter(proxy => {
        const matchesSearch = proxy.ip.includes(searchTerm) ||
            proxy.assignedTo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            proxy.package.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'all' || proxy.type === typeFilter;
        const matchesStatus = statusFilter === 'all' || proxy.status === statusFilter;

        return matchesSearch && matchesType && matchesStatus;
    });

    const totalProxies = proxies.length;
    const activeProxies = proxies.filter(p => p.status === 'active').length;
    const totalRevenue = proxies.reduce((sum, p) => sum + p.price, 0);
    const averageSpeed = Math.round(proxies.filter(p => p.status === 'active').reduce((sum, p) => sum + p.speed, 0) / activeProxies);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản Lý Proxy</h1>
                    <p className="text-gray-600 mt-1">Quản lý và giám sát tất cả proxy server</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Server className="w-6 h-6 text-red-500" />
                    <span className="text-sm text-gray-500">Proxy Management</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Tổng proxy</p>
                            <p className="text-3xl font-bold text-gray-900">{totalProxies}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Server className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Đang hoạt động</p>
                            <p className="text-3xl font-bold text-gray-900">{activeProxies}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Tốc độ trung bình</p>
                            <p className="text-3xl font-bold text-gray-900">{averageSpeed}%</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <Activity className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Tổng giá trị</p>
                            <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <Shield className="w-6 h-6 text-orange-600" />
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
                                        placeholder="Tìm kiếm proxy..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="input pl-10 w-full"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <select
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    className="input"
                                >
                                    <option value="all">Tất cả loại</option>
                                    <option value="static">Proxy tĩnh</option>
                                    <option value="dynamic">Proxy động</option>
                                </select>

                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="input"
                                >
                                    <option value="all">Tất cả trạng thái</option>
                                    <option value="active">Đang hoạt động</option>
                                    <option value="inactive">Không hoạt động</option>
                                    <option value="maintenance">Bảo trì</option>
                                    <option value="error">Lỗi</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="btn btn-outline btn-sm">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Kiểm tra tất cả
                            </button>
                            <button className="btn btn-outline btn-sm">
                                <Download className="w-4 h-4 mr-2" />
                                Xuất danh sách
                            </button>
                            <button className="btn btn-primary btn-sm bg-red-600 hover:bg-red-700 text-white">
                                <Plus className="w-4 h-4 mr-2" />
                                Thêm proxy
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Proxies Table */}
            <div className="card">
                <div className="card-body p-0">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="p-4 text-left">IP Address</th>
                                    <th className="p-4 text-left">Thông tin</th>
                                    <th className="p-4 text-left">Trạng thái</th>
                                    <th className="p-4 text-center">Tốc độ</th>
                                    <th className="p-4 text-center">Uptime</th>
                                    <th className="p-4 text-left">Người dùng</th>
                                    <th className="p-4 text-left">Hết hạn</th>
                                    <th className="p-4 text-right">Giá</th>
                                    <th className="p-4 text-left">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProxies.map((proxy) => (
                                    <tr key={proxy.id} className="hover:bg-gray-50 border-b">
                                        <td className="p-4">
                                            <div className="font-mono text-sm font-semibold text-gray-900">
                                                {proxy.ip}:{proxy.port}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {proxy.location} • {proxy.provider}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(proxy.type)}`}>
                                                        {proxy.type === 'static' ? 'Tĩnh' : 'Động'}
                                                    </span>
                                                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getProtocolColor(proxy.protocol)}`}>
                                                        {proxy.protocol}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-gray-600">
                                                    {proxy.bandwidth}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center">
                                                {getStatusIcon(proxy.status)}
                                                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(proxy.status)}`}>
                                                    {proxy.status === 'active' ? 'Hoạt động' :
                                                        proxy.status === 'inactive' ? 'Không hoạt động' :
                                                            proxy.status === 'maintenance' ? 'Bảo trì' : 'Lỗi'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className={`font-semibold ${getSpeedColor(proxy.speed)}`}>
                                                {proxy.speed}%
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="font-semibold text-gray-900">
                                                {proxy.uptime}%
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div>
                                                <div className="font-medium text-gray-900">
                                                    {proxy.assignedTo || 'Chưa gán'}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {proxy.package}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {proxy.expiresAt}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                Kiểm tra: {proxy.lastCheck}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="font-semibold text-gray-900">
                                                {formatCurrency(proxy.price)}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center space-x-1">
                                                <button className="p-2 hover:bg-blue-50 rounded-md transition-colors" title="Xem chi tiết">
                                                    <Eye className="w-4 h-4 text-blue-600" />
                                                </button>
                                                <button className="p-2 hover:bg-green-50 rounded-md transition-colors" title="Chỉnh sửa">
                                                    <Edit className="w-4 h-4 text-green-600" />
                                                </button>
                                                <button className="p-2 hover:bg-purple-50 rounded-md transition-colors" title="Sao chép IP">
                                                    <Copy className="w-4 h-4 text-purple-600" />
                                                </button>
                                                <button className="p-2 hover:bg-orange-50 rounded-md transition-colors" title="Kiểm tra">
                                                    <RefreshCw className="w-4 h-4 text-orange-600" />
                                                </button>
                                                <button className="p-2 hover:bg-red-50 rounded-md transition-colors" title="Xóa">
                                                    <Trash className="w-4 h-4 text-red-600" />
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
                    Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">{filteredProxies.length}</span> trong tổng số <span className="font-medium">{proxies.length}</span> proxy
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

export default AdminProxiesPage; 