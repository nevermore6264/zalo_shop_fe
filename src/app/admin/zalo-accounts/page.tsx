'use client';

import React, { useState, useEffect } from 'react';
import {
    Smartphone, Search, Plus, Edit, Trash, Eye, Download, Upload, Filter,
    CheckCircle, XCircle, Clock, AlertTriangle, Copy, MoreHorizontal, RefreshCw
} from 'lucide-react';

interface ZaloAccount {
    id: number;
    phone: string;
    password: string;
    friends_list_image?: string;
    gpm_zip_file?: string;
    status: 'active' | 'inactive' | 'suspended';
    notes?: string;
    created_by_name?: string;
    created_at: string;
    updated_at: string;
}

interface Stats {
    total_accounts: number;
    active_accounts: number;
    inactive_accounts: number;
    suspended_accounts: number;
    accounts_with_friends_list: number;
    accounts_with_gpm_file: number;
}

const AdminZaloAccountsPage = () => {
    // Fake data for demonstration
    const fakeAccounts: ZaloAccount[] = [
        {
            id: 1,
            phone: '0123456789',
            password: 'password123',
            friends_list_image: 'friends_list_1.jpg',
            gpm_zip_file: 'gpm_data_1.zip',
            status: 'active',
            notes: 'Tài khoản test 1 - Có đầy đủ dữ liệu',
            created_by_name: 'admin',
            created_at: '2024-01-20T10:00:00Z',
            updated_at: '2024-01-20T10:00:00Z'
        },
        {
            id: 2,
            phone: '0987654321',
            password: 'password456',
            friends_list_image: 'friends_list_2.jpg',
            gpm_zip_file: undefined,
            status: 'active',
            notes: 'Tài khoản test 2 - Chỉ có ảnh bạn bè',
            created_by_name: 'admin',
            created_at: '2024-01-19T15:30:00Z',
            updated_at: '2024-01-19T15:30:00Z'
        },
        {
            id: 3,
            phone: '0369852147',
            password: 'password789',
            friends_list_image: undefined,
            gpm_zip_file: 'gpm_data_3.zip',
            status: 'inactive',
            notes: 'Tài khoản test 3 - Chỉ có file GPM',
            created_by_name: 'admin',
            created_at: '2024-01-18T09:15:00Z',
            updated_at: '2024-01-18T09:15:00Z'
        },
        {
            id: 4,
            phone: '0521478963',
            password: 'password012',
            friends_list_image: 'friends_list_4.jpg',
            gpm_zip_file: 'gpm_data_4.zip',
            status: 'suspended',
            notes: 'Tài khoản test 4 - Bị đình chỉ',
            created_by_name: 'admin',
            created_at: '2024-01-17T14:20:00Z',
            updated_at: '2024-01-17T14:20:00Z'
        },
        {
            id: 5,
            phone: '0147258369',
            password: 'password345',
            friends_list_image: undefined,
            gpm_zip_file: undefined,
            status: 'active',
            notes: 'Tài khoản test 5 - Không có file nào',
            created_by_name: 'admin',
            created_at: '2024-01-16T11:45:00Z',
            updated_at: '2024-01-16T11:45:00Z'
        },
        {
            id: 6,
            phone: '0258147369',
            password: 'password678',
            friends_list_image: 'friends_list_6.jpg',
            gpm_zip_file: 'gpm_data_6.zip',
            status: 'active',
            notes: 'Tài khoản test 6 - Premium account',
            created_by_name: 'admin',
            created_at: '2024-01-15T16:30:00Z',
            updated_at: '2024-01-15T16:30:00Z'
        },
        {
            id: 7,
            phone: '0369258147',
            password: 'password901',
            friends_list_image: undefined,
            gpm_zip_file: undefined,
            status: 'inactive',
            notes: 'Tài khoản test 7 - Không hoạt động',
            created_by_name: 'admin',
            created_at: '2024-01-14T13:20:00Z',
            updated_at: '2024-01-14T13:20:00Z'
        },
        {
            id: 8,
            phone: '0472583691',
            password: 'password234',
            friends_list_image: 'friends_list_8.jpg',
            gpm_zip_file: undefined,
            status: 'active',
            notes: 'Tài khoản test 8 - Chỉ có ảnh',
            created_by_name: 'admin',
            created_at: '2024-01-13T10:10:00Z',
            updated_at: '2024-01-13T10:10:00Z'
        }
    ];

    const fakeStats: Stats = {
        total_accounts: 8,
        active_accounts: 5,
        inactive_accounts: 2,
        suspended_accounts: 1,
        accounts_with_friends_list: 4,
        accounts_with_gpm_file: 3
    };

    const [accounts, setAccounts] = useState<ZaloAccount[]>(fakeAccounts);
    const [stats, setStats] = useState<Stats | null>(fakeStats);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<ZaloAccount | null>(null);
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
        friends_list_image: '',
        gpm_zip_file: '',
        notes: ''
    });

    // Filter accounts based on search and status
    const filteredAccounts = accounts.filter(account => {
        const matchesSearch = searchTerm === '' ||
            account.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.notes?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || account.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Pagination logic
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentAccounts = filteredAccounts.slice(startIndex, endIndex);

    useEffect(() => {
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, statusFilter]);

    // Create account
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        const newAccount: ZaloAccount = {
            id: Math.max(...accounts.map(a => a.id)) + 1,
            phone: formData.phone,
            password: formData.password,
            friends_list_image: formData.friends_list_image || undefined,
            gpm_zip_file: formData.gpm_zip_file || undefined,
            status: 'active',
            notes: formData.notes || undefined,
            created_by_name: 'admin',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        setAccounts([newAccount, ...accounts]);
        setShowCreateModal(false);
        setFormData({ phone: '', password: '', friends_list_image: '', gpm_zip_file: '', notes: '' });

        // Update stats
        setStats(prev => prev ? {
            ...prev,
            total_accounts: prev.total_accounts + 1,
            active_accounts: prev.active_accounts + 1,
            accounts_with_friends_list: prev.accounts_with_friends_list + (formData.friends_list_image ? 1 : 0),
            accounts_with_gpm_file: prev.accounts_with_gpm_file + (formData.gpm_zip_file ? 1 : 0)
        } : null);
    };

    // Update account
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedAccount) return;

        const updatedAccounts = accounts.map(account =>
            account.id === selectedAccount.id
                ? {
                    ...account,
                    phone: formData.phone,
                    password: formData.password,
                    friends_list_image: formData.friends_list_image || undefined,
                    gpm_zip_file: formData.gpm_zip_file || undefined,
                    notes: formData.notes || undefined,
                    updated_at: new Date().toISOString()
                }
                : account
        );

        setAccounts(updatedAccounts);
        setShowEditModal(false);
        setSelectedAccount(null);
        setFormData({ phone: '', password: '', friends_list_image: '', gpm_zip_file: '', notes: '' });
    };

    // Delete account
    const handleDelete = async () => {
        if (!selectedAccount) return;

        const updatedAccounts = accounts.filter(account => account.id !== selectedAccount.id);
        setAccounts(updatedAccounts);
        setShowDeleteModal(false);
        setSelectedAccount(null);

        // Update stats
        setStats(prev => prev ? {
            ...prev,
            total_accounts: prev.total_accounts - 1,
            active_accounts: prev.active_accounts - (selectedAccount.status === 'active' ? 1 : 0),
            inactive_accounts: prev.inactive_accounts - (selectedAccount.status === 'inactive' ? 1 : 0),
            suspended_accounts: prev.suspended_accounts - (selectedAccount.status === 'suspended' ? 1 : 0),
            accounts_with_friends_list: prev.accounts_with_friends_list - (selectedAccount.friends_list_image ? 1 : 0),
            accounts_with_gpm_file: prev.accounts_with_gpm_file - (selectedAccount.gpm_zip_file ? 1 : 0)
        } : null);
    };

    // Helper functions
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-green-600 bg-green-100';
            case 'inactive': return 'text-gray-600 bg-gray-100';
            case 'suspended': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <CheckCircle className="w-4 h-4" />;
            case 'inactive': return <Clock className="w-4 h-4" />;
            case 'suspended': return <XCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const openEditModal = (account: ZaloAccount) => {
        setSelectedAccount(account);
        setFormData({
            phone: account.phone,
            password: account.password,
            friends_list_image: account.friends_list_image || '',
            gpm_zip_file: account.gpm_zip_file || '',
            notes: account.notes || ''
        });
        setShowEditModal(true);
    };

    const openDeleteModal = (account: ZaloAccount) => {
        setSelectedAccount(account);
        setShowDeleteModal(true);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản Lý Tài Khoản Zalo</h1>
                    <p className="text-gray-600 mt-1">Quản lý và giám sát tất cả tài khoản Zalo</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Smartphone className="w-6 h-6 text-blue-500" />
                    <span className="text-sm text-gray-500">Zalo Accounts</span>
                </div>
            </div>

            {/* Stats Cards */}
            {stats && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Smartphone className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">Tổng tài khoản</p>
                                <p className="text-lg font-semibold text-gray-900">{stats.total_accounts}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">Đang hoạt động</p>
                                <p className="text-lg font-semibold text-gray-900">{stats.active_accounts}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <Upload className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">Có ảnh bạn bè</p>
                                <p className="text-lg font-semibold text-gray-900">{stats.accounts_with_friends_list}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Download className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">Có file GPM</p>
                                <p className="text-lg font-semibold text-gray-900">{stats.accounts_with_gpm_file}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Controls */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm theo số điện thoại..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value="active">Đang hoạt động</option>
                                <option value="inactive">Không hoạt động</option>
                                <option value="suspended">Đình chỉ</option>
                            </select>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setStatusFilter('all');
                                    setCurrentPage(1);
                                }}
                                className="px-3 py-2 text-gray-600 hover:text-gray-800"
                            >
                                <RefreshCw className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Thêm tài khoản
                            </button>
                        </div>
                    </div>
                </div>

                {/* Accounts Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Số điện thoại
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mật khẩu
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ảnh bạn bè
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    File GPM
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ngày tạo
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
                                            Đang tải...
                                        </div>
                                    </td>
                                </tr>
                            ) : currentAccounts.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                        Không có tài khoản nào
                                    </td>
                                </tr>
                            ) : (
                                currentAccounts.map((account) => (
                                    <tr key={account.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="text-sm font-medium text-gray-900">{account.phone}</span>
                                                <button
                                                    onClick={() => copyToClipboard(account.phone)}
                                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                                >
                                                    <Copy className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="text-sm text-gray-900">••••••••</span>
                                                <button
                                                    onClick={() => copyToClipboard(account.password)}
                                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                                >
                                                    <Copy className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            {account.friends_list_image ? (
                                                <div className="flex items-center">
                                                    <span className="text-green-600 text-sm">✓ Có</span>
                                                    <button className="ml-2 text-blue-600 hover:text-blue-800">
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-sm">✗ Không có</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            {account.gpm_zip_file ? (
                                                <div className="flex items-center">
                                                    <span className="text-green-600 text-sm">✓ Có</span>
                                                    <button className="ml-2 text-blue-600 hover:text-blue-800">
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-sm">✗ Không có</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
                                                {getStatusIcon(account.status)}
                                                <span className="ml-1">
                                                    {account.status === 'active' && 'Hoạt động'}
                                                    {account.status === 'inactive' && 'Không hoạt động'}
                                                    {account.status === 'suspended' && 'Đình chỉ'}
                                                </span>
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(account.created_at).toLocaleDateString('vi-VN')}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => openEditModal(account)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(account)}
                                                    className="text-red-600 hover:text-red-900"
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
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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

            {/* Create Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Thêm tài khoản Zalo</h3>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Số điện thoại *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mật khẩu *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Ảnh danh sách bạn bè</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFormData({ ...formData, friends_list_image: e.target.files?.[0]?.name || '' })}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">File ZIP GPM</label>
                                <input
                                    type="file"
                                    accept=".zip"
                                    onChange={(e) => setFormData({ ...formData, gpm_zip_file: e.target.files?.[0]?.name || '' })}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Ghi chú</label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    rows={3}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Thêm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && selectedAccount && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Chỉnh sửa tài khoản Zalo</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Số điện thoại *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mật khẩu *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Ảnh danh sách bạn bè</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFormData({ ...formData, friends_list_image: e.target.files?.[0]?.name || '' })}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">File ZIP GPM</label>
                                <input
                                    type="file"
                                    accept=".zip"
                                    onChange={(e) => setFormData({ ...formData, gpm_zip_file: e.target.files?.[0]?.name || '' })}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Ghi chú</label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    rows={3}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && selectedAccount && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Xác nhận xóa</h3>
                        <p className="text-gray-600 mb-4">
                            Bạn có chắc chắn muốn xóa tài khoản Zalo <strong>{selectedAccount.phone}</strong>?
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
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

export default AdminZaloAccountsPage; 