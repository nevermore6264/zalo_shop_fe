'use client';

import React, { useState } from 'react';
import {
    Search,
    ChevronDown,
    ChevronUp,
    Settings,
    Eye,
    Download,
    RefreshCw
} from 'lucide-react';

const PurchaseHistoryPage = () => {
    const [showEntries, setShowEntries] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data for purchase history
    const purchaseHistory = [
        {
            id: 1,
            code: 'DH001',
            productName: 'Tài khoản Zalo Premium',
            available: 5,
            payment: '500.000 VNĐ',
            time: '2024-01-15 14:30',
            status: 'completed'
        },
        {
            id: 2,
            code: 'DH002',
            productName: 'Proxy HTTP Viettel',
            available: 10,
            payment: '200.000 VNĐ',
            time: '2024-01-14 09:15',
            status: 'completed'
        },
        {
            id: 3,
            code: 'DH003',
            productName: 'Tài khoản Zalo Business',
            available: 2,
            payment: '1.000.000 VNĐ',
            time: '2024-01-13 16:45',
            status: 'pending'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Informational Message */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm">
                    Thay đổi ghi chú nạp tiền trong Cài Đặt → Ghi chú nạp tiền
                </p>
            </div>

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
                        onChange={(e) => setShowEntries(Number(e.target.value))}
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
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Tìm kiếm..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                            <span>Code</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </th>
                                    <th className="p-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center space-x-1">
                                            <span>Tên sản phẩm</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </th>
                                    <th className="p-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center space-x-1">
                                            <span>Hiện có</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </th>
                                    <th className="p-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center space-x-1">
                                            <span>Thanh toán</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </th>
                                    <th className="p-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center space-x-1">
                                            <span>Thời gian</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </th>
                                    <th className="p-4 text-left font-medium text-gray-700">
                                        <Settings className="w-4 h-4" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchaseHistory.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="p-8 text-center text-gray-500">
                                            No data available in table
                                        </td>
                                    </tr>
                                ) : (
                                    purchaseHistory.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="p-4 font-medium">{order.id}</td>
                                            <td className="p-4 font-mono text-sm">{order.code}</td>
                                            <td className="p-4">{order.productName}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.available > 0
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {order.available}
                                                </span>
                                            </td>
                                            <td className="p-4 font-medium text-green-600">{order.payment}</td>
                                            <td className="p-4 text-sm text-gray-600">{order.time}</td>
                                            <td className="p-4">
                                                <div className="flex items-center space-x-2">
                                                    <button className="p-1 hover:bg-gray-100 rounded" title="Xem chi tiết">
                                                        <Eye className="w-4 h-4 text-blue-600" />
                                                    </button>
                                                    <button className="p-1 hover:bg-gray-100 rounded" title="Tải xuống">
                                                        <Download className="w-4 h-4 text-green-600" />
                                                    </button>
                                                    <button className="p-1 hover:bg-gray-100 rounded" title="Làm mới">
                                                        <RefreshCw className="w-4 h-4 text-orange-600" />
                                                    </button>
                                                    <button className="p-1 hover:bg-gray-100 rounded" title="Cài đặt">
                                                        <Settings className="w-4 h-4 text-gray-600" />
                                                    </button>
                                                </div>
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
    );
};

export default PurchaseHistoryPage; 