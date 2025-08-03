'use client';

import React, { useState } from 'react';
import {
    BookOpen,
    User,
    Shield,
    CreditCard,
    Clock,
    Eye,
    ArrowRight,
    Star,
    TrendingUp,
    Users
} from 'lucide-react';

const GuidePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'Tất cả', icon: BookOpen },
        { id: 'zalo', name: 'Zalo', icon: Users },
        { id: 'accounts', name: 'Tài khoản', icon: User },
        { id: 'proxy', name: 'Proxy', icon: Shield },
        { id: 'payment', name: 'Thanh toán', icon: CreditCard },
    ];

    const articles = [
        {
            id: 1,
            title: 'Hướng dẫn tăng like Zalo an toàn và hiệu quả',
            excerpt: 'Tìm hiểu cách tăng like cho bài viết Zalo một cách an toàn, không bị khóa tài khoản và đạt hiệu quả cao nhất.',
            category: 'zalo',
            readTime: '5 phút',
            views: 1247,
            rating: 4.8,
            tags: ['tăng like', 'zalo', 'an toàn'],
            featured: true,
            date: '2024-01-15'
        },
        {
            id: 2,
            title: 'Cách tăng comment Zalo tự nhiên và chất lượng',
            excerpt: 'Hướng dẫn chi tiết cách tăng comment cho bài viết Zalo với nội dung tự nhiên, thu hút tương tác thật.',
            category: 'zalo',
            readTime: '7 phút',
            views: 892,
            rating: 4.6,
            tags: ['tăng comment', 'zalo', 'tương tác'],
            featured: false,
            date: '2024-01-14'
        },
        {
            id: 3,
            title: 'Tăng quan tâm Zalo OA - Bí quyết thành công',
            excerpt: 'Khám phá các phương pháp tăng số lượng người quan tâm cho Zalo Official Account một cách bền vững.',
            category: 'zalo',
            readTime: '8 phút',
            views: 1563,
            rating: 4.9,
            tags: ['zalo oa', 'tăng quan tâm', 'official account'],
            featured: true,
            date: '2024-01-13'
        },
        {
            id: 4,
            title: 'Hướng dẫn tăng thành viên nhóm Zalo hiệu quả',
            excerpt: 'Các chiến lược tăng thành viên cho nhóm Zalo, từ việc tạo nội dung hấp dẫn đến quảng bá nhóm.',
            category: 'zalo',
            readTime: '6 phút',
            views: 1034,
            rating: 4.7,
            tags: ['nhóm zalo', 'tăng thành viên', 'quản lý nhóm'],
            featured: false,
            date: '2024-01-12'
        },
        {
            id: 5,
            title: 'Mua tài khoản Zalo uy tín - Hướng dẫn chi tiết',
            excerpt: 'Tìm hiểu cách chọn mua tài khoản Zalo chất lượng, an toàn và đáng tin cậy từ các nhà cung cấp uy tín.',
            category: 'accounts',
            readTime: '10 phút',
            views: 2341,
            rating: 4.9,
            tags: ['mua tài khoản', 'zalo', 'uy tín'],
            featured: true,
            date: '2024-01-11'
        },
        {
            id: 6,
            title: 'Phân biệt các loại tài khoản Zalo và cách sử dụng',
            excerpt: 'So sánh các loại tài khoản Zalo khác nhau: cơ bản, premium, VIP và hướng dẫn sử dụng phù hợp.',
            category: 'accounts',
            readTime: '9 phút',
            views: 1876,
            rating: 4.8,
            tags: ['loại tài khoản', 'zalo premium', 'zalo vip'],
            featured: false,
            date: '2024-01-10'
        },
        {
            id: 7,
            title: 'Proxy cho Zalo - Hướng dẫn cấu hình và sử dụng',
            excerpt: 'Tìm hiểu về proxy, cách cấu hình và sử dụng proxy an toàn cho Zalo để tránh bị khóa tài khoản.',
            category: 'proxy',
            readTime: '12 phút',
            views: 1456,
            rating: 4.7,
            tags: ['proxy', 'cấu hình', 'bảo mật'],
            featured: true,
            date: '2024-01-09'
        },
        {
            id: 8,
            title: 'Các loại proxy phù hợp cho Zalo và cách chọn',
            excerpt: 'So sánh các loại proxy: HTTP, HTTPS, SOCKS và hướng dẫn chọn proxy phù hợp cho nhu cầu sử dụng Zalo.',
            category: 'proxy',
            readTime: '8 phút',
            views: 1123,
            rating: 4.6,
            tags: ['loại proxy', 'http', 'https', 'socks'],
            featured: false,
            date: '2024-01-08'
        },
        {
            id: 9,
            title: 'Hướng dẫn nạp tiền vào tài khoản Zalo Shop',
            excerpt: 'Các phương thức nạp tiền an toàn và nhanh chóng: chuyển khoản ngân hàng, ví điện tử, thẻ cào.',
            category: 'payment',
            readTime: '6 phút',
            views: 2987,
            rating: 4.9,
            tags: ['nạp tiền', 'thanh toán', 'chuyển khoản'],
            featured: true,
            date: '2024-01-07'
        },
        {
            id: 10,
            title: 'Các phương thức thanh toán được hỗ trợ',
            excerpt: 'Tổng hợp tất cả phương thức thanh toán: ngân hàng, ví điện tử, thẻ cào, tiền mặt và hướng dẫn sử dụng.',
            category: 'payment',
            readTime: '7 phút',
            views: 1654,
            rating: 4.8,
            tags: ['phương thức thanh toán', 'ví điện tử', 'thẻ cào'],
            featured: false,
            date: '2024-01-06'
        },
        {
            id: 11,
            title: 'Bảo mật tài khoản Zalo - Những điều cần biết',
            excerpt: 'Các biện pháp bảo mật tài khoản Zalo: mật khẩu mạnh, xác thực 2 yếu tố, cài đặt bảo mật.',
            category: 'zalo',
            readTime: '9 phút',
            views: 2134,
            rating: 4.9,
            tags: ['bảo mật', 'mật khẩu', 'xác thực 2 yếu tố'],
            featured: true,
            date: '2024-01-05'
        },
        {
            id: 12,
            title: 'Xử lý khi tài khoản Zalo bị khóa hoặc hạn chế',
            excerpt: 'Hướng dẫn khôi phục tài khoản Zalo khi bị khóa, các bước liên hệ hỗ trợ và phòng tránh.',
            category: 'zalo',
            readTime: '11 phút',
            views: 1876,
            rating: 4.7,
            tags: ['tài khoản bị khóa', 'khôi phục', 'hỗ trợ'],
            featured: false,
            date: '2024-01-04'
        }
    ];

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const featuredArticles = articles.filter(article => article.featured);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">Hướng Dẫn</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Tổng hợp các bài viết hướng dẫn chi tiết về Zalo, mua tài khoản, proxy và thanh toán.
                    Tìm hiểu cách sử dụng dịch vụ một cách an toàn và hiệu quả.
                </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm bài viết..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input pl-10 w-full"
                        />
                    </div>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${selectedCategory === category.id
                                ? 'bg-orange-500 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <category.icon className="w-4 h-4" />
                            <span>{category.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Featured Articles */}
            {selectedCategory === 'all' && searchTerm === '' && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                        <Star className="w-6 h-6 text-orange-500" />
                        <span>Bài viết nổi bật</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredArticles.slice(0, 3).map((article) => (
                            <div key={article.id} className="card hover:scale-105 transition-all duration-300 group">
                                <div className="card-body">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="badge badge-primary">{article.category.toUpperCase()}</span>
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <Clock className="w-4 h-4" />
                                            <span>{article.readTime}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <Eye className="w-4 h-4" />
                                                <span>{article.views}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span>{article.rating}</span>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* All Articles */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {selectedCategory === 'all' ? 'Tất cả bài viết' : `Bài viết ${categories.find(c => c.id === selectedCategory)?.name}`}
                    </h2>
                    <span className="text-gray-500">{filteredArticles.length} bài viết</span>
                </div>

                {filteredArticles.length === 0 ? (
                    <div className="text-center py-12">
                        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy bài viết</h3>
                        <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc danh mục khác</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredArticles.map((article) => (
                            <div key={article.id} className="card hover:scale-105 transition-all duration-300 group">
                                <div className="card-body">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="badge badge-primary">{article.category.toUpperCase()}</span>
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <Clock className="w-4 h-4" />
                                            <span>{article.readTime}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {article.tags.slice(0, 3).map((tag, index) => (
                                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <Eye className="w-4 h-4" />
                                                <span>{article.views}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span>{article.rating}</span>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="card text-center">
                    <div className="card-body">
                        <BookOpen className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{articles.length}</div>
                        <div className="text-sm text-gray-600">Bài viết</div>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="card-body">
                        <Eye className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">
                            {articles.reduce((sum, article) => sum + article.views, 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Lượt xem</div>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="card-body">
                        <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">
                            {(articles.reduce((sum, article) => sum + article.rating, 0) / articles.length).toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-600">Đánh giá TB</div>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="card-body">
                        <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{featuredArticles.length}</div>
                        <div className="text-sm text-gray-600">Bài nổi bật</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuidePage; 