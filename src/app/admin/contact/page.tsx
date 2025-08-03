'use client';

import React, { useState } from 'react';
import {
    Phone,
    Mail,
    MessageCircle,
    MapPin,
    Clock,
    User,
    Send,
    Eye,
    Trash,
    Reply,
    Archive,
    Search,
    Filter,
    Download,
    Plus,
    Edit,
    Save,
    X
} from 'lucide-react';

const AdminContactPage = () => {
    const [activeTab, setActiveTab] = useState<'info' | 'messages' | 'faq'>('info');
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [contactInfo, setContactInfo] = useState({
        phone: '089.95.96.345',
        phoneDescription: 'Hỗ trợ 24/7',
        email: 'contact@zaloshop.com',
        emailDescription: 'Phản hồi trong 24h',
        telegram: '@dichvuzalo',
        telegramDescription: 'Hỗ trợ nhanh nhất',
        address: 'Hà Nội, Việt Nam',
        addressDescription: 'Trụ sở chính',
        description: 'Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất.'
    });

    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    // Mock data for contact messages
    const contactMessages = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@email.com',
            phone: '0123456789',
            subject: 'Hỗ trợ kỹ thuật',
            message: 'Tôi gặp vấn đề khi sử dụng dịch vụ proxy...',
            status: 'pending',
            priority: 'high',
            date: '2024-01-15'
        },
        {
            id: 2,
            name: 'Trần Thị B',
            email: 'tranthib@email.com',
            phone: '0987654321',
            subject: 'Thanh toán',
            message: 'Tôi muốn hỏi về phương thức thanh toán...',
            status: 'replied',
            priority: 'normal',
            date: '2024-01-14'
        },
        {
            id: 3,
            name: 'Lê Văn C',
            email: 'levanc@email.com',
            phone: '0369852147',
            subject: 'Tư vấn dịch vụ',
            message: 'Tôi cần tư vấn về dịch vụ Zalo...',
            status: 'archived',
            priority: 'urgent',
            date: '2024-01-13'
        }
    ];

    // Mock data for FAQ
    const faqItems = [
        {
            id: 1,
            question: 'Thời gian phản hồi là bao lâu?',
            answer: 'Chúng tôi thường phản hồi trong vòng 24 giờ làm việc.'
        },
        {
            id: 2,
            question: 'Có hỗ trợ khẩn cấp không?',
            answer: 'Có, chúng tôi hỗ trợ khẩn cấp 24/7 qua Telegram và điện thoại.'
        },
        {
            id: 3,
            question: 'Có thể liên hệ qua kênh nào?',
            answer: 'Bạn có thể liên hệ qua điện thoại, email, Telegram hoặc form trên trang này.'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'replied': return 'bg-green-100 text-green-800';
            case 'archived': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'bg-red-100 text-red-800';
            case 'high': return 'bg-orange-100 text-orange-800';
            case 'normal': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Contact form submitted:', contactForm);
        // Reset form
        setContactForm({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản Lý Liên Hệ</h1>
                    <p className="text-gray-600 mt-1">Quản lý thông tin liên hệ và tin nhắn khách hàng</p>
                </div>
                <div className="flex items-center space-x-2">
                    <MessageCircle className="w-6 h-6 text-red-500" />
                    <span className="text-sm text-gray-500">Contact Management</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                    onClick={() => setActiveTab('info')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'info' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Thông Tin Liên Hệ
                </button>
                <button
                    onClick={() => setActiveTab('messages')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'messages' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Tin Nhắn Khách Hàng
                </button>
                <button
                    onClick={() => setActiveTab('faq')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'faq' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Câu Hỏi Thường Gặp
                </button>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'info' && (
                <div className="space-y-6">
                    {/* Contact Information */}
                    <div className="card">
                        <div className="card-header">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Thông Tin Liên Hệ</h2>
                                    <p className="text-sm text-gray-600">{contactInfo.description}</p>
                                </div>
                                <div className="flex space-x-2">
                                    {!isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="btn btn-outline btn-sm bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                                        >
                                            <Edit className="w-4 h-4 mr-2" />
                                            Chỉnh sửa
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="btn btn-outline btn-sm bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                                            >
                                                <Save className="w-4 h-4 mr-2" />
                                                Lưu
                                            </button>
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="btn btn-outline btn-sm bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                                            >
                                                <X className="w-4 h-4 mr-2" />
                                                Hủy
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            {!isEditing ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Phone className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Điện thoại</h3>
                                        <p className="text-lg font-bold text-blue-600 mb-1">{contactInfo.phone}</p>
                                        <p className="text-sm text-gray-600">{contactInfo.phoneDescription}</p>
                                    </div>

                                    <div className="text-center p-6 bg-green-50 rounded-lg">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Mail className="w-6 h-6 text-green-600" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                                        <p className="text-lg font-bold text-green-600 mb-1">{contactInfo.email}</p>
                                        <p className="text-sm text-gray-600">{contactInfo.emailDescription}</p>
                                    </div>

                                    <div className="text-center p-6 bg-purple-50 rounded-lg">
                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <MessageCircle className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Telegram</h3>
                                        <p className="text-lg font-bold text-purple-600 mb-1">{contactInfo.telegram}</p>
                                        <p className="text-sm text-gray-600">{contactInfo.telegramDescription}</p>
                                    </div>

                                    <div className="text-center p-6 bg-orange-50 rounded-lg">
                                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <MapPin className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Địa chỉ</h3>
                                        <p className="text-lg font-bold text-orange-600 mb-1">{contactInfo.address}</p>
                                        <p className="text-sm text-gray-600">{contactInfo.addressDescription}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-900">Điện thoại</h3>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Số điện thoại
                                            </label>
                                            <input
                                                type="text"
                                                value={contactInfo.phone}
                                                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                                                className="input w-full"
                                                placeholder="Nhập số điện thoại"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Mô tả
                                            </label>
                                            <input
                                                type="text"
                                                value={contactInfo.phoneDescription}
                                                onChange={(e) => setContactInfo({ ...contactInfo, phoneDescription: e.target.value })}
                                                className="input w-full"
                                                placeholder="Ví dụ: Hỗ trợ 24/7"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-900">Email</h3>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Địa chỉ email
                                            </label>
                                            <input
                                                type="email"
                                                value={contactInfo.email}
                                                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                                                className="input w-full"
                                                placeholder="Nhập email"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Mô tả
                                            </label>
                                            <input
                                                type="text"
                                                value={contactInfo.emailDescription}
                                                onChange={(e) => setContactInfo({ ...contactInfo, emailDescription: e.target.value })}
                                                className="input w-full"
                                                placeholder="Ví dụ: Phản hồi trong 24h"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-900">Telegram</h3>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Username Telegram
                                            </label>
                                            <input
                                                type="text"
                                                value={contactInfo.telegram}
                                                onChange={(e) => setContactInfo({ ...contactInfo, telegram: e.target.value })}
                                                className="input w-full"
                                                placeholder="Ví dụ: @dichvuzalo"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Mô tả
                                            </label>
                                            <input
                                                type="text"
                                                value={contactInfo.telegramDescription}
                                                onChange={(e) => setContactInfo({ ...contactInfo, telegramDescription: e.target.value })}
                                                className="input w-full"
                                                placeholder="Ví dụ: Hỗ trợ nhanh nhất"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-900">Địa chỉ</h3>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Địa chỉ
                                            </label>
                                            <input
                                                type="text"
                                                value={contactInfo.address}
                                                onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                                                className="input w-full"
                                                placeholder="Ví dụ: Hà Nội, Việt Nam"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Mô tả
                                            </label>
                                            <input
                                                type="text"
                                                value={contactInfo.addressDescription}
                                                onChange={(e) => setContactInfo({ ...contactInfo, addressDescription: e.target.value })}
                                                className="input w-full"
                                                placeholder="Ví dụ: Trụ sở chính"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'messages' && (
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-lg font-semibold text-gray-900">Tin Nhắn Khách Hàng</h2>
                        <p className="text-sm text-gray-600">Quản lý tin nhắn từ khách hàng</p>
                    </div>
                    <div className="card-body">
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm tin nhắn..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="input pl-10 w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="btn btn-outline btn-sm">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Lọc
                                </button>
                                <button className="btn btn-outline btn-sm">
                                    <Download className="w-4 h-4 mr-2" />
                                    Xuất
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Người gửi</th>
                                        <th>Email</th>
                                        <th>Chủ đề</th>
                                        <th>Trạng thái</th>
                                        <th>Độ ưu tiên</th>
                                        <th>Ngày</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contactMessages.map((message) => (
                                        <tr key={message.id}>
                                            <td>{message.id}</td>
                                            <td>
                                                <div>
                                                    <div className="font-medium">{message.name}</div>
                                                    <div className="text-sm text-gray-500">{message.phone}</div>
                                                </div>
                                            </td>
                                            <td>{message.email}</td>
                                            <td>{message.subject}</td>
                                            <td>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(message.status)}`}>
                                                    {message.status === 'pending' ? 'Chờ xử lý' :
                                                        message.status === 'replied' ? 'Đã trả lời' : 'Đã lưu trữ'}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(message.priority)}`}>
                                                    {message.priority === 'urgent' ? 'Khẩn cấp' :
                                                        message.priority === 'high' ? 'Cao' : 'Bình thường'}
                                                </span>
                                            </td>
                                            <td>{message.date}</td>
                                            <td>
                                                <div className="flex space-x-2">
                                                    <button className="btn btn-sm btn-outline">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button className="btn btn-sm btn-outline">
                                                        <Reply className="w-4 h-4" />
                                                    </button>
                                                    <button className="btn btn-sm btn-outline">
                                                        <Archive className="w-4 h-4" />
                                                    </button>
                                                    <button className="btn btn-sm btn-outline text-red-600">
                                                        <Trash className="w-4 h-4" />
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
            )}

            {activeTab === 'faq' && (
                <div className="card">
                    <div className="card-header">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Câu Hỏi Thường Gặp</h2>
                                <p className="text-sm text-gray-600">Quản lý câu hỏi và câu trả lời</p>
                            </div>
                            <button className="btn btn-primary btn-sm bg-red-600 hover:bg-red-700 text-white">
                                <Plus className="w-4 h-4 mr-2" />
                                Thêm câu hỏi
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="space-y-4">
                            {faqItems.map((faq) => (
                                <div key={faq.id} className="border rounded-lg p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                            <p className="text-gray-600">{faq.answer}</p>
                                        </div>
                                        <div className="flex space-x-2 ml-4">
                                            <button className="btn btn-sm btn-outline">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="btn btn-sm btn-outline text-red-600">
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminContactPage; 