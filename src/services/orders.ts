import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Types
export interface Order {
  id: number;
  order_type: "zalo_service" | "account_purchase";
  service_name?: string;
  account_title?: string;
  quantity: number;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  zalo_link?: string;
  notes?: string;
  credentials?: {
    username: string;
    password: string;
  };
}

export interface OrdersResponse {
  success: boolean;
  data: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface GetUserOrdersParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
}

// Orders API
export class OrdersAPI {
  private static instance: OrdersAPI;
  private api = axios.create({
    baseURL: `${API_URL}/orders`,
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

  public static getInstance(): OrdersAPI {
    if (!OrdersAPI.instance) {
      OrdersAPI.instance = new OrdersAPI();
    }
    return OrdersAPI.instance;
  }

  // Get user's all orders (Zalo services + Account purchases)
  async getUserOrders(
    params: GetUserOrdersParams = {}
  ): Promise<OrdersResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append("page", params.page.toString());
      if (params.limit) queryParams.append("limit", params.limit.toString());
      if (params.search) queryParams.append("search", params.search);
      if (params.type) queryParams.append("type", params.type);

      const response = await this.api.get<OrdersResponse>(
        `/user?${queryParams}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Không thể lấy danh sách đơn hàng"
      );
    }
  }

  // Get order by ID
  async getOrder(id: number): Promise<Order> {
    try {
      const response = await this.api.get<{ success: boolean; data: Order }>(
        `/${id}`
      );
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Không thể lấy thông tin đơn hàng"
      );
    }
  }
}

// Export singleton instance
export const ordersAPI = OrdersAPI.getInstance();
