'use client';
import React, { useState } from 'react';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    CreditCard,
    Users,
    ShoppingCart,
    Calendar,
    Download,
    Filter,
    Search,
    BarChart3,
    PieChart,
    LineChart,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    Eye,
    MoreHorizontal,
    RefreshCw,
    Settings,
    Clock,
    XCircle
} from 'lucide-react';

const AdminRevenuePage = () => {
    const [dateRange, setDateRange] = useState('30days');
    const [selectedPeriod, setSelectedPeriod] = useState('daily');

    // Mock data for revenue analytics
    const revenueData = {
        totalRevenue: 125000000,
        monthlyGrowth: 12.5,
        totalOrders: 2847,
        averageOrderValue: 43900,
        activeCustomers: 1247,
        conversionRate: 3.2,
        refundRate: 1.8
    };

    // Mock data for revenue chart (last 30 days)
    const chartData = [
        { date: '2024-01-01', revenue: 3200000, orders: 45, customers: 38 },
        { date: '2024-01-02', revenue: 4100000, orders: 52, customers: 44 },
        { date: '2024-01-03', revenue: 3800000, orders: 48, customers: 41 },
        { date: '2024-01-04', revenue: 5200000, orders: 67, customers: 58 },
        { date: '2024-01-05', revenue: 4800000, orders: 61, customers: 54 },
        { date: '2024-01-06', revenue: 6100000, orders: 78, customers: 69 },
        { date: '2024-01-07', revenue: 5500000, orders: 71, customers: 63 },
        { date: '2024-01-08', revenue: 4200000, orders: 54, customers: 47 },
        { date: '2024-01-09', revenue: 4600000, orders: 59, customers: 52 },
        { date: '2024-01-10', revenue: 5300000, orders: 68, customers: 61 },
        { date: '2024-01-11', revenue: 4900000, orders: 63, customers: 56 },
        { date: '2024-01-12', revenue: 5800000, orders: 74, customers: 66 },
        { date: '2024-01-13', revenue: 5200000, orders: 67, customers: 60 },
        { date: '2024-01-14', revenue: 4700000, orders: 60, customers: 53 },
        { date: '2024-01-15', revenue: 5400000, orders: 69, customers: 62 },
        { date: '2024-01-16', revenue: 5000000, orders: 64, customers: 57 },
        { date: '2024-01-17', revenue: 5600000, orders: 72, customers: 65 },
        { date: '2024-01-18', revenue: 5100000, orders: 66, customers: 59 },
        { date: '2024-01-19', revenue: 5900000, orders: 76, customers: 68 },
        { date: '2024-01-20', revenue: 5400000, orders: 70, customers: 63 },
        { date: '2024-01-21', revenue: 4800000, orders: 62, customers: 55 },
        { date: '2024-01-22', revenue: 5200000, orders: 67, customers: 60 },
        { date: '2024-01-23', revenue: 5700000, orders: 73, customers: 66 },
        { date: '2024-01-24', revenue: 5300000, orders: 68, customers: 61 },
        { date: '2024-01-25', revenue: 5000000, orders: 64, customers: 58 },
        { date: '2024-01-26', revenue: 5800000, orders: 75, customers: 67 },
        { date: '2024-01-27', revenue: 5500000, orders: 71, customers: 64 },
        { date: '2024-01-28', revenue: 5100000, orders: 66, customers: 59 },
        { date: '2024-01-29', revenue: 5400000, orders: 70, customers: 63 },
        { date: '2024-01-30', revenue: 5200000, orders: 68, customers: 61 }
    ];

    // Mock data for revenue by category
    const categoryData = [
        { category: 'Proxy Tĩnh', revenue: 45000000, percentage: 36, color: 'bg-blue-500' },
        { category: 'Proxy Động', revenue: 38000000, percentage: 30.4, color: 'bg-purple-500' },
        { category: 'Tài khoản Zalo', revenue: 25000000, percentage: 20, color: 'bg-green-500' },
        { category: 'Dịch vụ khác', revenue: 17000000, percentage: 13.6, color: 'bg-orange-500' }
    ];

    // Mock data for recent transactions
    const recentTransactions = [
        {
            id: 'TXN-001',
            customer: 'Nguyễn Văn A',
            service: 'Proxy Tĩnh - Gói A',
            amount: 500000,
            status: 'completed',
            date: '2024-01-20 15:30',
            paymentMethod: 'Bank Transfer'
        },
        {
            id: 'TXN-002',
            customer: 'Trần Thị B',
            service: 'Proxy Động - Gói B',
            amount: 800000,
            status: 'completed',
            date: '2024-01-20 14:45',
            paymentMethod: 'Credit Card'
        },
        {
            id: 'TXN-003',
            customer: 'Lê Văn C',
            service: 'Tài khoản Zalo Premium',
            amount: 1200000,
            status: 'pending',
            date: '2024-01-20 14:20',
            paymentMethod: 'E-wallet'
        },
        {
            id: 'TXN-004',
            customer: 'Phạm Thị D',
            service: 'Proxy Tĩnh - Gói C',
            amount: 600000,
            status: 'completed',
            date: '2024-01-20 13:55',
            paymentMethod: 'Bank Transfer'
        },
        {
            id: 'TXN-005',
            customer: 'Hoàng Văn E',
            service: 'Dịch vụ tư vấn',
            amount: 300000,
            status: 'refunded',
            date: '2024-01-20 13:30',
            paymentMethod: 'Credit Card'
        },
        {
            id: 'TXN-006',
            customer: 'Vũ Thị F',
            service: 'Proxy Động - Gói A',
            amount: 400000,
            status: 'completed',
            date: '2024-01-20 13:15',
            paymentMethod: 'E-wallet'
        },
        {
            id: 'TXN-007',
            customer: 'Đặng Văn G',
            service: 'Tài khoản Zalo Standard',
            amount: 800000,
            status: 'completed',
            date: '2024-01-20 12:45',
            paymentMethod: 'Bank Transfer'
        },
        {
            id: 'TXN-008',
            customer: 'Bùi Thị H',
            service: 'Proxy Tĩnh - Gói Premium',
            amount: 1500000,
            status: 'pending',
            date: '2024-01-20 12:20',
            paymentMethod: 'Credit Card'
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
            case 'completed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'refunded': return 'bg-red-100 text-red-800';
            case 'failed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <TrendingUp className="w-4 h-4" />;
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'refunded': return <TrendingDown className="w-4 h-4" />;
            case 'failed': return <XCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    // Calculate chart statistics
    const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);
    const totalOrders = chartData.reduce((sum, item) => sum + item.orders, 0);
    const totalCustomers = chartData.reduce((sum, item) => sum + item.customers, 0);
    const averageRevenue = Math.round(totalRevenue / chartData.length);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản Lý Doanh Thu</h1>
                    <p className="text-gray-600 mt-1">Phân tích và theo dõi doanh thu hệ thống</p>
                </div>
                <div className="flex items-center space-x-2">
                    <TrendingUp className="w-6 h-6 text-red-500" />
                    <span className="text-sm text-gray-500">Revenue Analytics</span>
                </div>
            </div>

            {/* Revenue Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Tổng doanh thu</p>
                            <p className="text-3xl font-bold text-gray-900">{formatCurrency(revenueData.totalRevenue)}</p>
                            <div className="flex items-center mt-2">
                                <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                                <span className="text-sm text-green-600 font-medium">+{revenueData.monthlyGrowth}%</span>
                                <span className="text-sm text-gray-500 ml-1">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Tổng đơn hàng</p>
                            <p className="text-3xl font-bold text-gray-900">{revenueData.totalOrders.toLocaleString()}</p>
                            <div className="flex items-center mt-2">
                                <ArrowUpRight className="w-4 h-4 text-blue-600 mr-1" />
                                <span className="text-sm text-blue-600 font-medium">+8.2%</span>
                                <span className="text-sm text-gray-500 ml-1">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <ShoppingCart className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Giá trị đơn hàng TB</p>
                            <p className="text-3xl font-bold text-gray-900">{formatCurrency(revenueData.averageOrderValue)}</p>
                            <div className="flex items-center mt-2">
                                <ArrowUpRight className="w-4 h-4 text-purple-600 mr-1" />
                                <span className="text-sm text-purple-600 font-medium">+5.7%</span>
                                <span className="text-sm text-gray-500 ml-1">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Khách hàng hoạt động</p>
                            <p className="text-3xl font-bold text-gray-900">{revenueData.activeCustomers.toLocaleString()}</p>
                            <div className="flex items-center mt-2">
                                <ArrowUpRight className="w-4 h-4 text-orange-600 mr-1" />
                                <span className="text-sm text-orange-600 font-medium">+12.3%</span>
                                <span className="text-sm text-gray-500 ml-1">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Controls */}
            <div className="card">
                <div className="card-body">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h3 className="text-lg font-semibold text-gray-900">Biểu đồ doanh thu</h3>
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
                                    value={selectedPeriod}
                                    onChange={(e) => setSelectedPeriod(e.target.value)}
                                    className="input"
                                >
                                    <option value="daily">Theo ngày</option>
                                    <option value="weekly">Theo tuần</option>
                                    <option value="monthly">Theo tháng</option>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 card">
                    <div className="card-body">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Doanh thu theo thời gian</h3>
                            <div className="flex items-center space-x-4 text-sm">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                    <span>Doanh thu</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                    <span>Đơn hàng</span>
                                </div>
                            </div>
                        </div>

                        {/* Simple Bar Chart */}
                        <div className="h-64 flex items-end justify-between space-x-1">
                            {chartData.slice(-14).map((item, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center">
                                    <div className="w-full bg-blue-100 rounded-t" style={{ height: `${(item.revenue / 7000000) * 200}px` }}>
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
                                <p className="text-sm text-gray-600">Tổng doanh thu</p>
                                <p className="text-lg font-semibold text-gray-900">{formatCurrency(totalRevenue)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Trung bình/ngày</p>
                                <p className="text-lg font-semibold text-gray-900">{formatCurrency(averageRevenue)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Tổng đơn hàng</p>
                                <p className="text-lg font-semibold text-gray-900">{totalOrders}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Revenue by Category */}
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Doanh thu theo danh mục</h3>

                        <div className="space-y-4">
                            {categoryData.map((category, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className={`w-3 h-3 rounded-full mr-3 ${category.color}`}></div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{category.category}</p>
                                            <p className="text-xs text-gray-500">{category.percentage}%</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900">{formatCurrency(category.revenue)}</p>
                                </div>
                            ))}
                        </div>

                        {/* Simple Pie Chart */}
                        <div className="mt-6 flex justify-center">
                            <div className="relative w-32 h-32">
                                <div className="absolute inset-0 rounded-full border-8 border-blue-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 86.6% 0%, 86.6% 50%)' }}></div>
                                <div className="absolute inset-0 rounded-full border-8 border-purple-500" style={{ clipPath: 'polygon(50% 50%, 86.6% 50%, 86.6% 100%, 50% 100%)' }}></div>
                                <div className="absolute inset-0 rounded-full border-8 border-green-500" style={{ clipPath: 'polygon(50% 50%, 50% 100%, 13.4% 100%, 13.4% 50%)' }}></div>
                                <div className="absolute inset-0 rounded-full border-8 border-orange-500" style={{ clipPath: 'polygon(50% 50%, 13.4% 50%, 13.4% 0%, 50% 0%)' }}></div>
                                <div className="absolute inset-0 rounded-full bg-white flex items-center justify-center">
                                    <span className="text-sm font-semibold text-gray-900">100%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="card">
                <div className="card-body">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Giao dịch gần đây</h3>
                        <button className="btn btn-outline btn-sm">
                            Xem tất cả
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="p-4 text-left">Mã GD</th>
                                    <th className="p-4 text-left">Khách hàng</th>
                                    <th className="p-4 text-left">Dịch vụ</th>
                                    <th className="p-4 text-right">Số tiền</th>
                                    <th className="p-4 text-left">Trạng thái</th>
                                    <th className="p-4 text-left">Phương thức</th>
                                    <th className="p-4 text-left">Ngày</th>
                                    <th className="p-4 text-left">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentTransactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-gray-50 border-b">
                                        <td className="p-4 font-mono text-sm font-semibold text-gray-900">
                                            {transaction.id}
                                        </td>
                                        <td className="p-4">
                                            <div className="font-medium text-gray-900">{transaction.customer}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm text-gray-900">{transaction.service}</div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="font-semibold text-gray-900">{formatCurrency(transaction.amount)}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center">
                                                {getStatusIcon(transaction.status)}
                                                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                                                    {transaction.status === 'completed' ? 'Hoàn thành' :
                                                        transaction.status === 'pending' ? 'Đang xử lý' :
                                                            transaction.status === 'refunded' ? 'Hoàn tiền' : 'Thất bại'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">
                                            {transaction.paymentMethod}
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">
                                            {transaction.date}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card">
                    <div className="card-body text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Activity className="w-8 h-8 text-blue-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Tỷ lệ chuyển đổi</h4>
                        <p className="text-3xl font-bold text-blue-600">{revenueData.conversionRate}%</p>
                        <p className="text-sm text-gray-500 mt-1">Từ truy cập thành đơn hàng</p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <TrendingUp className="w-8 h-8 text-green-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Tăng trưởng</h4>
                        <p className="text-3xl font-bold text-green-600">+{revenueData.monthlyGrowth}%</p>
                        <p className="text-sm text-gray-500 mt-1">So với tháng trước</p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <TrendingDown className="w-8 h-8 text-red-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Tỷ lệ hoàn tiền</h4>
                        <p className="text-3xl font-bold text-red-600">{revenueData.refundRate}%</p>
                        <p className="text-sm text-gray-500 mt-1">Tổng giao dịch</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRevenuePage; 