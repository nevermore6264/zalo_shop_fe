'use client';
import React, { useState } from 'react';
import {
    Users,
    Search,
    Download,
    Plus,
    Edit,
    Trash,
    Eye,
    Shield,
    User,
    Mail,
    Phone,
    Calendar,
    CheckCircle,
    XCircle,
    Clock,
    MoreHorizontal
} from 'lucide-react';

const AdminUsersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [roleFilter, setRoleFilter] = useState('all');

    // Mock data for users
    const users = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@email.com',
            phone: '0123456789',
            role: 'user',
            status: 'active',
            joinDate: '2024-01-15',
            lastLogin: '2024-01-20 14:30',
            totalOrders: 15,
            totalSpent: 2500000
        },
        {
            id: 2,
            name: 'Trần Thị B',
            email: 'tranthib@email.com',
            phone: '0987654321',
            role: 'user',
            status: 'active',
            joinDate: '2024-01-10',
            lastLogin: '2024-01-19 09:15',
            totalOrders: 8,
            totalSpent: 1200000
        },
        {
            id: 3,
            name: 'Lê Văn C',
            email: 'levanc@email.com',
            phone: '0369852147',
            role: 'admin',
            status: 'active',
            joinDate: '2024-01-05',
            lastLogin: '2024-01-20 16:45',
            totalOrders: 0,
            totalSpent: 0
        },
        {
            id: 4,
            name: 'Phạm Thị D',
            email: 'phamthid@email.com',
            phone: '0521478963',
            role: 'user',
            status: 'inactive',
            joinDate: '2024-01-08',
            lastLogin: '2024-01-15 11:20',
            totalOrders: 3,
            totalSpent: 450000
        },
        {
            id: 5,
            name: 'Hoàng Văn E',
            email: 'hoangvane@email.com',
            phone: '0741236985',
            role: 'user',
            status: 'suspended',
            joinDate: '2024-01-12',
            lastLogin: '2024-01-18 13:40',
            totalOrders: 12,
            totalSpent: 1800000
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'inactive': return 'bg-gray-100 text-gray-800';
            case 'suspended': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin': return 'bg-purple-100 text-purple-800';
            case 'user': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <CheckCircle className="w-4 h-4" />;
            case 'inactive': return <Clock className="w-4 h-4" />;
            case 'suspended': return <XCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };



    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;

        return matchesSearch && matchesStatus && matchesRole;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản Lý Người Dùng</h1>
                    <p className="text-gray-600 mt-1">Quản lý tài khoản người dùng và phân quyền</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Users className="w-6 h-6 text-red-500" />
                    <span className="text-sm text-gray-500">User Management</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Tổng người dùng</p>
                            <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Đang hoạt động</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {users.filter(u => u.status === 'active').length}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Admin</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {users.filter(u => u.role === 'admin').length}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <Shield className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Người dùng mới</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {users.filter(u => {
                                    const joinDate = new Date(u.joinDate);
                                    const now = new Date();
                                    const diffDays = Math.floor((now.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24));
                                    return diffDays <= 7;
                                }).length}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-orange-600" />
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
                                        placeholder="Tìm kiếm người dùng..."
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
                                    <option value="active">Đang hoạt động</option>
                                    <option value="inactive">Không hoạt động</option>
                                    <option value="suspended">Bị đình chỉ</option>
                                </select>

                                <select
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                    className="input"
                                >
                                    <option value="all">Tất cả vai trò</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">Người dùng</option>
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
                                Thêm người dùng
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="card">
                <div className="card-body p-0">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="p-4 text-left">Người dùng</th>
                                    <th className="p-4 text-left">Vai trò</th>
                                    <th className="p-4 text-left">Trạng thái</th>
                                    <th className="p-4 text-left">Ngày tham gia</th>
                                    <th className="p-4 text-left">Đăng nhập cuối</th>
                                    <th className="p-4 text-left">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 border-b">
                                        <td className="p-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                                                    <User className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="ml-3">
                                                    <div className="font-semibold text-gray-900">{user.name}</div>
                                                    <div className="text-sm text-gray-500 flex items-center mt-1">
                                                        <Mail className="w-3 h-3 mr-1" />
                                                        {user.email}
                                                    </div>
                                                    <div className="text-sm text-gray-500 flex items-center mt-1">
                                                        <Phone className="w-3 h-3 mr-1" />
                                                        {user.phone}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getRoleColor(user.role)}`}>
                                                {user.role === 'admin' ? 'Admin' : 'Người dùng'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center">
                                                {getStatusIcon(user.status)}
                                                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                                                    {user.status === 'active' ? 'Đang hoạt động' :
                                                        user.status === 'inactive' ? 'Không hoạt động' : 'Bị đình chỉ'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {new Date(user.joinDate).toLocaleDateString('vi-VN')}
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">
                                            <div>{user.lastLogin.split(' ')[0]}</div>
                                            <div className="text-xs text-gray-500">{user.lastLogin.split(' ')[1]}</div>
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
                    Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">{filteredUsers.length}</span> trong tổng số <span className="font-medium">{users.length}</span> người dùng
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

export default AdminUsersPage; 