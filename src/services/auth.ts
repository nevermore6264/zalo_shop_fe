import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear invalid token
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Redirect to login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Types
export interface RegisterData {
    username: string;
    email: string;
    password: string;
    full_name?: string;
    phone?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    full_name?: string;
    phone?: string;
    role: 'user' | 'admin' | 'moderator';
    status: 'active' | 'inactive' | 'suspended' | 'banned';
    balance: number;
    total_spent: number;
    total_orders: number;
    last_login?: string;
    created_at: string;
}

export interface AuthResponse {
    message: string;
    token: string;
    user: User;
}

// Auth service class
export class AuthService {
    private static instance: AuthService;

    private constructor() { }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    // Register new user
    async register(data: RegisterData): Promise<AuthResponse> {
        try {
            const response = await api.post('/auth/register', data);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Đăng ký thất bại');
        }
    }

    // Login user
    async login(data: LoginData): Promise<AuthResponse> {
        try {
            const response = await api.post('/auth/login', data);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Đăng nhập thất bại');
        }
    }

    // Get current user
    async getCurrentUser(): Promise<User> {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Không thể lấy thông tin người dùng');
        }
    }

    // Logout user
    async logout(): Promise<{ message: string }> {
        try {
            const response = await api.post('/auth/logout');
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Đăng xuất thất bại');
        }
    }

    // Change password
    async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
        try {
            const response = await api.put('/auth/change-password', {
                currentPassword,
                newPassword,
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Đổi mật khẩu thất bại');
        }
    }

    // Update profile
    async updateProfile(data: { full_name?: string; phone?: string }): Promise<{ message: string; user: User }> {
        try {
            const response = await api.put('/auth/profile', data);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Cập nhật thông tin thất bại');
        }
    }

    // Local storage helpers
    setAuthData(token: string, user: User): void {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Set cookie for middleware
        document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Strict`;
    }

    getAuthData(): { token: string | null; user: User | null } {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;

        return { token, user };
    }

    clearAuthData(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Clear cookie
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }

    isAuthenticated(): boolean {
        const { token } = this.getAuthData();
        return !!token;
    }

    getUserRole(): string | null {
        const { user } = this.getAuthData();
        return user?.role || null;
    }

    isAdmin(): boolean {
        return this.getUserRole() === 'admin';
    }

    // Get user data
    getUser(): User | null {
        const { user } = this.getAuthData();
        return user;
    }

    // Check if user is active
    isUserActive(): boolean {
        const user = this.getUser();
        return user?.status === 'active';
    }

    // Get user balance
    getUserBalance(): number {
        const user = this.getUser();
        return user?.balance || 0;
    }

    // Get user total spent
    getUserTotalSpent(): number {
        const user = this.getUser();
        return user?.total_spent || 0;
    }

    // Get user total orders
    getUserTotalOrders(): number {
        const user = this.getUser();
        return user?.total_orders || 0;
    }
}

// Export singleton instance
export const authService = AuthService.getInstance();

// Export default for backward compatibility
export default authService; 