'use client';

import React, { useState } from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    MessageCircle,
    User,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });

            // Reset status after 3 seconds
            setTimeout(() => setSubmitStatus('idle'), 3000);
        }, 2000);
    };

    const contactInfo = [
        {
            icon: Phone,
            title: 'Điện thoại',
            value: '089.95.96.345',
            description: 'Hỗ trợ 24/7',
            color: 'bg-green-500',
            link: 'tel:0899596345'
        },
        {
            icon: Mail,
            title: 'Email',
            value: 'contact@zaloshop.com',
            description: 'Phản hồi trong 24h',
            color: 'bg-blue-500',
            link: 'mailto:contact@zaloshop.com'
        },
        {
            icon: MessageCircle,
            title: 'Telegram',
            value: '@dichvuzalo',
            description: 'Hỗ trợ nhanh nhất',
            color: 'bg-purple-500',
            link: 'https://t.me/dichvuzalo'
        },
        {
            icon: MapPin,
            title: 'Địa chỉ',
            value: 'Hà Nội, Việt Nam',
            description: 'Trụ sở chính',
            color: 'bg-orange-500',
            link: '#'
        }
    ];

    const subjects = [
        'Hỗ trợ kỹ thuật',
        'Mua dịch vụ',
        'Thanh toán',
        'Tài khoản',
        'Khác'
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">Liên Hệ</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất.
                </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contactInfo.map((info, index) => (
                    <a
                        key={index}
                        href={info.link}
                        className="group"
                        target={info.link.startsWith('http') ? '_blank' : '_self'}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    >
                        <div className="card hover:scale-105 transition-all duration-300 group-hover:shadow-xl">
                            <div className="card-body text-center">
                                <div className={`inline-flex p-3 rounded-full ${info.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <info.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                                <p className="text-gray-600 font-medium mb-1">{info.value}</p>
                                <p className="text-sm text-gray-500">{info.description}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="space-y-6">
                    <div className="text-center lg:text-left">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Gửi tin nhắn</h2>
                        <p className="text-gray-600">Điền form bên dưới để liên hệ với chúng tôi</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name and Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
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
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
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
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
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
                                    <option value="">Chọn chủ đề</option>
                                    {subjects.map((subject, index) => (
                                        <option key={index} value={subject}>{subject}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
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
                            disabled={isSubmitting}
                            className="btn btn-primary w-full flex items-center justify-center space-x-2 h-12 text-base font-medium"
                        >
                            {isSubmitting ? (
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

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <span className="text-green-800">Tin nhắn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm nhất.</span>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                <span className="text-red-800">Có lỗi xảy ra. Vui lòng thử lại sau.</span>
                            </div>
                        )}
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
                                <h3 className="text-lg font-semibold text-gray-900">Giờ làm việc</h3>
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
                            <h3 className="text-lg font-semibold text-gray-900">Câu hỏi thường gặp</h3>
                        </div>
                        <div className="card-body">
                            <div className="space-y-4">
                                <div className="border-b border-gray-200 pb-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Thời gian phản hồi là bao lâu?</h4>
                                    <p className="text-sm text-gray-600">Chúng tôi thường phản hồi trong vòng 24 giờ làm việc.</p>
                                </div>
                                <div className="border-b border-gray-200 pb-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Có hỗ trợ khẩn cấp không?</h4>
                                    <p className="text-sm text-gray-600">Có, chúng tôi hỗ trợ khẩn cấp 24/7 qua Telegram và điện thoại.</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Có thể liên hệ qua kênh nào?</h4>
                                    <p className="text-sm text-gray-600">Bạn có thể liên hệ qua điện thoại, email, Telegram hoặc form trên trang này.</p>
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