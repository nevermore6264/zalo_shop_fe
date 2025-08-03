'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';

const RegisterPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Mật khẩu xác nhận không khớp!');
            return;
        }

        setIsLoading(true);

        try {
            // Mock register API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulate successful registration
            const mockToken = 'mock_jwt_token_' + Date.now();
            const mockUser = {
                id: 1,
                name: formData.name,
                email: formData.email,
                role: 'user'
            };

            // Store token in localStorage
            localStorage.setItem('auth_token', mockToken);
            localStorage.setItem('user', JSON.stringify(mockUser));

            // Set cookie for middleware
            document.cookie = `auth_token=${mockToken}; path=/; max-age=86400; SameSite=Strict`;

            // Redirect to dashboard
            router.push('/');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Đăng ký thất bại. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 overflow-hidden">
            <div className="max-w-md w-full space-y-6">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                        <span className="text-white font-bold text-2xl">Z</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Đăng ký</h2>
                    <p className="mt-2 text-gray-600">
                        Tạo tài khoản Zalo Shop mới
                    </p>
                </div>

                {/* Register Form */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Họ và tên
                            </label>
                            <div className="relative">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="input pl-10 w-full"
                                    placeholder="Nhập họ và tên"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="input pl-10 w-full"
                                    placeholder="Nhập email của bạn"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="input pl-10 pr-10 w-full"
                                    placeholder="Nhập mật khẩu"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Xác nhận mật khẩu
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="input pl-10 pr-10 w-full"
                                    placeholder="Nhập lại mật khẩu"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="checkbox checkbox-sm mt-1"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                Tôi đồng ý với{' '}
                                <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                                    Điều khoản sử dụng
                                </Link>{' '}
                                và{' '}
                                <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                                    Chính sách bảo mật
                                </Link>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Đang đăng ký...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    Đăng ký
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </div>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Hoặc</span>
                            </div>
                        </div>
                    </div>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Đã có tài khoản?{' '}
                            <Link
                                href="/login"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                Đăng nhập ngay
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Features */}
                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Tại sao chọn Zalo Shop?</h3>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-xs text-gray-700">Dịch vụ chất lượng cao</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-xs text-gray-700">Hỗ trợ 24/7</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-xs text-gray-700">Bảo hành 1 đổi 1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage; 