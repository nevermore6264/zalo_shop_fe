"use client";

import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { getSubjectLabel } from "@/utils/subjectMapping";
import {
  MessageCircle,
  Search,
  Filter,
  Download,
  Eye,
  Reply,
  Archive,
  Trash,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Edit,
  X,
} from "lucide-react";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "pending" | "replied" | "archived" | "spam";
  priority: "low" | "normal" | "high" | "urgent";
  admin_notes?: string;
  created_at: string;
  replied_at?: string;
  replied_by?: number;
}

interface MessageStats {
  total_messages: number;
  pending_messages: number;
  replied_messages: number;
  archived_messages: number;
  urgent_messages: number;
  high_messages: number;
  messages_this_week: number;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const AdminContactPage = () => {
  const [activeTab, setActiveTab] = useState<"messages" | "faq">("messages");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [stats, setStats] = useState<MessageStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({ show: false, message: "", type: "info" });
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [replySubject, setReplySubject] = useState("");

  // Show toast notification
  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setToast({ show: true, message, type });
    setTimeout(
      () => setToast({ show: false, message: "", type: "info" }),
      3000
    );
  };

  // Fetch messages
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(statusFilter && { status: statusFilter }),
        ...(priorityFilter && { priority: priorityFilter }),
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/contacts/admin/messages?${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch("/api/contacts/admin/messages/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // Fetch FAQs
  const fetchFaqs = async () => {
    try {
      const response = await fetch("/api/contacts/admin/faqs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFaqs(data);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  // Create/Update FAQ
  const saveFaq = async (faqData: Partial<FAQ>) => {
    try {
      const url = editingFaq
        ? `/api/contacts/admin/faqs/${editingFaq.id}`
        : "/api/contacts/admin/faqs";
      const method = editingFaq ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(faqData),
      });

      if (response.ok) {
        fetchFaqs();
        setShowFaqModal(false);
        setEditingFaq(null);
        showToast(
          `FAQ ${editingFaq ? "cập nhật" : "tạo"} thành công`,
          "success"
        );
      } else {
        const data = await response.json();
        showToast(data.message || "Có lỗi xảy ra", "error");
      }
    } catch (error) {
      console.error("Error saving FAQ:", error);
      showToast("Có lỗi xảy ra khi lưu FAQ", "error");
    }
  };

  // Delete FAQ
  const deleteFaq = async (faqId: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa FAQ này?")) return;

    try {
      const response = await fetch(`/api/contacts/admin/faqs/${faqId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        fetchFaqs();
        showToast("Đã xóa FAQ thành công", "success");
      } else {
        showToast("Có lỗi xảy ra khi xóa FAQ", "error");
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      showToast("Có lỗi xảy ra khi xóa FAQ", "error");
    }
  };

  // Toggle FAQ status
  const toggleFaqStatus = async (faqId: number) => {
    try {
      const response = await fetch(
        `/api/contacts/admin/faqs/${faqId}?action=toggle`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        fetchFaqs();
        showToast("Đã cập nhật trạng thái FAQ", "success");
      } else {
        showToast("Có lỗi xảy ra khi cập nhật trạng thái", "error");
      }
    } catch (error) {
      console.error("Error toggling FAQ status:", error);
      showToast("Có lỗi xảy ra khi cập nhật trạng thái", "error");
    }
  };

  useEffect(() => {
    if (activeTab === "messages") {
      fetchMessages();
      fetchStats();
    } else if (activeTab === "faq") {
      fetchFaqs();
    }
  }, [activeTab, currentPage, statusFilter, priorityFilter, searchTerm]);

  // Update message status
  const updateMessageStatus = async (
    messageId: number,
    status: string,
    adminNotes?: string
  ) => {
    try {
      const response = await fetch(
        `/api/contacts/admin/messages/${messageId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status, admin_notes: adminNotes }),
        }
      );

      if (response.ok) {
        fetchMessages();
        fetchStats();
      }
    } catch (error) {
      console.error("Error updating message status:", error);
    }
  };

  // Delete message
  const deleteMessage = async (messageId: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa tin nhắn này?")) return;

    try {
      const response = await fetch(
        `/api/contacts/admin/messages/${messageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        fetchMessages();
        fetchStats();
        showToast("Đã xóa tin nhắn thành công", "success");
      } else {
        showToast("Có lỗi xảy ra khi xóa tin nhắn", "error");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      showToast("Có lỗi xảy ra khi xóa tin nhắn", "error");
    }
  };

  // Export to Excel
  const exportToExcel = async () => {
    try {
      // Fetch all messages for export (without pagination)
      const params = new URLSearchParams({
        limit: "1000", // Get more data for export
        ...(statusFilter && { status: statusFilter }),
        ...(priorityFilter && { priority: priorityFilter }),
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/contacts/admin/messages?${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const messages = data.messages || [];

        // Prepare data for Excel
        const excelData = messages.map(
          (message: ContactMessage, index: number) => ({
            STT: index + 1,
            "Người gửi": message.name,
            Email: message.email,
            "Số điện thoại": message.phone || "",
            "Chủ đề": message.subject,
            "Nội dung": message.message,
            "Trạng thái": getStatusText(message.status),
            "Độ ưu tiên": getPriorityText(message.priority),
            "Ngày gửi": new Date(message.created_at).toLocaleString("vi-VN"),
            "Ghi chú admin": message.admin_notes || "",
          })
        );

        // Create workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // Set column widths
        const columnWidths = [
          { wch: 5 }, // STT
          { wch: 20 }, // Người gửi
          { wch: 25 }, // Email
          { wch: 15 }, // Số điện thoại
          { wch: 30 }, // Chủ đề
          { wch: 50 }, // Nội dung
          { wch: 12 }, // Trạng thái
          { wch: 12 }, // Độ ưu tiên
          { wch: 20 }, // Ngày gửi
          { wch: 30 }, // Ghi chú admin
        ];
        worksheet["!cols"] = columnWidths;

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Tin nhắn liên hệ");

        // Generate Excel file
        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
        const blob = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Download file
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `contact-messages-${
          new Date().toISOString().split("T")[0]
        }.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        showToast("Xuất Excel thành công!", "success");
      } else {
        showToast("Có lỗi xảy ra khi lấy dữ liệu để xuất Excel", "error");
      }
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      showToast("Có lỗi xảy ra khi xuất file Excel", "error");
    }
  };

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "replied":
        return "text-green-600 bg-green-100";
      case "archived":
        return "text-gray-600 bg-gray-100";
      case "spam":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "replied":
        return "Đã trả lời";
      case "archived":
        return "Đã lưu trữ";
      case "spam":
        return "Spam";
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600 bg-red-100";
      case "high":
        return "text-orange-600 bg-orange-100";
      case "normal":
        return "text-blue-600 bg-blue-100";
      case "low":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "Khẩn cấp";
      case "high":
        return "Cao";
      case "normal":
        return "Bình thường";
      case "low":
        return "Thấp";
      default:
        return priority;
    }
  };

  const openMessageModal = (message: ContactMessage) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
  };

  const openReplyModal = (message: ContactMessage) => {
    setSelectedMessage(message);
    setReplySubject(`Re: ${message.subject}`);
    setReplyMessage("");
    setShowReplyModal(true);
  };

  const sendReply = async () => {
    if (!selectedMessage || !replyMessage.trim()) {
      showToast("Vui lòng nhập nội dung trả lời", "error");
      return;
    }

    try {
      // Gửi email thông qua API hoặc extension
      const emailData = {
        to: selectedMessage.email,
        subject: replySubject,
        message: replyMessage,
        originalMessageId: selectedMessage.id,
      };

      // Có thể sử dụng EmailJS hoặc API backend để gửi email
      // Ví dụ với EmailJS:
      // emailjs.send('service_id', 'template_id', emailData, 'user_id');

      // Hoặc gửi qua API backend:
      const response = await fetch("/api/contacts/admin/messages/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        // Cập nhật trạng thái tin nhắn thành "replied"
        await updateMessageStatus(selectedMessage.id, "replied", replyMessage);
        setShowReplyModal(false);
        showToast("Đã gửi trả lời thành công", "success");
      } else {
        showToast("Có lỗi xảy ra khi gửi trả lời", "error");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      showToast("Có lỗi xảy ra khi gửi trả lời", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : toast.type === "error"
              ? "bg-red-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {toast.type === "success" && <CheckCircle className="w-5 h-5" />}
              {toast.type === "error" && <AlertTriangle className="w-5 h-5" />}
              {toast.type === "info" && <MessageCircle className="w-5 h-5" />}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() =>
                  setToast({ show: false, message: "", type: "info" })
                }
                className="inline-flex text-white hover:text-gray-200 focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản Lý Liên Hệ</h1>
          <p className="text-gray-600 mt-1">
            Quản lý tin nhắn khách hàng và câu hỏi thường gặp
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-6 h-6 text-red-500" />
          <span className="text-sm text-gray-500">Contact Management</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("messages")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "messages"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Tin Nhắn
          </button>
          <button
            onClick={() => setActiveTab("faq")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "faq"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Câu Hỏi Thường Gặp
          </button>
        </nav>
      </div>

      {/* Messages Tab Content */}
      {activeTab === "messages" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Tin Nhắn
                </h2>
                <p className="text-sm text-gray-600">
                  Quản lý tin nhắn từ khách hàng
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">
                        Tổng tin nhắn
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {stats.total_messages}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">
                        Chờ xử lý
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {stats.pending_messages}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">
                        Đã trả lời
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {stats.replied_messages}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">
                        Khẩn cấp
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {stats.urgent_messages}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm tin nhắn..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Tất cả trạng thái</option>
                  <option value="pending">Chờ xử lý</option>
                  <option value="replied">Đã trả lời</option>
                  <option value="archived">Đã lưu trữ</option>
                  <option value="spam">Spam</option>
                </select>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Tất cả độ ưu tiên</option>
                  <option value="urgent">Khẩn cấp</option>
                  <option value="high">Cao</option>
                  <option value="normal">Bình thường</option>
                  <option value="low">Thấp</option>
                </select>
                <button
                  onClick={exportToExcel}
                  className="px-3 py-2 border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Xuất
                </button>
              </div>
            </div>
          </div>

          {/* Messages Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người gửi
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chủ đề
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Độ ưu tiên
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600 mr-2"></div>
                        Đang tải...
                      </div>
                    </td>
                  </tr>
                ) : messages.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      Không có tin nhắn nào
                    </td>
                  </tr>
                ) : (
                  messages.map((message, index) => (
                    <tr key={message.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(currentPage - 1) * 10 + index + 1}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {message.name}
                          </div>
                          {message.phone && (
                            <div className="text-sm text-gray-500">
                              {message.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {message.email}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getSubjectLabel(message.subject)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            message.status
                          )}`}
                        >
                          {getStatusText(message.status)}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                            message.priority
                          )}`}
                        >
                          {getPriorityText(message.priority)}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(message.created_at).toLocaleDateString(
                          "vi-VN"
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openMessageModal(message)}
                            className="text-orange-600 hover:text-orange-900 border border-orange-300 p-1 rounded"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openReplyModal(message)}
                            className="text-green-600 hover:text-green-900 border border-green-300 p-1 rounded"
                            title="Trả lời"
                          >
                            <Reply className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteMessage(message.id)}
                            className="text-red-600 hover:text-red-900 border border-red-300 p-1 rounded"
                            title="Xóa"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Trang {currentPage} của {totalPages}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50"
                  >
                    Trước
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50"
                  >
                    Sau
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* FAQ Tab Content */}
      {activeTab === "faq" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Câu Hỏi Thường Gặp
              </h2>
              <p className="text-sm text-gray-600">
                Quản lý câu hỏi và trả lời thường gặp
              </p>
            </div>
            <button
              onClick={() => {
                setEditingFaq(null);
                setShowFaqModal(true);
              }}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Thêm FAQ
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="spinner w-8 h-8 mx-auto"></div>
              <p className="text-gray-600 mt-2">Đang tải...</p>
            </div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Chưa có FAQ nào</p>
            </div>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className={`border rounded-lg p-4 ${
                    faq.is_active
                      ? "border-gray-200 bg-white"
                      : "border-gray-100 bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-gray-900">
                          {faq.question}
                        </h3>
                        {!faq.is_active && (
                          <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">
                            Ẩn
                          </span>
                        )}
                        {faq.category && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">
                            {faq.category}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{faq.answer}</p>
                      <div className="text-xs text-gray-500">
                        Thứ tự: {faq.sort_order} | Tạo lúc:{" "}
                        {new Date(faq.created_at).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => toggleFaqStatus(faq.id)}
                        className={`p-1 rounded ${
                          faq.is_active
                            ? "text-green-600 hover:text-green-800"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                        title={faq.is_active ? "Ẩn FAQ" : "Hiện FAQ"}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingFaq(faq);
                          setShowFaqModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded"
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteFaq(faq.id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded"
                        title="Xóa"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Message Detail Modal */}
      {showMessageModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Chi tiết tin nhắn
              </h3>
              <button
                onClick={() => setShowMessageModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Người gửi
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedMessage.name}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedMessage.email}
                  </p>
                </div>
                {selectedMessage.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Số điện thoại
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedMessage.phone}
                    </p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ngày gửi
                  </label>
                  <p className="text-sm text-gray-900">
                    {new Date(selectedMessage.created_at).toLocaleString(
                      "vi-VN"
                    )}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Chủ đề
                </label>
                <p className="text-sm text-gray-900">
                  {getSubjectLabel(selectedMessage.subject)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nội dung
                </label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Trạng thái
                  </label>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      selectedMessage.status
                    )}`}
                  >
                    {getStatusText(selectedMessage.status)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Độ ưu tiên
                  </label>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                      selectedMessage.priority
                    )}`}
                  >
                    {getPriorityText(selectedMessage.priority)}
                  </span>
                </div>
              </div>

              {selectedMessage.admin_notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ghi chú admin
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedMessage.admin_notes}
                  </p>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => openReplyModal(selectedMessage)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Trả lời
                </button>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Trả lời tin nhắn
              </h3>
              <button
                onClick={() => setShowReplyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gửi đến
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedMessage.name} ({selectedMessage.email})
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tin nhắn gốc
                  </label>
                  <p className="text-sm text-gray-900">
                    {getSubjectLabel(selectedMessage.subject)}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tiêu đề
                </label>
                <input
                  type="text"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nội dung trả lời
                </label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={8}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Nhập nội dung trả lời..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={sendReply}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Gửi trả lời
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {showFaqModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingFaq ? "Chỉnh sửa FAQ" : "Thêm FAQ mới"}
              </h3>
              <button
                onClick={() => {
                  setShowFaqModal(false);
                  setEditingFaq(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FAQForm
              faq={editingFaq}
              onSubmit={saveFaq}
              onCancel={() => {
                setShowFaqModal(false);
                setEditingFaq(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// FAQ Form Component
const FAQForm = ({
  faq,
  onSubmit,
  onCancel,
}: {
  faq: FAQ | null;
  onSubmit: (data: Partial<FAQ>) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    question: faq?.question || "",
    answer: faq?.answer || "",
    category: faq?.category || "",
    is_active: faq?.is_active ?? true,
    sort_order: faq?.sort_order || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Câu hỏi *
        </label>
        <input
          type="text"
          value={formData.question}
          onChange={(e) =>
            setFormData({ ...formData, question: e.target.value })
          }
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Nhập câu hỏi..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Trả lời *
        </label>
        <textarea
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          required
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Nhập câu trả lời..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Danh mục
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="VD: Thanh toán, Hỗ trợ..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thứ tự hiển thị
          </label>
          <input
            type="number"
            value={formData.sort_order}
            onChange={(e) =>
              setFormData({ ...formData, sort_order: parseInt(e.target.value) })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="0"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_active"
          checked={formData.is_active}
          onChange={(e) =>
            setFormData({ ...formData, is_active: e.target.checked })
          }
          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
        />
        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
          Hiển thị FAQ
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          {faq ? "Cập nhật" : "Tạo FAQ"}
        </button>
      </div>
    </form>
  );
};

export default AdminContactPage;
