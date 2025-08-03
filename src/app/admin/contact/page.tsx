'use client';

import React, { useState } from 'react';
import {
    MessageCircle,
    Eye,
    Trash,
    Reply,
    Archive,
    Download,
    Plus,
    Edit,
    Save,
    X,
    Filter
} from 'lucide-react';

const AdminContactPage = () => {
    const [activeTab, setActiveTab] = useState<'info' | 'messages' | 'faq'>('info');
    const [searchTerm, setSearchTerm] = useState('');
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

    // FAQ Modal states
    const [showFaqModal, setShowFaqModal] = useState(false);
    const [editingFaq, setEditingFaq] = useState<{ id: number, question: string, answer: string } | null>(null);
    const [faqForm, setFaqForm] = useState({
        question: '',
        answer: ''
    });

    // Delete confirmation modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingFaq, setDeletingFaq] = useState<{ id: number, question: string } | null>(null);

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

    // FAQ Modal handlers
    const openFaqModal = (faq?: { id: number, question: string, answer: string }) => {
        if (faq) {
            setEditingFaq(faq);
            setFaqForm({ question: faq.question, answer: faq.answer });
        } else {
            setEditingFaq(null);
            setFaqForm({ question: '', answer: '' });
        }
        setShowFaqModal(true);
    };

    const closeFaqModal = () => {
        setShowFaqModal(false);
        setEditingFaq(null);
        setFaqForm({ question: '', answer: '' });
    };

    const handleFaqSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingFaq) {
            // Update existing FAQ
            console.log('Updating FAQ:', { id: editingFaq.id, ...faqForm });
        } else {
            // Create new FAQ
            console.log('Creating new FAQ:', faqForm);
        }
        closeFaqModal();
    };

    // Delete FAQ handlers
    const openDeleteModal = (faq: { id: number, question: string }) => {
        setDeletingFaq(faq);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setDeletingFaq(null);
    };

    const handleDeleteFaq = () => {
        if (deletingFaq) {
            console.log('Deleting FAQ:', deletingFaq.id);
            // Handle delete logic here
        }
        closeDeleteModal();
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
                                    <p className="text-sm text-gray-600">Chỉnh sửa thông tin liên hệ hiển thị cho khách hàng</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => {
                                            // Handle save logic here
                                            console.log('Saving contact info:', contactInfo);
                                            alert('Đã lưu thông tin liên hệ!');
                                        }}
                                        className="btn btn-outline btn-sm bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Lưu thay đổi
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
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
                            <button
                                onClick={() => openFaqModal()}
                                className="btn btn-primary btn-sm bg-red-600 hover:bg-red-700 text-white"
                            >
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
                                            <button
                                                onClick={() => openFaqModal(faq)}
                                                className="btn btn-sm btn-outline"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(faq)}
                                                className="btn btn-sm btn-outline text-red-600"
                                            >
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

            {/* FAQ Modal */}
            {showFaqModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {editingFaq ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi mới'}
                            </h3>
                            <button
                                onClick={closeFaqModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleFaqSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Câu hỏi *
                                </label>
                                <input
                                    type="text"
                                    value={faqForm.question}
                                    onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                                    className="input w-full"
                                    placeholder="Nhập câu hỏi..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Câu trả lời *
                                </label>
                                <textarea
                                    value={faqForm.answer}
                                    onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                                    rows={4}
                                    className="input w-full"
                                    placeholder="Nhập câu trả lời..."
                                    required
                                ></textarea>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeFaqModal}
                                    className="btn btn-outline btn-sm"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-sm bg-red-600 hover:bg-red-700 text-white"
                                >
                                    {editingFaq ? 'Cập nhật' : 'Thêm mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Xác nhận xóa
                            </h3>
                            <button
                                onClick={closeDeleteModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-600 mb-2">
                                Bạn có chắc chắn muốn xóa câu hỏi này?
                            </p>
                            <p className="font-medium text-gray-900">
                                &ldquo;{deletingFaq?.question}&rdquo;
                            </p>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={closeDeleteModal}
                                className="btn btn-outline btn-sm"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleDeleteFaq}
                                className="btn btn-primary btn-sm bg-red-600 hover:bg-red-700 text-white"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminContactPage; 