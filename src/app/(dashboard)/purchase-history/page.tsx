"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  Settings,
  Eye,
  Download,
  RefreshCw,
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
  credentials?: {
    username: string;
    password: string;
  };
}

const PurchaseHistoryPage = () => {
  const [showEntries, setShowEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  // Fetch orders on component mount and when pagination/search changes
  useEffect(() => {
    fetchOrders();
  }, [currentPage, showEntries, searchTerm]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersAPI.getUserOrders({
        page: currentPage,
        limit: showEntries,
        search: searchTerm,
      });
      setOrders(response.data);
      setTotalPages(response.pagination.totalPages);
      setTotalOrders(response.pagination.total);
    } catch (err: any) {
      setError(err.message || "Không thể tải lịch sử đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: {
      [key: string]: { bg: string; text: string; label: string };
    } = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "Chờ xử lý",
      },
      processing: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "Đang xử lý",
      },
      completed: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Hoàn thành",
      },
      cancelled: { bg: "bg-red-100", text: "text-red-800", label: "Đã hủy" },
      failed: { bg: "bg-gray-100", text: "text-gray-800", label: "Thất bại" },
    };

    const statusConfig = statusMap[status] || statusMap["pending"];
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}
      >
        {statusConfig.label}
      </span>
    );
  };

  const getProductName = (order: Order) => {
    if (order.order_type === "zalo_service") {
      return order.service_name || "Dịch vụ Zalo";
    } else {
      return order.account_title || "Tài khoản Zalo";
    }
  };

  const handleViewDetails = (order: Order) => {
    let details = `Đơn hàng #${order.id}\n`;
    details += `Loại: ${
      order.order_type === "zalo_service" ? "Dịch vụ Zalo" : "Tài khoản Zalo"
    }\n`;
    details += `Sản phẩm: ${getProductName(order)}\n`;
    details += `Số lượng: ${order.quantity}\n`;
    details += `Tổng tiền: ${order.total_amount.toLocaleString()} VNĐ\n`;
    details += `Trạng thái: ${getStatusBadge(order.status).props.children}\n`;
    details += `Ngày tạo: ${new Date(order.created_at).toLocaleString(
      "vi-VN"
    )}\n`;

    if (order.zalo_link) {
      details += `Link Zalo: ${order.zalo_link}\n`;
    }
    if (order.notes) {
      details += `Ghi chú: ${order.notes}\n`;
    }
    if (order.credentials) {
      details += `\nThông tin đăng nhập:\n`;
      details += `Tài khoản: ${order.credentials.username}\n`;
      details += `Mật khẩu: ${order.credentials.password}\n`;
    }

    alert(details);
  };

  const handleDownload = (order: Order) => {
    let content = `Đơn hàng #${order.id}\n`;
    content += `Loại: ${
      order.order_type === "zalo_service" ? "Dịch vụ Zalo" : "Tài khoản Zalo"
    }\n`;
    content += `Sản phẩm: ${getProductName(order)}\n`;
    content += `Số lượng: ${order.quantity}\n`;
    content += `Tổng tiền: ${order.total_amount.toLocaleString()} VNĐ\n`;
    content += `Trạng thái: ${getStatusBadge(order.status).props.children}\n`;
    content += `Ngày tạo: ${new Date(order.created_at).toLocaleString(
      "vi-VN"
    )}\n`;

    if (order.zalo_link) {
      content += `Link Zalo: ${order.zalo_link}\n`;
    }
    if (order.notes) {
      content += `Ghi chú: ${order.notes}\n`;
    }
    if (order.credentials) {
      content += `\nThông tin đăng nhập:\n`;
      content += `Tài khoản: ${order.credentials.username}\n`;
      content += `Mật khẩu: ${order.credentials.password}\n`;
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `order_${order.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    fetchOrders();
  };

  if (loading && orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Đang tải lịch sử đơn hàng...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Informational Message */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-gray-600 text-sm">
          Thay đổi ghi chú nạp tiền trong Cài Đặt → Ghi chú nạp tiền
        </p>
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

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">ĐƠN HÀNG GẦN ĐÂY</h1>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Show</span>
          <select
            value={showEntries}
            onChange={(e) => {
              setShowEntries(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-sm text-gray-700">entries</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Search:</span>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Tìm kiếm..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-body p-0">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Đang tải dữ liệu...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-4 text-left font-medium text-gray-700">
                      #
                    </th>
                    <th className="p-4 text-left font-medium text-gray-700">
                      Loại
                    </th>
                    <th className="p-4 text-left font-medium text-gray-700">
                      Sản phẩm
                    </th>
                    <th className="p-4 text-left font-medium text-gray-700">
                      Số lượng
                    </th>
                    <th className="p-4 text-left font-medium text-gray-700">
                      Tổng tiền
                    </th>
                    <th className="p-4 text-left font-medium text-gray-700">
                      Thời gian
                    </th>
                    <th className="p-4 text-left font-medium text-gray-700">
                      Trạng thái
                    </th>
                    <th className="p-4 text-left font-medium text-gray-700">
                      <Settings className="w-4 h-4" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-gray-500">
                        Không có dữ liệu
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="p-4 font-medium">{order.id}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.order_type === "zalo_service"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {order.order_type === "zalo_service"
                              ? "Dịch vụ"
                              : "Tài khoản"}
                          </span>
                        </td>
                        <td className="p-4">{getProductName(order)}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {order.quantity}
                          </span>
                        </td>
                        <td className="p-4 font-medium text-green-600">
                          {order.total_amount.toLocaleString()} VNĐ
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {new Date(order.created_at).toLocaleString("vi-VN")}
                        </td>
                        <td className="p-4">{getStatusBadge(order.status)}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleViewDetails(order)}
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Xem chi tiết"
                            >
                              <Eye className="w-4 h-4 text-blue-600" />
                            </button>
                            <button
                              onClick={() => handleDownload(order)}
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Tải xuống"
                            >
                              <Download className="w-4 h-4 text-green-600" />
                            </button>
                            <button
                              onClick={handleRefresh}
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Làm mới"
                            >
                              <RefreshCw className="w-4 h-4 text-orange-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="text-sm text-gray-700">
          Hiển thị {(currentPage - 1) * showEntries + 1} đến{" "}
          {Math.min(currentPage * showEntries, totalOrders)} trong tổng số{" "}
          {totalOrders} bản ghi
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="btn btn-outline btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trước
          </button>
          <span className="px-3 py-1 text-sm text-gray-700">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="btn btn-outline btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryPage;
