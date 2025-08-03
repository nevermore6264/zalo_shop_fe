'use client';

import React, { useState, useEffect, Suspense } from 'react';
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

const ProxyListContent = () => {
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
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-700">Show entries:</span>
                        <select
                            value={showEntries}
                            onChange={(e) => setShowEntries(Number(e.target.value))}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
                <button className="btn btn-outline btn-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Nhập nhiều IP Allow
                </button>
                <button className="btn btn-outline btn-sm">
                    <Download className="w-4 h-4 mr-2" />
                    Lấy với IP Allow
                </button>
                <button className="btn btn-outline btn-sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Sao chép nhiều
                </button>
                <button className="btn btn-outline btn-sm">
                    <Download className="w-4 h-4 mr-2" />
                    Lấy nhiều
                </button>
                <button className="btn btn-outline btn-sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Gia hạn nhiều
                </button>
                <button className="btn btn-outline btn-sm text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Xoá nhiều
                </button>
            </div>

            {/* Table */}
            <div className="card">
                <div className="card-body p-0">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="p-4 text-left">
                                        <input type="checkbox" className="checkbox" />
                                    </th>
                                    <th className="p-4 text-left">Gói</th>
                                    <th className="p-4 text-left">Nhà mạng</th>
                                    <th className="p-4 text-left">Proxy HTTP</th>
                                    <th className="p-4 text-left">Loại</th>
                                    <th className="p-4 text-left">Hết hạn</th>
                                    <th className="p-4 text-left">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((proxy) => (
                                    <tr key={proxy.id} className="hover:bg-gray-50 border-b">
                                        <td className="p-4">
                                            <input type="checkbox" className="checkbox" />
                                        </td>
                                        <td className="p-4 font-medium">{proxy.package}</td>
                                        <td className="p-4">{proxy.network}</td>
                                        <td className="p-4 font-mono text-sm">{proxy.httpProxy}</td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                                {proxy.type}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">{proxy.expires}</td>
                                        <td className="p-4">
                                            <div className="flex items-center space-x-2">
                                                <button className="btn btn-sm btn-outline" title="Xem chi tiết">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="btn btn-sm btn-outline" title="Chỉnh sửa">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="btn btn-sm btn-outline" title="Sao chép">
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                                <button className="btn btn-sm btn-outline text-red-600" title="Xóa">
                                                    <Trash2 className="w-4 h-4" />
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

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{currentData.length}</span> of <span className="font-medium">{currentData.length}</span> results
                </div>
                <div className="flex items-center space-x-2">
                    <button className="btn btn-outline btn-sm">Previous</button>
                    <button className="btn btn-primary btn-sm">1</button>
                    <button className="btn btn-outline btn-sm">Next</button>
                </div>
            </div>
        </div>
    );
};

const ProxyListPage = () => {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        }>
            <ProxyListContent />
        </Suspense>
    );
};

export default ProxyListPage; 