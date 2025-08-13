"use client";

import React, { useState } from "react";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
} from "lucide-react";
import { subjectOptions } from "@/utils/subjectMapping";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contacts/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.message || "Có lỗi xảy ra, vui lòng thử lại");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Lỗi kết nối, vui lòng thử lại sau");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.name && formData.email && formData.subject && formData.message;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Liên Hệ</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Hãy liên hệ với chúng tôi để
          được tư vấn và hỗ trợ tốt nhất.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card hover:scale-105 transition-all duration-300 group-hover:shadow-xl">
          <div className="card-body text-center">
            <div className="inline-flex p-3 rounded-full bg-green-500 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Điện thoại
            </h3>
            <p className="text-gray-600 font-medium mb-1">089.95.96.345</p>
            <p className="text-sm text-gray-500">Hỗ trợ 24/7</p>
          </div>
        </div>

        <div className="card hover:scale-105 transition-all duration-300 group-hover:shadow-xl">
          <div className="card-body text-center">
            <div className="inline-flex p-3 rounded-full bg-blue-500 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600 font-medium mb-1">
              contact@zaloshop.com
            </p>
            <p className="text-sm text-gray-500">Phản hồi trong 24h</p>
          </div>
        </div>

        <div className="card hover:scale-105 transition-all duration-300 group-hover:shadow-xl">
          <div className="card-body text-center">
            <div className="inline-flex p-3 rounded-full bg-purple-500 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Telegram
            </h3>
            <p className="text-gray-600 font-medium mb-1">@dichvuzalo</p>
            <p className="text-sm text-gray-500">Hỗ trợ nhanh nhất</p>
          </div>
        </div>

        <div className="card hover:scale-105 transition-all duration-300 group-hover:shadow-xl">
          <div className="card-body text-center">
            <div className="inline-flex p-3 rounded-full bg-orange-500 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Địa chỉ
            </h3>
            <p className="text-gray-600 font-medium mb-1">Hà Nội, Việt Nam</p>
            <p className="text-sm text-gray-500">Trụ sở chính</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Gửi tin nhắn
            </h2>
            <p className="text-gray-600">
              Điền form bên dưới để liên hệ với chúng tôi
            </p>
          </div>

          {/* Success/Error Messages */}
          {submitStatus === "success" && (
            <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-green-800">
                Tin nhắn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm nhất.
              </span>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span className="text-red-800">{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Họ và tên *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="input w-full"
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="input w-full"
                  placeholder="Nhập email"
                />
              </div>
            </div>

            {/* Phone and Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input w-full"
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Chủ đề *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="input w-full"
                >
                  {subjectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nội dung tin nhắn *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="input w-full resize-none"
                placeholder="Nhập nội dung tin nhắn..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="btn btn-primary w-full flex items-center justify-center space-x-2 h-12 text-base font-medium"
            >
              {loading ? (
                <>
                  <div className="spinner w-5 h-5"></div>
                  <span>Đang gửi...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Gửi tin nhắn</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Additional Info */}
        <div className="space-y-8">
          {/* Working Hours */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Giờ làm việc
                </h3>
              </div>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Thứ 2 - Thứ 6</span>
                  <span className="font-medium">8:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Thứ 7</span>
                  <span className="font-medium">8:00 - 12:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Chủ nhật</span>
                  <span className="font-medium text-orange-600">Nghỉ</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Hỗ trợ khẩn cấp</span>
                    <span className="font-medium text-green-600">24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">
                Câu hỏi thường gặp
              </h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Thời gian phản hồi là bao lâu?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Chúng tôi thường phản hồi trong vòng 24 giờ làm việc.
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Có hỗ trợ khẩn cấp không?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Có, chúng tôi hỗ trợ khẩn cấp 24/7 qua Telegram và điện
                    thoại.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Có thể liên hệ qua kênh nào?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Bạn có thể liên hệ qua điện thoại, email, Telegram hoặc form
                    trên trang này.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
