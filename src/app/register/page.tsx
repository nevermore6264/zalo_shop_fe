'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import AuthLayout from '@/components/Layout/AuthLayout';
import { authService, RegisterData } from '@/services/auth';

const RegisterPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        full_name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const validateForm = () => {
        if (!formData.username || formData.username.length < 3) {
            setError('Username phải có ít nhất 3 ký tự');
            return false;
        }

        if (!formData.email) {
            setError('Email là bắt buộc');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Email không hợp lệ');
            return false;
        }

        if (!formData.password || formData.password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const registerData: RegisterData = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                full_name: formData.full_name || undefined,
                phone: formData.phone || undefined,
            };

            const response = await authService.register(registerData);

            // Store auth data
            authService.setAuthData(response.token, response.user);

            // Redirect based on role
            if (response.user.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        } catch (error: unknown) {
            console.error('Registration failed:', error);
            const errorMessage = error instanceof Error ? error.message : 'Đăng ký thất bại. Vui lòng thử lại.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        // Clear error when user starts typing
        if (error) {
            setError('');
        }
    };

    return (
        <AuthLayout>
            <div className="h-screen flex items-center justify-center p-4 overflow-hidden">
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
                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Username Field */}
                            <div className="space-y-2">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                    Tên đăng nhập *
                                </label>
                                <div className="relative">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="input pl-10 w-full"
                                        placeholder="Nhập tên đăng nhập"
                                        minLength={3}
                                    />
                                </div>
                            </div>

                            {/* Full Name Field */}
                            <div className="space-y-2">
                                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                                    Họ và tên
                                </label>
                                <div className="relative">
                                    <input
                                        id="full_name"
                                        name="full_name"
                                        type="text"
                                        value={formData.full_name}
                                        onChange={handleInputChange}
                                        className="input pl-10 w-full"
                                        placeholder="Nhập họ và tên"
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email *
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

                            {/* Phone Field */}
                            <div className="space-y-2">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Số điện thoại
                                </label>
                                <div className="relative">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="input pl-10 w-full"
                                        placeholder="Nhập số điện thoại"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Mật khẩu *
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
                                        minLength={6}
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
                                    Xác nhận mật khẩu *
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
        </AuthLayout>
    );
};

export default RegisterPage; 