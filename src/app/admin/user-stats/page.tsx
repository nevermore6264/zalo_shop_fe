'use client';
import React, { useState } from 'react';
import {
    Users,
    UserPlus,
    UserCheck,
    UserX,
    TrendingUp,
    Activity,
    Download,
    MapPin,
    Clock,
    Eye,
    MoreHorizontal,
    RefreshCw,
    Smartphone,
    Monitor,
    Globe,
    Target,
    Award,
    Star,
    ArrowUpRight
} from 'lucide-react';

const AdminUserStatsPage = () => {
    const [dateRange, setDateRange] = useState('30days');
    const [selectedMetric, setSelectedMetric] = useState('registrations');

    // Mock data for user statistics
    const userStats = {
        totalUsers: 15420,
        activeUsers: 12470,
        newUsers: 847,
        premiumUsers: 2340,
        totalRevenue: 125000000,
        averageSessionTime: 24.5,
        retentionRate: 78.3,
        conversionRate: 15.2
    };

    // Mock data for user growth chart (last 30 days)
    const growthData = [
        { date: '2024-01-01', registrations: 28, activeUsers: 1240, premiumUsers: 230 },
        { date: '2024-01-02', registrations: 32, activeUsers: 1250, premiumUsers: 232 },
        { date: '2024-01-03', registrations: 25, activeUsers: 1245, premiumUsers: 231 },
        { date: '2024-01-04', registrations: 35, activeUsers: 1260, premiumUsers: 235 },
        { date: '2024-01-05', registrations: 29, activeUsers: 1255, premiumUsers: 233 },
        { date: '2024-01-06', registrations: 41, activeUsers: 1270, premiumUsers: 238 },
        { date: '2024-01-07', registrations: 38, activeUsers: 1265, premiumUsers: 236 },
        { date: '2024-01-08', registrations: 31, activeUsers: 1258, premiumUsers: 234 },
        { date: '2024-01-09', registrations: 34, activeUsers: 1262, premiumUsers: 235 },
        { date: '2024-01-10', registrations: 37, activeUsers: 1268, premiumUsers: 237 },
        { date: '2024-01-11', registrations: 33, activeUsers: 1265, premiumUsers: 236 },
        { date: '2024-01-12', registrations: 39, activeUsers: 1272, premiumUsers: 239 },
        { date: '2024-01-13', registrations: 36, activeUsers: 1270, premiumUsers: 238 },
        { date: '2024-01-14', registrations: 30, activeUsers: 1265, premiumUsers: 236 },
        { date: '2024-01-15', registrations: 35, activeUsers: 1268, premiumUsers: 237 },
        { date: '2024-01-16', registrations: 32, activeUsers: 1266, premiumUsers: 236 },
        { date: '2024-01-17', registrations: 38, activeUsers: 1270, premiumUsers: 238 },
        { date: '2024-01-18', registrations: 34, activeUsers: 1268, premiumUsers: 237 },
        { date: '2024-01-19', registrations: 40, activeUsers: 1275, premiumUsers: 240 },
        { date: '2024-01-20', registrations: 37, activeUsers: 1272, premiumUsers: 239 },
        { date: '2024-01-21', registrations: 33, activeUsers: 1270, premiumUsers: 238 },
        { date: '2024-01-22', registrations: 36, activeUsers: 1273, premiumUsers: 239 },
        { date: '2024-01-23', registrations: 39, activeUsers: 1276, premiumUsers: 240 },
        { date: '2024-01-24', registrations: 35, activeUsers: 1274, premiumUsers: 239 },
        { date: '2024-01-25', registrations: 32, activeUsers: 1272, premiumUsers: 238 },
        { date: '2024-01-26', registrations: 38, activeUsers: 1275, premiumUsers: 240 },
        { date: '2024-01-27', registrations: 36, activeUsers: 1273, premiumUsers: 239 },
        { date: '2024-01-28', registrations: 34, activeUsers: 1271, premiumUsers: 238 },
        { date: '2024-01-29', registrations: 37, activeUsers: 1274, premiumUsers: 239 },
        { date: '2024-01-30', registrations: 35, activeUsers: 1272, premiumUsers: 238 }
    ];

    // Mock data for user demographics
    const demographicData = [
        { age: '18-24', users: 3240, percentage: 21, color: 'bg-blue-500' },
        { age: '25-34', users: 4620, percentage: 30, color: 'bg-green-500' },
        { age: '35-44', users: 3850, percentage: 25, color: 'bg-purple-500' },
        { age: '45-54', users: 2310, percentage: 15, color: 'bg-orange-500' },
        { age: '55+', users: 1400, percentage: 9, color: 'bg-red-500' }
    ];

    // Mock data for user locations
    const locationData = [
        { location: 'Hà Nội', users: 3850, percentage: 25, color: 'bg-blue-500' },
        { location: 'TP. Hồ Chí Minh', users: 4620, percentage: 30, color: 'bg-green-500' },
        { location: 'Đà Nẵng', users: 1542, percentage: 10, color: 'bg-purple-500' },
        { location: 'Hải Phòng', users: 1234, percentage: 8, color: 'bg-orange-500' },
        { location: 'Cần Thơ', users: 924, percentage: 6, color: 'bg-red-500' },
        { location: 'Khác', users: 3250, percentage: 21, color: 'bg-gray-500' }
    ];

    // Mock data for device usage
    const deviceData = [
        { device: 'Mobile', users: 9240, percentage: 60, color: 'bg-blue-500' },
        { device: 'Desktop', users: 4620, percentage: 30, color: 'bg-green-500' },
        { device: 'Tablet', users: 1540, percentage: 10, color: 'bg-purple-500' }
    ];

    // Mock data for user activity
    const activityData = [
        { time: '00:00-06:00', users: 1234, percentage: 8, color: 'bg-gray-500' },
        { time: '06:00-12:00', users: 3085, percentage: 20, color: 'bg-blue-500' },
        { time: '12:00-18:00', users: 4620, percentage: 30, color: 'bg-green-500' },
        { time: '18:00-24:00', users: 6481, percentage: 42, color: 'bg-purple-500' }
    ];

    // Mock data for top users
    const topUsers = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@email.com',
            totalSpent: 8500000,
            orders: 45,
            lastActive: '2024-01-20 15:30',
            status: 'premium',
            avatar: 'NA'
        },
        {
            id: 2,
            name: 'Trần Thị B',
            email: 'tranthib@email.com',
            totalSpent: 7200000,
            orders: 38,
            lastActive: '2024-01-20 14:45',
            status: 'premium',
            avatar: 'TB'
        },
        {
            id: 3,
            name: 'Lê Văn C',
            email: 'levanc@email.com',
            totalSpent: 6500000,
            orders: 32,
            lastActive: '2024-01-20 14:20',
            status: 'active',
            avatar: 'LC'
        },
        {
            id: 4,
            name: 'Phạm Thị D',
            email: 'phamthid@email.com',
            totalSpent: 5800000,
            orders: 28,
            lastActive: '2024-01-20 13:55',
            status: 'premium',
            avatar: 'PD'
        },
        {
            id: 5,
            name: 'Hoàng Văn E',
            email: 'hoangvane@email.com',
            totalSpent: 5200000,
            orders: 25,
            lastActive: '2024-01-20 13:30',
            status: 'active',
            avatar: 'HE'
        }
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'premium': return 'bg-purple-100 text-purple-800';
            case 'active': return 'bg-green-100 text-green-800';
            case 'inactive': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'premium': return <Award className="w-4 h-4" />;
            case 'active': return <UserCheck className="w-4 h-4" />;
            case 'inactive': return <UserX className="w-4 h-4" />;
            default: return <UserCheck className="w-4 h-4" />;
        }
    };

    // Calculate chart statistics
    const totalRegistrations = growthData.reduce((sum, item) => sum + item.registrations, 0);
    const averageRegistrations = Math.round(totalRegistrations / growthData.length);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Thống Kê Người Dùng</h1>
                    <p className="text-gray-600 mt-1">Phân tích và theo dõi hành vi người dùng</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Users className="w-6 h-6 text-red-500" />
                    <span className="text-sm text-gray-500">User Analytics</span>
                </div>
            </div>

            {/* User Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Tổng người dùng</p>
                            <p className="text-3xl font-bold text-gray-900">{userStats.totalUsers.toLocaleString()}</p>
                            <div className="flex items-center mt-2">
                                <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                                <span className="text-sm text-green-600 font-medium">+12.5%</span>
                                <span className="text-sm text-gray-500 ml-1">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Người dùng hoạt động</p>
                            <p className="text-3xl font-bold text-gray-900">{userStats.activeUsers.toLocaleString()}</p>
                            <div className="flex items-center mt-2">
                                <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                                <span className="text-sm text-green-600 font-medium">+8.2%</span>
                                <span className="text-sm text-gray-500 ml-1">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <UserCheck className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Người dùng mới</p>
                            <p className="text-3xl font-bold text-gray-900">{userStats.newUsers.toLocaleString()}</p>
                            <div className="flex items-center mt-2">
                                <ArrowUpRight className="w-4 h-4 text-purple-600 mr-1" />
                                <span className="text-sm text-purple-600 font-medium">+15.7%</span>
                                <span className="text-sm text-gray-500 ml-1">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <UserPlus className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Người dùng Premium</p>
                            <p className="text-3xl font-bold text-gray-900">{userStats.premiumUsers.toLocaleString()}</p>
                            <div className="flex items-center mt-2">
                                <ArrowUpRight className="w-4 h-4 text-orange-600 mr-1" />
                                <span className="text-sm text-orange-600 font-medium">+22.3%</span>
                                <span className="text-sm text-gray-500 ml-1">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <Award className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Controls */}
            <div className="card">
                <div className="card-body">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h3 className="text-lg font-semibold text-gray-900">Biểu đồ tăng trưởng</h3>
                            <div className="flex items-center space-x-2">
                                <select
                                    value={dateRange}
                                    onChange={(e) => setDateRange(e.target.value)}
                                    className="input"
                                >
                                    <option value="7days">7 ngày qua</option>
                                    <option value="30days">30 ngày qua</option>
                                    <option value="90days">90 ngày qua</option>
                                    <option value="1year">1 năm qua</option>
                                </select>
                                <select
                                    value={selectedMetric}
                                    onChange={(e) => setSelectedMetric(e.target.value)}
                                    className="input"
                                >
                                    <option value="registrations">Đăng ký mới</option>
                                    <option value="activeUsers">Người dùng hoạt động</option>
                                    <option value="premiumUsers">Người dùng Premium</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="btn btn-outline btn-sm">
                                <Download className="w-4 h-4 mr-2" />
                                Xuất báo cáo
                            </button>
                            <button className="btn btn-outline btn-sm">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Làm mới
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Growth Chart */}
                <div className="card">
                    <div className="card-body">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Tăng trưởng người dùng</h3>
                            <div className="flex items-center space-x-4 text-sm">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                    <span>Đăng ký mới</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                    <span>Hoạt động</span>
                                </div>
                            </div>
                        </div>

                        {/* Simple Bar Chart */}
                        <div className="h-64 flex items-end justify-between space-x-1">
                            {growthData.slice(-14).map((item, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center">
                                    <div className="w-full bg-blue-100 rounded-t" style={{ height: `${(item.registrations / 50) * 200}px` }}>
                                        <div className="w-full bg-blue-500 rounded-t" style={{ height: '60%' }}></div>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">
                                        {new Date(item.date).getDate()}/{new Date(item.date).getMonth() + 1}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-sm text-gray-600">Tổng đăng ký</p>
                                <p className="text-lg font-semibold text-gray-900">{totalRegistrations}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Trung bình/ngày</p>
                                <p className="text-lg font-semibold text-gray-900">{averageRegistrations}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Tỷ lệ tăng</p>
                                <p className="text-lg font-semibold text-gray-900">+15.7%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Demographics Chart */}
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố độ tuổi</h3>

                        <div className="space-y-4">
                            {demographicData.map((demo, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className={`w-3 h-3 rounded-full mr-3 ${demo.color}`}></div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{demo.age} tuổi</p>
                                            <p className="text-xs text-gray-500">{demo.percentage}%</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900">{demo.users.toLocaleString()}</p>
                                </div>
                            ))}
                        </div>

                        {/* Simple Pie Chart */}
                        <div className="mt-6 flex justify-center">
                            <div className="relative w-32 h-32">
                                <div className="absolute inset-0 rounded-full border-8 border-blue-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 71% 0%, 71% 50%)' }}></div>
                                <div className="absolute inset-0 rounded-full border-8 border-green-500" style={{ clipPath: 'polygon(50% 50%, 71% 50%, 71% 100%, 50% 100%)' }}></div>
                                <div className="absolute inset-0 rounded-full border-8 border-purple-500" style={{ clipPath: 'polygon(50% 50%, 50% 100%, 29% 100%, 29% 50%)' }}></div>
                                <div className="absolute inset-0 rounded-full border-8 border-orange-500" style={{ clipPath: 'polygon(50% 50%, 29% 50%, 29% 0%, 50% 0%)' }}></div>
                                <div className="absolute inset-0 rounded-full border-8 border-red-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 29% 0%, 29% 50%)' }}></div>
                                <div className="absolute inset-0 rounded-full bg-white flex items-center justify-center">
                                    <span className="text-sm font-semibold text-gray-900">100%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Location Distribution */}
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố địa lý</h3>
                        <div className="space-y-3">
                            {locationData.map((location, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                                        <span className="text-sm font-medium text-gray-900">{location.location}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-900">{location.users.toLocaleString()}</p>
                                        <p className="text-xs text-gray-500">{location.percentage}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Device Usage */}
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sử dụng thiết bị</h3>
                        <div className="space-y-3">
                            {deviceData.map((device, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        {device.device === 'Mobile' ? (
                                            <Smartphone className="w-4 h-4 text-gray-400 mr-2" />
                                        ) : device.device === 'Desktop' ? (
                                            <Monitor className="w-4 h-4 text-gray-400 mr-2" />
                                        ) : (
                                            <Globe className="w-4 h-4 text-gray-400 mr-2" />
                                        )}
                                        <span className="text-sm font-medium text-gray-900">{device.device}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-900">{device.users.toLocaleString()}</p>
                                        <p className="text-xs text-gray-500">{device.percentage}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Activity Time */}
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Thời gian hoạt động</h3>
                        <div className="space-y-3">
                            {activityData.map((activity, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                                        <span className="text-sm font-medium text-gray-900">{activity.time}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-900">{activity.users.toLocaleString()}</p>
                                        <p className="text-xs text-gray-500">{activity.percentage}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Users */}
            <div className="card">
                <div className="card-body">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Top người dùng</h3>
                        <button className="btn btn-outline btn-sm">
                            Xem tất cả
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="p-4 text-left">Người dùng</th>
                                    <th className="p-4 text-left">Email</th>
                                    <th className="p-4 text-right">Tổng chi tiêu</th>
                                    <th className="p-4 text-center">Đơn hàng</th>
                                    <th className="p-4 text-left">Trạng thái</th>
                                    <th className="p-4 text-left">Hoạt động cuối</th>
                                    <th className="p-4 text-left">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 border-b">
                                        <td className="p-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                                                    {user.avatar}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{user.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm text-gray-900">{user.email}</div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="font-semibold text-gray-900">{formatCurrency(user.totalSpent)}</div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="font-semibold text-gray-900">{user.orders}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center">
                                                {getStatusIcon(user.status)}
                                                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                                                    {user.status === 'premium' ? 'Premium' :
                                                        user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">
                                            {user.lastActive}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center space-x-1">
                                                <button className="p-2 hover:bg-blue-50 rounded-md transition-colors" title="Xem chi tiết">
                                                    <Eye className="w-4 h-4 text-blue-600" />
                                                </button>
                                                <button className="p-2 hover:bg-gray-50 rounded-md transition-colors" title="Thêm">
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

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card">
                    <div className="card-body text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Activity className="w-8 h-8 text-blue-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Thời gian phiên TB</h4>
                        <p className="text-3xl font-bold text-blue-600">{userStats.averageSessionTime} phút</p>
                        <p className="text-sm text-gray-500 mt-1">Trung bình mỗi phiên</p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Target className="w-8 h-8 text-green-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Tỷ lệ giữ chân</h4>
                        <p className="text-3xl font-bold text-green-600">{userStats.retentionRate}%</p>
                        <p className="text-sm text-gray-500 mt-1">Người dùng quay lại</p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <TrendingUp className="w-8 h-8 text-purple-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Tỷ lệ chuyển đổi</h4>
                        <p className="text-3xl font-bold text-purple-600">{userStats.conversionRate}%</p>
                        <p className="text-sm text-gray-500 mt-1">Từ free sang premium</p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star className="w-8 h-8 text-orange-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Đánh giá TB</h4>
                        <p className="text-3xl font-bold text-orange-600">4.8/5</p>
                        <p className="text-sm text-gray-500 mt-1">Từ người dùng</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUserStatsPage; 