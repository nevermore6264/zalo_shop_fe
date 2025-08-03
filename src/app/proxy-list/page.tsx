'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
    Copy,
    Trash2,
    Download,
    RefreshCw,
    Search,
    ChevronDown,
    ChevronUp,
    Eye,
    Edit,
    Plus
} from 'lucide-react';

const ProxyListPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'static' | 'dynamic'>('static');

    // Read tab from URL parameters
    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab === 'dynamic' || tab === 'static') {
            setActiveTab(tab);
        }
    }, [searchParams]);

    // Handle tab change
    const handleTabChange = (tab: 'static' | 'dynamic') => {
        setActiveTab(tab);
        router.push(`/proxy-list?tab=${tab}`);
    };
    const [showEntries, setShowEntries] = useState(25);
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data for static proxies
    const staticProxies = [
        {
            id: 1,
            package: 'Gói A',
            network: 'Viettel',
            httpProxy: '192.168.1.1:8080',
            type: 'HTTP',
            expires: '2024-12-31',
            status: 'active'
        },
        {
            id: 2,
            package: 'Gói B',
            network: 'Mobifone',
            httpProxy: '192.168.1.2:8080',
            type: 'SOCKS5',
            expires: '2024-11-30',
            status: 'active'
        }
    ];

    // Mock data for dynamic proxies
    const dynamicProxies = [
        {
            id: 1,
            package: 'Gói C',
            network: 'VinaPhone',
            httpProxy: '192.168.2.1:8080',
            type: 'HTTP',
            expires: '2024-12-31',
            status: 'active'
        }
    ];

    const currentData = activeTab === 'static' ? staticProxies : dynamicProxies;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Danh sách proxy</h1>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => handleTabChange('dynamic')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'dynamic'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Danh Sách Proxy Động
                    </button>
                    <button
                        onClick={() => handleTabChange('static')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'static'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Danh Sách Proxy Tĩnh
                    </button>
                </nav>
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

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
                <button className="btn btn-outline btn-sm flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Nhập nhiều IP Allow</span>
                </button>
                <button className="btn btn-outline btn-sm flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Lấy với IP Allow</span>
                </button>
                <button className="btn btn-primary btn-sm flex items-center space-x-2">
                    <Copy className="w-4 h-4" />
                    <span>Sao chép nhiều</span>
                </button>
                <button className="btn btn-success btn-sm flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Lấy nhiều</span>
                </button>
                <button className="btn btn-warning btn-sm flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4" />
                    <span>Gia hạn nhiều</span>
                </button>
                <button className="btn btn-error btn-sm flex items-center space-x-2">
                    <Trash2 className="w-4 h-4" />
                    <span>Xoá nhiều</span>
                </button>
            </div>

            {/* Table */}
            <div className="card">
                <div className="card-body p-0">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="p-4 text-left">
                                        <input type="checkbox" className="checkbox checkbox-sm" />
                                    </th>
                                    <th className="p-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center space-x-1">
                                            <span>Gói</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </th>
                                    <th className="p-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center space-x-1">
                                            <span>Nhà mạng</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </th>
                                    <th className="p-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center space-x-1">
                                            <span>Proxy HTTP</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </th>
                                    <th className="p-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center space-x-1">
                                            <span>Loại</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </th>
                                    <th className="p-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center space-x-1">
                                            <span>Hết hạn</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </th>
                                    <th className="p-4 text-left font-medium text-gray-700">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="p-8 text-center text-gray-500">
                                            No data available in table
                                        </td>
                                    </tr>
                                ) : (
                                    currentData.map((proxy) => (
                                        <tr key={proxy.id} className="hover:bg-gray-50">
                                            <td className="p-4">
                                                <input type="checkbox" className="checkbox checkbox-sm" />
                                            </td>
                                            <td className="p-4 font-medium">{proxy.package}</td>
                                            <td className="p-4">{proxy.network}</td>
                                            <td className="p-4 font-mono text-sm">{proxy.httpProxy}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${proxy.type === 'HTTP'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-green-100 text-green-800'
                                                    }`}>
                                                    {proxy.type}
                                                </span>
                                            </td>
                                            <td className="p-4">{proxy.expires}</td>
                                            <td className="p-4">
                                                <div className="flex items-center space-x-2">
                                                    <button className="p-1 hover:bg-gray-100 rounded" title="Xem">
                                                        <Eye className="w-4 h-4 text-blue-600" />
                                                    </button>
                                                    <button className="p-1 hover:bg-gray-100 rounded" title="Sửa">
                                                        <Edit className="w-4 h-4 text-green-600" />
                                                    </button>
                                                    <button className="p-1 hover:bg-gray-100 rounded" title="Sao chép">
                                                        <Copy className="w-4 h-4 text-orange-600" />
                                                    </button>
                                                    <button className="p-1 hover:bg-gray-100 rounded" title="Xóa">
                                                        <Trash2 className="w-4 h-4 text-red-600" />
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

export default ProxyListPage; 