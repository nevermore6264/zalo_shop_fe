import React from 'react';
import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Package,
  Shield,
  Clock,
  Star
} from 'lucide-react';

const DashboardPage = () => {
  const stats = [
    {
      title: 'Tổng Doanh Thu',
      value: '15.250.000 VNĐ',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Khách Hàng Mới',
      value: '1,234',
      change: '+8.2%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Đơn Hàng',
      value: '456',
      change: '+15.3%',
      changeType: 'positive',
      icon: ShoppingCart,
      color: 'bg-orange-500',
    },
    {
      title: 'Dịch Vụ Đang Chạy',
      value: '89',
      change: '+5.7%',
      changeType: 'positive',
      icon: Package,
      color: 'bg-purple-500',
    },
  ];

  const recentOrders = [
    {
      id: '#ORD001',
      customer: 'Nguyễn Văn A',
      service: 'Tăng Followers Zalo',
      amount: '50.000 VNĐ',
      status: 'completed',
      date: '2024-01-15',
    },
    {
      id: '#ORD002',
      customer: 'Trần Thị B',
      service: 'Mua Tài Khoản Premium',
      amount: '250.000 VNĐ',
      status: 'processing',
      date: '2024-01-15',
    },
    {
      id: '#ORD003',
      customer: 'Lê Văn C',
      service: 'Mua Proxy',
      amount: '100.000 VNĐ',
      status: 'pending',
      date: '2024-01-14',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Tổng quan hệ thống Zalo Shop</p>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-orange-500" />
          <span className="text-sm text-gray-500">Thống kê</span>
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

      {/* Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900">Đơn Hàng Gần Đây</h2>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <ShoppingCart className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.service}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{order.amount}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status === 'completed' ? 'Hoàn thành' :
                        order.status === 'processing' ? 'Đang xử lý' : 'Chờ xử lý'}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900">Thao Tác Nhanh</h2>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <Package className="w-8 h-8 text-orange-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Thêm Dịch Vụ</span>
              </button>

              <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <Users className="w-8 h-8 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Quản Lý KH</span>
              </button>

              <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <DollarSign className="w-8 h-8 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Nạp Tiền</span>
              </button>

              <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <Shield className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Bảo Mật</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="card">
        <div className="card-body">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Tại sao chọn Zalo Shop?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Giao hàng nhanh</h3>
                <p className="text-sm text-gray-600">Hoàn thành dịch vụ trong 24 giờ</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">An toàn</h3>
                <p className="text-sm text-gray-600">Bảo mật thông tin tuyệt đối</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Star className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Chất lượng</h3>
                <p className="text-sm text-gray-600">Đánh giá 4.8/5 sao từ khách hàng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
