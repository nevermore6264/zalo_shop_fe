import React from 'react';
import {
    TrendingUp,
    Users,
    DollarSign,
    ShoppingCart,
    Package,
    Shield,
    Clock,
    Star,
    Activity,
    BarChart3,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Settings
} from 'lucide-react';

const AdminDashboardPage = () => {
    const stats = [
        {
            title: 'Tổng Doanh Thu',
            value: '45.250.000 VNĐ',
            change: '+25.5%',
            changeType: 'positive',
            icon: DollarSign,
            color: 'bg-green-500',
        },
        {
            title: 'Tổng Người Dùng',
            value: '2,847',
            change: '+12.3%',
            changeType: 'positive',
            icon: Users,
            color: 'bg-blue-500',
        },
        {
            title: 'Đơn Hàng Mới',
            value: '156',
            change: '+8.7%',
            changeType: 'positive',
            icon: ShoppingCart,
            color: 'bg-orange-500',
        },
        {
            title: 'Dịch Vụ Đang Chạy',
            value: '234',
            change: '+15.2%',
            changeType: 'positive',
            icon: Package,
            color: 'bg-purple-500',
        },
    ];

    const systemStats = [
        {
            title: 'CPU Usage',
            value: '45%',
            status: 'normal',
            icon: Activity,
        },
        {
            title: 'Memory Usage',
            value: '67%',
            status: 'warning',
            icon: BarChart3,
        },
        {
            title: 'Disk Space',
            value: '23%',
            status: 'normal',
            icon: Package,
        },
        {
            title: 'Network',
            value: '89%',
            status: 'critical',
            icon: TrendingUp,
        },
    ];

    const recentActivities = [
        {
            id: 1,
            user: 'Nguyễn Văn A',
            action: 'Đăng ký tài khoản mới',
            time: '2 phút trước',
            status: 'success'
        },
        {
            id: 2,
            user: 'Trần Thị B',
            action: 'Mua dịch vụ proxy',
            time: '5 phút trước',
            status: 'success'
        },
        {
            id: 3,
            user: 'Lê Văn C',
            action: 'Yêu cầu hỗ trợ',
            time: '10 phút trước',
            status: 'pending'
        },
        {
            id: 4,
            user: 'Phạm Thị D',
            action: 'Thanh toán thất bại',
            time: '15 phút trước',
            status: 'error'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success':
                return 'bg-green-100 text-green-800';
            case 'warning':
                return 'bg-yellow-100 text-yellow-800';
            case 'critical':
                return 'bg-red-100 text-red-800';
            case 'normal':
                return 'bg-blue-100 text-blue-800';
            case 'pending':
                return 'bg-orange-100 text-orange-800';
            case 'error':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'success':
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'warning':
                return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
            case 'critical':
                return <XCircle className="w-4 h-4 text-red-600" />;
            case 'normal':
                return <CheckCircle className="w-4 h-4 text-blue-600" />;
            case 'pending':
                return <Clock className="w-4 h-4 text-orange-600" />;
            case 'error':
                return <XCircle className="w-4 h-4 text-red-600" />;
            default:
                return <Activity className="w-4 h-4 text-gray-600" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-600 mt-1">Quản lý hệ thống Zalo Shop</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Shield className="w-6 h-6 text-red-500" />
                    <span className="text-sm text-gray-500">Admin Panel</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="card">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                    <p className={`text-sm font-medium mt-1 ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {stat.change} so với tháng trước
                                    </p>
                                </div>
                                <div className={`p-3 rounded-lg ${stat.color}`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-lg font-semibold text-gray-900">Trạng Thái Hệ Thống</h2>
                    </div>
                    <div className="card-body">
                        <div className="space-y-4">
                            {systemStats.map((stat, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <stat.icon className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{stat.title}</p>
                                            <p className="text-sm text-gray-600">Sử dụng hiện tại</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(stat.status)}`}>
                                            {stat.status === 'normal' ? 'Bình thường' :
                                                stat.status === 'warning' ? 'Cảnh báo' :
                                                    stat.status === 'critical' ? 'Nguy hiểm' : 'Không xác định'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-lg font-semibold text-gray-900">Hoạt Động Gần Đây</h2>
                    </div>
                    <div className="card-body">
                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex-shrink-0">
                                        {getStatusIcon(activity.status)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                                        <p className="text-sm text-gray-600">{activity.action}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">{activity.time}</p>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                                            {activity.status === 'success' ? 'Thành công' :
                                                activity.status === 'pending' ? 'Chờ xử lý' :
                                                    activity.status === 'error' ? 'Lỗi' : 'Không xác định'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
                <div className="card-header">
                    <h2 className="text-lg font-semibold text-gray-900">Thao Tác Nhanh</h2>
                </div>
                <div className="card-body">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                            <Users className="w-8 h-8 text-blue-600 mb-2" />
                            <span className="text-sm font-medium text-gray-900">Quản Lý Users</span>
                        </button>

                        <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                            <ShoppingCart className="w-8 h-8 text-green-600 mb-2" />
                            <span className="text-sm font-medium text-gray-900">Quản Lý Orders</span>
                        </button>

                        <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                            <Package className="w-8 h-8 text-purple-600 mb-2" />
                            <span className="text-sm font-medium text-gray-900">Quản Lý Services</span>
                        </button>

                        <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                            <Settings className="w-8 h-8 text-orange-600 mb-2" />
                            <span className="text-sm font-medium text-gray-900">Cài Đặt</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage; 