"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  AlertCircle,
  Star,
  Shield,
  Clock,
  Users,
  CheckCircle,
  Zap,
  Loader2,
  X,
} from "lucide-react";
import { zaloAccountsAPI } from "@/services/accounts";
import { authService } from "@/services/auth";

interface ZaloAccount {
  id: number;
  title: string;
  description: string;
  price: number;
  status: string;
  features: string[];
  is_hot?: boolean;
  available_count: number;
}

const AccountsServicesPage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [zaloAccounts, setZaloAccounts] = useState<ZaloAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchasingAccount, setPurchasingAccount] = useState<number | null>(
    null
  );

  // Fetch Zalo accounts on component mount
  useEffect(() => {
    fetchZaloAccounts();
  }, []);

  const fetchZaloAccounts = async () => {
    try {
      setAccountsLoading(true);
      const accounts = await zaloAccountsAPI.getAvailableAccounts();
      setZaloAccounts(accounts);
    } catch (err: any) {
      setError(err.message || "Không thể tải danh sách tài khoản");
    } finally {
      setAccountsLoading(false);
    }
  };

  const handlePurchaseAccount = async (accountId: number) => {
    try {
      setPurchasingAccount(accountId);
      setError(null);

      const result = await zaloAccountsAPI.purchaseAccount({
        account_id: accountId,
      });

      // Show success message with credentials
      alert(
        `Mua tài khoản thành công!\n\nThông tin đăng nhập:\nTài khoản: ${result.credentials.username}\nMật khẩu: ${result.credentials.password}\n\nVui lòng lưu lại thông tin này!`
      );

      // Refresh accounts list to update availability
      fetchZaloAccounts();
    } catch (err: any) {
      setError(err.message || "Không thể mua tài khoản");
    } finally {
      setPurchasingAccount(null);
    }
  };

  if (accountsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">
          Đang tải danh sách tài khoản...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 rounded-2xl p-8 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-xl">Z</span>
            </div>
            <h1 className="text-4xl font-bold">Mua Tài Khoản Zalo</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Chọn tài khoản Zalo chất lượng cao với bảo hành 1 đổi 1. Tất cả tài
            khoản đều được xác minh và hỗ trợ 24/7.
          </p>
        </div>

        {/* Floating elements */}
        <div className="absolute top-4 left-4 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
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

      {/* Warning Banner */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 shadow-lg">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">
              Lưu ý quan trọng
            </h3>
            <p className="text-white/90">
              Đối với nick không có bạn bè, khách hàng cần kết bạn tối thiểu 10
              bạn bè để Admin có thể hỗ trợ XÁC THỰC
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {zaloAccounts.length}
              </p>
              <p className="text-sm text-gray-600">Loại tài khoản</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">100%</p>
              <p className="text-sm text-gray-600">Tài khoản thật</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">1:1</p>
              <p className="text-sm text-gray-600">Bảo hành</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">24/7</p>
              <p className="text-sm text-gray-600">Hỗ trợ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {zaloAccounts.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <div className="text-gray-500 text-lg">
              Không có tài khoản nào khả dụng
            </div>
          </div>
        ) : (
          zaloAccounts.map((account) => (
            <div
              key={account.id}
              className={`relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                hoveredCard === account.id ? "ring-2 ring-blue-500" : ""
              }`}
              onMouseEnter={() => setHoveredCard(account.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Hot Badge */}
              {account.is_hot && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Bán Chạy</span>
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white font-bold text-lg">Z</span>
                      </div>
                      <h3 className="text-xl font-bold">{account.title}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">
                        {account.price.toLocaleString()}₫
                      </div>
                      <div className="text-blue-200 text-sm">Giá</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Description */}
                <p className="text-gray-700 leading-relaxed">
                  {account.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2">
                  {account.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Status and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        account.status === "sold" ||
                        account.available_count === 0
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {account.status === "sold" ||
                      account.available_count === 0
                        ? "HẾT HÀNG"
                        : `Còn lại: ${account.available_count}`}
                    </div>
                  </div>

                  <button
                    onClick={() => handlePurchaseAccount(account.id)}
                    disabled={
                      account.status === "sold" ||
                      account.available_count === 0 ||
                      purchasingAccount === account.id
                    }
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                      account.status === "sold" || account.available_count === 0
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-lg transform hover:scale-105"
                    }`}
                  >
                    {purchasingAccount === account.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Đang xử lý...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>
                          {account.status === "sold" ||
                          account.available_count === 0
                            ? "HẾT HÀNG"
                            : "MUA NGAY"}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Hover Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 ${
                  hoveredCard === account.id ? "opacity-100" : ""
                }`}
              ></div>
            </div>
          ))
        )}
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tại sao chọn chúng tôi?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cam kết cung cấp dịch vụ chất lượng cao với sự hỗ trợ tận
            tâm
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tài khoản thật 100%
            </h3>
            <p className="text-gray-600">
              Tất cả tài khoản đều là người dùng thật, đã xác minh CCCD
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Bảo hành 1 đổi 1
            </h3>
            <p className="text-gray-600">
              Bảo hành sai pass, login lỗi 1 đổi 1 ngay lập tức
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Hỗ trợ 24/7
            </h3>
            <p className="text-gray-600">
              Hỗ trợ gỡ xác thực, định danh khi cần thiết
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsServicesPage;
