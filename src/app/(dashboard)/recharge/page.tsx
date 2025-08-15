"use client";

import React, { useState, useEffect } from "react";
import {
  QrCode,
  Copy,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Clock,
  ArrowRight,
  Download,
  Loader2,
  X,
} from "lucide-react";
import { rechargeAPI } from "@/services/recharge";
import { authService } from "@/services/auth";

interface BankAccount {
  id: number;
  bank_name: string;
  account_name: string;
  account_number: string;
  branch: string;
  qr_code_url?: string;
}

interface RechargeRequest {
  id: number;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  admin_notes?: string;
}

const RechargePage = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(100000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<"qr" | "manual">("qr");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bankInfo, setBankInfo] = useState<BankAccount | null>(null);
  const [rechargeHistory, setRechargeHistory] = useState<RechargeRequest[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const amounts = [
    { value: 50000, label: "50.000 VNĐ" },
    { value: 100000, label: "100.000 VNĐ" },
    { value: 200000, label: "200.000 VNĐ" },
    { value: 500000, label: "500.000 VNĐ" },
    { value: 1000000, label: "1.000.000 VNĐ" },
    { value: 2000000, label: "2.000.000 VNĐ" },
  ];

  // Fetch bank info and recharge history on component mount
  useEffect(() => {
    fetchBankInfo();
    fetchRechargeHistory();
  }, []);

  const fetchBankInfo = async () => {
    try {
      const bankData = await rechargeAPI.getBankInfo();
      setBankInfo(bankData);
    } catch (err: any) {
      setError(err.message || "Không thể tải thông tin ngân hàng");
    }
  };

  const fetchRechargeHistory = async () => {
    try {
      const history = await rechargeAPI.getUserRechargeHistory();
      setRechargeHistory(history);
    } catch (err: any) {
      console.error("Error fetching recharge history:", err);
    }
  };

  const generateVietQR = () => {
    if (!bankInfo) return "";

    const vietQRData = {
      bankBin: "970436", // Vietcombank BIN
      accountNo: bankInfo.account_number,
      amount: selectedAmount,
      description: `NAP_TIEN_${Date.now()}`,
    };

    const qrString = JSON.stringify(vietQRData);
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      qrString
    )}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseInt(value.replace(/\D/g, ""));
    if (numValue > 0) {
      setSelectedAmount(numValue);
    }
  };

  const handleCreateRechargeRequest = async () => {
    if (finalAmount < 10000) {
      setError("Số tiền tối thiểu là 10.000 VNĐ");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await rechargeAPI.createRechargeRequest({
        amount: finalAmount,
        notes: `Nạp tiền ${finalAmount.toLocaleString()} VNĐ`,
      });

      setSuccess(
        "Yêu cầu nạp tiền đã được tạo thành công! Vui lòng chuyển khoản theo thông tin bên dưới."
      );

      // Refresh recharge history
      fetchRechargeHistory();

      // Reset form
      setSelectedAmount(100000);
      setCustomAmount("");
    } catch (err: any) {
      setError(err.message || "Không thể tạo yêu cầu nạp tiền");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: {
      [key: string]: { bg: string; text: string; label: string; icon: any };
    } = {
      pending: {
        bg: "bg-yellow-50",
        text: "text-yellow-600",
        label: "Chờ xử lý",
        icon: Clock,
      },
      approved: {
        bg: "bg-green-50",
        text: "text-green-600",
        label: "Thành công",
        icon: CheckCircle,
      },
      rejected: {
        bg: "bg-red-50",
        text: "text-red-600",
        label: "Từ chối",
        icon: X,
      },
    };

    const statusConfig = statusMap[status] || statusMap["pending"];
    const IconComponent = statusConfig.icon;

    return (
      <div
        className={`flex items-center space-x-2 ${statusConfig.bg} ${statusConfig.text} px-3 py-1 rounded-full text-sm font-medium`}
      >
        <IconComponent className="w-4 h-4" />
        <span>{statusConfig.label}</span>
      </div>
    );
  };

  const finalAmount = customAmount
    ? parseInt(customAmount.replace(/\D/g, ""))
    : selectedAmount;

  if (!bankInfo) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">
          Đang tải thông tin ngân hàng...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Nạp Tiền</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Nạp tiền vào tài khoản để sử dụng các dịch vụ Zalo Shop. Hỗ trợ chuyển
          khoản qua QR code hoặc thủ công.
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

      {/* Success Alert */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-800">{success}</p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setSuccess(null)}
                className="inline-flex text-green-400 hover:text-green-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side - Amount Selection */}
        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold text-gray-900">
                Chọn số tiền
              </h2>
            </div>
            <div className="card-body">
              {/* Quick Amount Selection */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {amounts.map((amount) => (
                  <button
                    key={amount.value}
                    onClick={() => handleAmountSelect(amount.value)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedAmount === amount.value && !customAmount
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                    }`}
                  >
                    <div className="font-semibold">{amount.label}</div>
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Hoặc nhập số tiền tùy chọn
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder="Nhập số tiền (VNĐ)"
                    className="input w-full"
                  />
                </div>
              </div>

              {/* Final Amount Display */}
              <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">
                    Số tiền cần nạp:
                  </span>
                  <span className="text-2xl font-bold text-orange-600">
                    {finalAmount.toLocaleString()} VNĐ
                  </span>
                </div>
              </div>

              {/* Create Request Button */}
              <button
                onClick={handleCreateRechargeRequest}
                disabled={loading || finalAmount < 10000}
                className="btn btn-primary w-full mt-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang tạo yêu cầu...
                  </>
                ) : (
                  "Tạo yêu cầu nạp tiền"
                )}
              </button>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold text-gray-900">
                Phương thức thanh toán
              </h2>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <button
                  onClick={() => setSelectedMethod("qr")}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-center space-x-3 ${
                    selectedMethod === "qr"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <QrCode className="w-6 h-6 text-orange-600" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">QR Code</div>
                    <div className="text-sm text-gray-600">
                      Quét mã QR để chuyển khoản nhanh
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedMethod("manual")}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-center space-x-3 ${
                    selectedMethod === "manual"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">
                      Chuyển khoản thủ công
                    </div>
                    <div className="text-sm text-gray-600">
                      Sao chép thông tin tài khoản
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Payment Details */}
        <div className="space-y-6">
          {selectedMethod === "qr" ? (
            /* QR Code Payment */
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-gray-900">
                  Chuyển khoản qua QR Code
                </h2>
              </div>
              <div className="card-body">
                <div className="text-center space-y-6">
                  {/* QR Code */}
                  <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300">
                    <img
                      src={generateVietQR()}
                      alt="QR Code"
                      className="mx-auto w-64 h-64"
                    />
                  </div>

                  {/* Instructions */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <Smartphone className="w-4 h-4" />
                      <span>Mở app ngân hàng và quét mã QR</span>
                    </div>

                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Giao dịch sẽ được xử lý trong 5-10 phút</span>
                    </div>
                  </div>

                  {/* Download QR */}
                  <button className="btn btn-outline flex items-center space-x-2 mx-auto">
                    <Download className="w-4 h-4" />
                    <span>Tải QR Code</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Manual Transfer */
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-gray-900">
                  Thông tin chuyển khoản
                </h2>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  {/* Bank Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">
                        Ngân hàng:
                      </span>
                      <span className="font-semibold">
                        {bankInfo.bank_name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">
                        Tên tài khoản:
                      </span>
                      <span className="font-semibold">
                        {bankInfo.account_name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">
                        Số tài khoản:
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold font-mono">
                          {bankInfo.account_number}
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(bankInfo.account_number)
                          }
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          {copied ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">
                        Chi nhánh:
                      </span>
                      <span className="font-semibold">{bankInfo.branch}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">
                        Nội dung:
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold font-mono text-sm">
                          NAP_TIEN_{Date.now()}
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(`NAP_TIEN_${Date.now()}`)
                          }
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          {copied ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Amount Display */}
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">
                        Số tiền cần chuyển:
                      </div>
                      <div className="text-2xl font-bold text-orange-600">
                        {finalAmount.toLocaleString()} VNĐ
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4" />
                      <span>Sao chép thông tin tài khoản</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4" />
                      <span>Chuyển khoản với nội dung chính xác</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4" />
                      <span>
                        Tiền sẽ được cộng vào tài khoản trong 5-10 phút
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Important Notes */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">
                Lưu ý quan trọng
              </h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">
                      Nội dung chuyển khoản
                    </div>
                    <div className="text-sm text-gray-600">
                      Vui lòng ghi đúng nội dung để tiền được cộng nhanh chóng
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">
                      Thời gian xử lý
                    </div>
                    <div className="text-sm text-gray-600">
                      Giao dịch sẽ được xử lý trong 5-10 phút trong giờ hành
                      chính
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Hỗ trợ 24/7</div>
                    <div className="text-sm text-gray-600">
                      Liên hệ hỗ trợ nếu giao dịch chưa được cộng tiền
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold text-gray-900">
            Giao dịch gần đây
          </h2>
        </div>
        <div className="card-body">
          {rechargeHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Chưa có giao dịch nào
            </div>
          ) : (
            <div className="space-y-4">
              {rechargeHistory.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">₫</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        +{transaction.amount.toLocaleString()} VNĐ
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(transaction.created_at).toLocaleString(
                          "vi-VN"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(transaction.status)}
                    {transaction.admin_notes && (
                      <div className="text-xs text-gray-500 mt-1">
                        {transaction.admin_notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RechargePage;
