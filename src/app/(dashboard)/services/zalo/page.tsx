"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Eye,
  History,
  Search,
  ChevronDown,
  Plus,
  Minus,
  X,
  Loader2,
} from "lucide-react";
import { zaloServicesAPI } from "@/services/zaloServices";
import { authService } from "@/services/auth";

interface ZaloService {
  id: number;
  name: string;
  price: number;
  unit: string;
  description: string;
  status: string;
}

interface ZaloOrder {
  id: number;
  service_name: string;
  quantity: number;
  total_amount: number;
  zalo_link: string;
  notes: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const ZaloServicesPage = () => {
  const [activeTab, setActiveTab] = useState<"services" | "history">(
    "services"
  );
  const [selectedService, setSelectedService] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [zaloLink, setZaloLink] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);

  // API data states
  const [zaloServices, setZaloServices] = useState<ZaloService[]>([]);
  const [orderHistory, setOrderHistory] = useState<ZaloOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Zalo services on component mount
  useEffect(() => {
    fetchZaloServices();
  }, []);

  // Fetch order history when tab changes or pagination changes
  useEffect(() => {
    if (activeTab === "history") {
      fetchOrderHistory();
    }
  }, [activeTab, currentPage, pageSize, searchTerm]);

  const fetchZaloServices = async () => {
    try {
      setServicesLoading(true);
      const services = await zaloServicesAPI.getServices();
      setZaloServices(services);
    } catch (err: any) {
      setError(err.message || "Không thể tải danh sách dịch vụ");
    } finally {
      setServicesLoading(false);
    }
  };

  const fetchOrderHistory = async () => {
    try {
      setHistoryLoading(true);
      const response = await zaloServicesAPI.getUserOrders({
        page: currentPage,
        limit: pageSize,
        search: searchTerm,
      });
      setOrderHistory(response.data);
      setTotalPages(response.pagination.totalPages);
      setTotalOrders(response.pagination.total);
    } catch (err: any) {
      setError(err.message || "Không thể tải lịch sử đơn hàng");
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleCreateOrder = async () => {
    if (!selectedService || !zaloLink.trim()) {
      setError("Vui lòng chọn dịch vụ và nhập link Zalo");
      return;
    }

    const selectedServiceData = zaloServices.find(
      (service) =>
        `${service.name} (${service.price.toLocaleString()}đ/${
          service.unit
        })` === selectedService
    );

    if (!selectedServiceData) {
      setError("Dịch vụ không hợp lệ");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await zaloServicesAPI.createOrder({
        service_id: selectedServiceData.id,
        quantity: quantity,
        zalo_link: zaloLink.trim(),
        notes: notes.trim() || undefined,
      });

      // Reset form
      setSelectedService("");
      setQuantity(1);
      setZaloLink("");
      setNotes("");

      // Show success message (you can add a toast notification here)
      alert("Đơn hàng đã được tạo thành công!");

      // Refresh order history if on history tab
      if (activeTab === "history") {
        fetchOrderHistory();
      }
    } catch (err: any) {
      setError(err.message || "Không thể tạo đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const selectedServiceData = zaloServices.find(
    (service) =>
      `${service.name} (${service.price.toLocaleString()}đ/${service.unit})` ===
      selectedService
  );

  const totalPrice = selectedServiceData
    ? selectedServiceData.price * quantity
    : 0;

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

  if (servicesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Đang tải dịch vụ...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Dịch Vụ Zalo</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Tăng tương tác, like, comment và thành viên cho tài khoản Zalo của bạn
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

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-lg p-1">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab("services")}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeTab === "services"
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Danh sách dịch vụ</span>
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeTab === "history"
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <History className="w-5 h-5" />
              <span>Lịch sử đơn hàng</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === "services" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Request Form */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-2xl font-bold text-gray-900">
                Yêu cầu dịch vụ
              </h2>
            </div>
            <div className="card-body space-y-6">
              {/* Service Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Dịch vụ *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={selectedService}
                    onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                    placeholder="Chọn dịch vụ..."
                    className="input w-full pr-10 cursor-pointer"
                    readOnly
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    {selectedService && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedService("");
                        }}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    )}
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${
                        showServiceDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Dropdown */}
                  {showServiceDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {zaloServices
                        .filter((service) => service.status === "active")
                        .map((service) => (
                          <div
                            key={service.id}
                            onClick={() => {
                              setSelectedService(
                                `${
                                  service.name
                                } (${service.price.toLocaleString()}đ/${
                                  service.unit
                                })`
                              );
                              setShowServiceDropdown(false);
                            }}
                            className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium text-gray-900">
                              {service.name} ({service.price.toLocaleString()}đ/
                              {service.unit})
                            </div>
                            <div className="text-sm text-gray-600">
                              {service.description}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Số lượng *
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="input text-center w-20"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Zalo Link */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Link zalo *
                </label>
                <input
                  type="text"
                  value={zaloLink}
                  onChange={(e) => setZaloLink(e.target.value)}
                  placeholder="Nhập link Zalo hoặc số điện thoại..."
                  className="input w-full"
                />
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Ghi chú
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ghi chú thêm (tùy chọn)..."
                  className="input w-full h-20 resize-none"
                  rows={3}
                />
              </div>

              {/* Total Price */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-700">
                    Tổng tiền:
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    {totalPrice.toLocaleString()} ₫
                  </span>
                </div>
              </div>

              {/* Order Button */}
              <button
                onClick={handleCreateOrder}
                disabled={loading || !selectedService || !zaloLink.trim()}
                className="btn btn-primary w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Đang tạo đơn hàng...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Tạo đơn hàng
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Service Details */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Chi tiết dịch vụ
                </h2>
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Eye className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <div className="card-body space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-gray-700">
                      Nhập số điện thoại Zalo + ghi chú vào ô link Zalo
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Ví dụ:</strong> 0986584223 + Bài 1 - 50 like, bài
                    thứ 3 - 100 like,... (Vị trí bài mới nhất từ trên xuống)
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-gray-700 font-medium">
                      Hoàn thiện trong vòng 24h
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Lưu ý:</strong> Để tăng like tài khoản cần lên
                    business pro, và mở công khai bài đăng
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Order History Tab */
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Show</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
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
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="card">
            <div className="card-body p-0">
              {historyLoading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  <span className="ml-2 text-gray-600">
                    Đang tải dữ liệu...
                  </span>
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
                          Dịch vụ
                        </th>
                        <th className="p-4 text-left font-medium text-gray-700">
                          Số lượng
                        </th>
                        <th className="p-4 text-left font-medium text-gray-700">
                          Tổng tiền
                        </th>
                        <th className="p-4 text-left font-medium text-gray-700">
                          Link Zalo
                        </th>
                        <th className="p-4 text-left font-medium text-gray-700">
                          Ngày tạo
                        </th>
                        <th className="p-4 text-left font-medium text-gray-700">
                          Cập nhật
                        </th>
                        <th className="p-4 text-left font-medium text-gray-700">
                          Trạng thái
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderHistory.length === 0 ? (
                        <tr>
                          <td
                            colSpan={8}
                            className="p-8 text-center text-gray-500"
                          >
                            Không có dữ liệu
                          </td>
                        </tr>
                      ) : (
                        orderHistory.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="p-4 font-medium">{order.id}</td>
                            <td className="p-4">{order.service_name}</td>
                            <td className="p-4">{order.quantity}</td>
                            <td className="p-4 font-medium text-green-600">
                              {order.total_amount.toLocaleString()}₫
                            </td>
                            <td className="p-4">
                              <div className="max-w-xs truncate text-sm text-blue-600 hover:text-blue-800">
                                {order.zalo_link}
                              </div>
                            </td>
                            <td className="p-4 text-sm text-gray-600">
                              {new Date(order.created_at).toLocaleString(
                                "vi-VN"
                              )}
                            </td>
                            <td className="p-4 text-sm text-gray-600">
                              {new Date(order.updated_at).toLocaleString(
                                "vi-VN"
                              )}
                            </td>
                            <td className="p-4">
                              {getStatusBadge(order.status)}
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
              Hiển thị {(currentPage - 1) * pageSize + 1} đến{" "}
              {Math.min(currentPage * pageSize, totalOrders)} trong tổng số{" "}
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
      )}
    </div>
  );
};

export default ZaloServicesPage;
