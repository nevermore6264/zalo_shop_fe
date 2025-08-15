"use client";

import React, { useState, useEffect } from "react";
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
  ChevronUp,
  Loader2,
  X,
} from "lucide-react";
import { ordersAPI } from "@/services/orders";
import { authService } from "@/services/auth";

interface Order {
  id: number;
  order_type: "zalo_service" | "account_purchase";
  service_name?: string;
  account_title?: string;
  quantity: number;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  zalo_link?: string;
  notes?: string;
}

const InvoicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersAPI.getUserOrders({
        page: 1,
        limit: 100, // Get more orders for invoice display
        search: "",
      });
      setOrders(response.data);
    } catch (err: any) {
      setError(err.message || "Không thể tải dữ liệu hóa đơn");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "processing":
        return "text-blue-600 bg-blue-50";
      case "cancelled":
      case "failed":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Hoàn thành";
      case "pending":
        return "Chờ xử lý";
      case "processing":
        return "Đang xử lý";
      case "cancelled":
        return "Đã hủy";
      case "failed":
        return "Thất bại";
      default:
        return "Không xác định";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "processing":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
      case "failed":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getProductName = (order: Order) => {
    if (order.order_type === "zalo_service") {
      return order.service_name || "Dịch vụ Zalo";
    } else {
      return order.account_title || "Tài khoản Zalo";
    }
  };

  const getOrderTypeText = (order: Order) => {
    return order.order_type === "zalo_service"
      ? "Dịch vụ Zalo"
      : "Tài khoản Zalo";
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toString().includes(searchTerm) ||
      getProductName(order).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.notes &&
        order.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesType = typeFilter === "all" || order.order_type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const totalAmount = filteredOrders.reduce(
    (sum, order) => sum + order.total_amount,
    0
  );
  const completedAmount = filteredOrders
    .filter((order) => order.status === "completed")
    .reduce((sum, order) => sum + order.total_amount, 0);
  const pendingAmount = filteredOrders
    .filter(
      (order) => order.status === "pending" || order.status === "processing"
    )
    .reduce((sum, order) => sum + order.total_amount, 0);

  const handleViewDetails = (order: Order) => {
    let details = `Hóa đơn #${order.id}\n`;
    details += `Loại: ${getOrderTypeText(order)}\n`;
    details += `Sản phẩm: ${getProductName(order)}\n`;
    details += `Số lượng: ${order.quantity}\n`;
    details += `Tổng tiền: ${order.total_amount.toLocaleString()} VNĐ\n`;
    details += `Trạng thái: ${getStatusText(order.status)}\n`;
    details += `Ngày tạo: ${new Date(order.created_at).toLocaleString(
      "vi-VN"
    )}\n`;
    details += `Cập nhật: ${new Date(order.updated_at).toLocaleString(
      "vi-VN"
    )}\n`;

    if (order.zalo_link) {
      details += `Link Zalo: ${order.zalo_link}\n`;
    }
    if (order.notes) {
      details += `Ghi chú: ${order.notes}\n`;
    }

    alert(details);
  };

  const handleDownloadInvoice = (order: Order) => {
    let content = `HÓA ĐƠN DỊCH VỤ\n`;
    content += `================================\n\n`;
    content += `Mã hóa đơn: ${order.id}\n`;
    content += `Ngày tạo: ${new Date(order.created_at).toLocaleString(
      "vi-VN"
    )}\n`;
    content += `Loại dịch vụ: ${getOrderTypeText(order)}\n`;
    content += `Sản phẩm: ${getProductName(order)}\n`;
    content += `Số lượng: ${order.quantity}\n`;
    content += `Đơn giá: ${(
      order.total_amount / order.quantity
    ).toLocaleString()} VNĐ\n`;
    content += `Tổng tiền: ${order.total_amount.toLocaleString()} VNĐ\n`;
    content += `Trạng thái: ${getStatusText(order.status)}\n\n`;

    if (order.zalo_link) {
      content += `Thông tin bổ sung:\n`;
      content += `Link Zalo: ${order.zalo_link}\n`;
    }
    if (order.notes) {
      content += `Ghi chú: ${order.notes}\n`;
    }

    content += `\n================================\n`;
    content += `Cảm ơn quý khách đã sử dụng dịch vụ!\n`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice_${order.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Đang tải dữ liệu hóa đơn...</span>
      </div>
    );
  }

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
          <button
            onClick={() => {
              const content = filteredOrders
                .map(
                  (order) =>
                    `${order.id},${getOrderTypeText(order)},${getProductName(
                      order
                    )},${order.quantity},${order.total_amount},${getStatusText(
                      order.status
                    )},${new Date(order.created_at).toLocaleDateString(
                      "vi-VN"
                    )}`
                )
                .join("\n");
              const header =
                "ID,Loại,Sản phẩm,Số lượng,Tổng tiền,Trạng thái,Ngày tạo\n";
              const blob = new Blob([header + content], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "invoices.csv";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
            className="btn btn-outline flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Xuất Excel</span>
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <X className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setError(null)}
                className="inline-flex text-red-400 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng hóa đơn</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredOrders.length}
                </p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {totalAmount.toLocaleString()} VNĐ
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đã hoàn thành</p>
                <p className="text-2xl font-bold text-green-600">
                  {completedAmount.toLocaleString()} VNĐ
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đang xử lý</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {pendingAmount.toLocaleString()} VNĐ
                </p>
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
                  placeholder="Tìm kiếm hóa đơn, sản phẩm..."
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
              {showFilters ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
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
                    <option value="completed">Hoàn thành</option>
                    <option value="pending">Chờ xử lý</option>
                    <option value="processing">Đang xử lý</option>
                    <option value="cancelled">Đã hủy</option>
                    <option value="failed">Thất bại</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại dịch vụ
                  </label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="input w-full"
                  >
                    <option value="all">Tất cả loại</option>
                    <option value="zalo_service">Dịch vụ Zalo</option>
                    <option value="account_purchase">Tài khoản Zalo</option>
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
          <h2 className="text-xl font-semibold text-gray-900">
            Danh sách hóa đơn
          </h2>
        </div>
        <div className="card-body">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy hóa đơn
              </h3>
              <p className="text-gray-600">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Mã HĐ
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Loại
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Sản phẩm
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Số lượng
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Số tiền
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Trạng thái
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Ngày tạo
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <span className="font-mono font-medium text-gray-900">
                          #{order.id}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.order_type === "zalo_service"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {getOrderTypeText(order)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">
                          {getProductName(order)}
                        </div>
                        {order.notes && (
                          <div className="text-sm text-gray-500">
                            {order.notes}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-gray-900">
                          {order.quantity}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-gray-900">
                          {order.total_amount.toLocaleString()} VNĐ
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          <span className="ml-1">
                            {getStatusText(order.status)}
                          </span>
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center text-gray-700">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(order.created_at).toLocaleDateString(
                            "vi-VN"
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewDetails(order)}
                            className="p-1 hover:bg-gray-200 rounded"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4 text-gray-500" />
                          </button>
                          <button
                            onClick={() => handleDownloadInvoice(order)}
                            className="p-1 hover:bg-gray-200 rounded"
                            title="Tải xuống"
                          >
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
