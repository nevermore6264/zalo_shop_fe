import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Types
export interface ZaloService {
  id: number;
  name: string;
  description?: string;
  price: number;
  unit: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at?: string;
}

export interface ZaloOrder {
  id: number;
  user_id: number;
  service_id: number;
  quantity: number;
  zalo_link: string;
  notes?: string;
  total_amount: number;
  status: "pending" | "processing" | "completed" | "cancelled" | "failed";
  admin_notes?: string;
  created_at: string;
  updated_at?: string;
  service_name?: string;
  service_price?: number;
}

export interface CreateOrderData {
  service_id: number;
  quantity: number;
  zalo_link: string;
  notes?: string;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data?: ZaloOrder;
}

export interface ServicesResponse {
  success: boolean;
  data: ZaloService[];
}

export interface OrdersResponse {
  success: boolean;
  data: ZaloOrder[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Zalo Services API
export class ZaloServicesAPI {
  private static instance: ZaloServicesAPI;
  private api = axios.create({
    baseURL: `${API_URL}/services`,
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

  public static getInstance(): ZaloServicesAPI {
    if (!ZaloServicesAPI.instance) {
      ZaloServicesAPI.instance = new ZaloServicesAPI();
    }
    return ZaloServicesAPI.instance;
  }

  // Get all Zalo services
  async getServices(): Promise<ZaloService[]> {
    try {
      const response = await this.api.get<ServicesResponse>("/zalo");
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Không thể lấy danh sách dịch vụ"
      );
    }
  }

  // Get service by ID
  async getService(id: number): Promise<ZaloService> {
    try {
      const response = await this.api.get<ServicesResponse>(`/zalo/${id}`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Không thể lấy thông tin dịch vụ"
      );
    }
  }

  // Create Zalo service order
  async createOrder(data: CreateOrderData): Promise<ZaloOrder> {
    try {
      const response = await this.api.post<OrderResponse>("/zalo/order", data);
      return response.data.data!;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Không thể tạo đơn hàng"
      );
    }
  }

  // Get user's Zalo orders with pagination and search
  async getUserOrders(params: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<OrdersResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append("page", params.page.toString());
      if (params.limit) queryParams.append("limit", params.limit.toString());
      if (params.search) queryParams.append("search", params.search);

      const response = await this.api.get<OrdersResponse>(
        `/zalo/orders?${queryParams}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Không thể lấy danh sách đơn hàng"
      );
    }
  }

  // Get order by ID
  async getOrder(id: number): Promise<ZaloOrder> {
    try {
      const response = await this.api.get<OrderResponse>(`/zalo/orders/${id}`);
      return response.data.data!;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Không thể lấy thông tin đơn hàng"
      );
    }
  }
}

// Export singleton instance
export const zaloServicesAPI = ZaloServicesAPI.getInstance();
