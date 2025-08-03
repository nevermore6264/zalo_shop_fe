'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import AuthLayout from '@/components/Layout/AuthLayout';

const LoginForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const redirectUrl = searchParams.get('redirect') || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Mock login API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulate successful login
            const mockToken = 'mock_jwt_token_' + Date.now();
            const mockUser = {
                id: 1,
                name: 'Admin User',
                email: formData.email,
                role: 'admin'
            };

            // Store token in localStorage (in real app, use httpOnly cookies)
            localStorage.setItem('auth_token', mockToken);
            localStorage.setItem('user', JSON.stringify(mockUser));

            // Set cookie for middleware
            document.cookie = `auth_token=${mockToken}; path=/; max-age=86400; SameSite=Strict`;

            // Redirect based on role
            if (mockUser.role === 'admin') {
                router.push('/admin');
            } else {
                router.push(redirectUrl);
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Đăng nhập thất bại. Vui lòng thử lại.');
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
        <div className="h-screen flex items-center justify-center p-4 overflow-hidden">
            <div className="max-w-md w-full space-y-6">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                        <span className="text-white font-bold text-2xl">Z</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Đăng nhập</h2>
                    <p className="mt-2 text-gray-600">
                        Đăng nhập vào tài khoản Zalo Shop của bạn
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                Mật khẩu
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

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Ghi nhớ đăng nhập
                                </label>
                            </div>
                            <Link
                                href="/forgot-password"
                                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                            >
                                Quên mật khẩu?
                            </Link>
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
                                    Đang đăng nhập...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    Đăng nhập
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

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Chưa có tài khoản?{' '}
                            <Link
                                href="/register"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                Đăng ký ngay
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Demo Credentials */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h3 className="text-xs font-medium text-blue-900 mb-1">Demo Credentials:</h3>
                    <div className="text-xs text-blue-800 space-y-0.5">
                        <p><strong>Email:</strong> admin@zaloshop.com</p>
                        <p><strong>Password:</strong> password123</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LoginPage = () => {
    return (
        <AuthLayout>
            <Suspense fallback={
                <div className="h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            }>
                <LoginForm />
            </Suspense>
        </AuthLayout>
    );
};

export default LoginPage; 