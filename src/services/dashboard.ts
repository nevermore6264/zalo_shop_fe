import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Types
export interface UserDashboardStats {
  totalOrders: number;
  totalSpent: number;
  balance: number;
  recentOrders: any[];
}

export interface AdminDashboardStats {
  users: {
    total: number;
    newToday: number;
    active: number;
  };
  orders: {
    total: number;
    pending: number;
    zalo: number;
    account: number;
  };
  revenue: {
    total: number;
    today: number;
    zalo: number;
    account: number;
  };
  recharge: {
    pending: number;
    totalAmount: number;
  };
  inventory: {
    totalAccounts: number;
    availableAccounts: number;
    totalServices: number;
  };
  recentActivities: {
    zaloOrders: any[];
    accountOrders: any[];
    recharges: any[];
  };
}

export interface RevenueChartData {
  zaloRevenue: Array<{
    date: string;
    revenue: number;
  }>;
  accountRevenue: Array<{
    date: string;
    revenue: number;
  }>;
  rechargeData: Array<{
    date: string;
    amount: number;
  }>;
}

export interface UserGrowthData {
  newUsers: Array<{
    date: string;
    new_users: number;
  }>;
  cumulativeUsers: Array<{
    date: string;
    total_users: number;
  }>;
}

export interface TopServicesData {
  topZaloServices: Array<{
    name: string;
    price: number;
    order_count: number;
    total_revenue: number;
  }>;
  topAccountTypes: Array<{
    title: string;
    price: number;
    purchase_count: number;
    total_revenue: number;
  }>;
}

export interface DashboardResponse<T> {
  success: boolean;
  data: T;
}

// Dashboard API
export class DashboardAPI {
  private static instance: DashboardAPI;
  private api = axios.create({
    baseURL: `${API_URL}/dashboard`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  private constructor() {
    // Add auth interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): DashboardAPI {
    if (!DashboardAPI.instance) {
      DashboardAPI.instance = new DashboardAPI();
    }
    return DashboardAPI.instance;
  }

  // Get user dashboard statistics
  async getUserStats(): Promise<UserDashboardStats> {
    try {
      const response = await this.api.get<
        DashboardResponse<UserDashboardStats>
      >("/user");
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Không thể lấy thống kê dashboard"
      );
    }
  }

  // Get admin dashboard statistics
  async getAdminStats(): Promise<AdminDashboardStats> {
    try {
      const response = await this.api.get<
        DashboardResponse<AdminDashboardStats>
      >("/admin");
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Không thể lấy thống kê admin"
      );
    }
  }

  // Get revenue chart data
  async getRevenueChart(
    period: "7days" | "30days" | "12months" = "7days"
  ): Promise<RevenueChartData> {
    try {
      const response = await this.api.get<DashboardResponse<RevenueChartData>>(
        `/admin/revenue-chart?period=${period}`
      );
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Không thể lấy dữ liệu biểu đồ doanh thu"
      );
    }
  }

  // Get user growth chart data
  async getUserGrowth(
    period: "7days" | "30days" | "12months" = "30days"
  ): Promise<UserGrowthData> {
    try {
      const response = await this.api.get<DashboardResponse<UserGrowthData>>(
        `/admin/user-growth?period=${period}`
      );
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Không thể lấy dữ liệu tăng trưởng người dùng"
      );
    }
  }

  // Get top services data
  async getTopServices(): Promise<TopServicesData> {
    try {
      const response = await this.api.get<DashboardResponse<TopServicesData>>(
        "/admin/top-services"
      );
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Không thể lấy dữ liệu dịch vụ hàng đầu"
      );
    }
  }
}

// Export singleton instance
export const dashboardAPI = DashboardAPI.getInstance();
