'use client';

import React, { useState } from 'react';
import {
    ShoppingCart,
    Eye,
    History,
    Search,
    ChevronDown,
    Plus,
    Minus,
    X
} from 'lucide-react';

const ZaloServicesPage = () => {
    const [activeTab, setActiveTab] = useState<'services' | 'history'>('services');
    const [selectedService, setSelectedService] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [zaloLink, setZaloLink] = useState<string>('');
    const [showServiceDropdown, setShowServiceDropdown] = useState(false);

    // Zalo services data
    const zaloServices = [
        {
            id: 1,
            name: 'Tăng like Zalo',
            price: 2000,
            unit: 'like',
            description: 'Tăng lượt thích cho bài đăng Zalo'
        },
        {
            id: 2,
            name: 'Tăng comment Zalo',
            price: 2000,
            unit: 'ctm',
            description: 'Tăng bình luận cho bài đăng Zalo'
        },
        {
            id: 3,
            name: 'Tăng quan tâm Zalo OA',
            price: 1500,
            unit: 'người',
            description: 'Tăng người quan tâm cho Official Account'
        },
        {
            id: 4,
            name: 'Tăng thành viên nhóm Zalo',
            price: 2500,
            unit: 'mem',
            description: 'Tăng thành viên cho nhóm Zalo'
        },
        {
            id: 5,
            name: 'Tặng bạn bè',
            price: 2000,
            unit: 'mem',
            description: 'Tăng bạn bè cho tài khoản Zalo'
        }
    ];

    // Mock order history data
    const orderHistory = [
        {
            id: 1,
            service: 'Tăng like Zalo',
            amount: 50,
            pay: 100000,
            url: 'https://zalo.me/example',
            createdAt: '2024-01-15 14:30',
            updatedAt: '2024-01-15 16:45',
            status: 'completed'
        },
        {
            id: 2,
            service: 'Tăng comment Zalo',
            amount: 20,
            pay: 40000,
            url: 'https://zalo.me/example2',
            createdAt: '2024-01-14 09:15',
            updatedAt: '2024-01-14 11:30',
            status: 'processing'
        }
    ];

    const selectedServiceData = zaloServices.find(service =>
        `${service.name} (${service.price.toLocaleString()}đ/${service.unit})` === selectedService
    );

    const totalPrice = selectedServiceData ? selectedServiceData.price * quantity : 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">Dịch Vụ Zalo</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Tăng tương tác, like, comment và thành viên cho tài khoản Zalo của bạn
                </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center">
                <div className="bg-gray-100 rounded-lg p-1">
                    <div className="flex space-x-1">
                        <button
                            onClick={() => setActiveTab('services')}
                            className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 ${activeTab === 'services'
                                ? 'bg-white text-blue-600 shadow-md'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <span>Danh sách dịch vụ</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 ${activeTab === 'history'
                                ? 'bg-white text-blue-600 shadow-md'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <History className="w-5 h-5" />
                            <span>Lịch sử đơn hàng</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'services' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Service Request Form */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-2xl font-bold text-gray-900">Yêu cầu dịch vụ</h2>
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
                                                    setSelectedService('');
                                                }}
                                                className="p-1 hover:bg-gray-200 rounded"
                                            >
                                                <X className="w-4 h-4 text-gray-500" />
                                            </button>
                                        )}
                                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showServiceDropdown ? 'rotate-180' : ''
                                            }`} />
                                    </div>

                                    {/* Dropdown */}
                                    {showServiceDropdown && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                            {zaloServices.map((service) => (
                                                <div
                                                    key={service.id}
                                                    onClick={() => {
                                                        setSelectedService(`${service.name} (${service.price.toLocaleString()}đ/${service.unit})`);
                                                        setShowServiceDropdown(false);
                                                    }}
                                                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                                >
                                                    <div className="font-medium text-gray-900">
                                                        {service.name} ({service.price.toLocaleString()}đ/{service.unit})
                                                    </div>
                                                    <div className="text-sm text-gray-600">{service.description}</div>
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
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
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
                                    placeholder="Nhập link Zalo hoặc số điện thoại + ghi chú..."
                                    className="input w-full"
                                />
                            </div>

                            {/* Total Price */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-medium text-gray-700">Tổng tiền:</span>
                                    <span className="text-2xl font-bold text-blue-600">
                                        {totalPrice.toLocaleString()} ₫
                                    </span>
                                </div>
                            </div>

                            {/* Order Button */}
                            <button className="btn btn-primary w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Tạo đơn hàng
                            </button>
                        </div>
                    </div>

                    {/* Service Details */}
                    <div className="card">
                        <div className="card-header">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">Chi tiết dịch vụ</h2>
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
                                        <strong>Ví dụ:</strong> 0986584223 + Bài 1 - 50 like, bài thứ 3 - 100 like,...
                                        (Vị trí bài mới nhất từ trên xuống)
                                    </p>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                                    <div>
                                        <p className="text-gray-700 font-medium">Hoàn thiện trong vòng 24h</p>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <p className="text-sm text-yellow-800">
                                        <strong>Lưu ý:</strong> Để tăng like tài khoản cần lên business pro, và mở công khai bài đăng
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
                            <select className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                                    placeholder="Tìm kiếm..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="card">
                        <div className="card-body p-0">
                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="p-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100">
                                                <div className="flex items-center space-x-1">
                                                    <span>#</span>
                                                    <ChevronDown className="w-4 h-4" />
                                                </div>
                                            </th>
                                            <th className="p-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100">
                                                <div className="flex items-center space-x-1">
                                                    <span>Service</span>
                                                    <ChevronDown className="w-4 h-4" />
                                                </div>
                                            </th>
                                            <th className="p-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100">
                                                <div className="flex items-center space-x-1">
                                                    <span>Amount</span>
                                                    <ChevronDown className="w-4 h-4" />
                                                </div>
                                            </th>
                                            <th className="p-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100">
                                                <div className="flex items-center space-x-1">
                                                    <span>Pay</span>
                                                    <ChevronDown className="w-4 h-4" />
                                                </div>
                                            </th>
                                            <th className="p-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100">
                                                <div className="flex items-center space-x-1">
                                                    <span>Url</span>
                                                    <ChevronDown className="w-4 h-4" />
                                                </div>
                                            </th>
                                            <th className="p-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100">
                                                <div className="flex items-center space-x-1">
                                                    <span>Created at</span>
                                                    <ChevronDown className="w-4 h-4" />
                                                </div>
                                            </th>
                                            <th className="p-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100">
                                                <div className="flex items-center space-x-1">
                                                    <span>Updated at</span>
                                                    <ChevronDown className="w-4 h-4" />
                                                </div>
                                            </th>
                                            <th className="p-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100">
                                                <div className="flex items-center space-x-1">
                                                    <span>Status</span>
                                                    <ChevronDown className="w-4 h-4" />
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderHistory.length === 0 ? (
                                            <tr>
                                                <td colSpan={8} className="p-8 text-center text-gray-500">
                                                    No data available in table
                                                </td>
                                            </tr>
                                        ) : (
                                            orderHistory.map((order) => (
                                                <tr key={order.id} className="hover:bg-gray-50">
                                                    <td className="p-4 font-medium">{order.id}</td>
                                                    <td className="p-4">{order.service}</td>
                                                    <td className="p-4">{order.amount}</td>
                                                    <td className="p-4 font-medium text-green-600">{order.pay.toLocaleString()}₫</td>
                                                    <td className="p-4">
                                                        <div className="max-w-xs truncate text-sm text-blue-600 hover:text-blue-800">
                                                            {order.url}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-sm text-gray-600">{order.createdAt}</td>
                                                    <td className="p-4 text-sm text-gray-600">{order.updatedAt}</td>
                                                    <td className="p-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'completed'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                            {order.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <div className="text-sm text-gray-700">
                            Showing 0 to 0 of 0 entries
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="btn btn-outline btn-sm" disabled>
                                Previous
                            </button>
                            <button className="btn btn-outline btn-sm" disabled>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ZaloServicesPage; 