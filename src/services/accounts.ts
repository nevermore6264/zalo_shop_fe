import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Types
export interface ZaloAccount {
  id: number;
  title: string;
  description?: string;
  price: number;
  username: string;
  password: string;
  phone?: string;
  email?: string;
  features?: string;
  status: "available" | "sold" | "out_of_stock";
  created_at: string;
  updated_at?: string;
  sold_at?: string;
  available_count?: number;
  is_hot?: boolean;
}

export interface AccountPurchase {
  id: number;
  user_id: number;
  account_id: number;
  price: number;
  status: "pending" | "completed" | "cancelled" | "failed";
  created_at: string;
  updated_at?: string;
  title?: string;
  description?: string;
  account_price?: number;
}

export interface PurchaseData {
  account_id: number;
}

export interface AccountsResponse {
  success: boolean;
  data: ZaloAccount[];
}

export interface AccountResponse {
  success: boolean;
  data: ZaloAccount;
}

export interface PurchaseResponse {
  success: boolean;
  message: string;
  data?: {
    purchase_id: number;
    credentials: {
      username: string;
      password: string;
      phone?: string;
      email?: string;
    };
  };
}

export interface PurchasesResponse {
  success: boolean;
  data: AccountPurchase[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Zalo Accounts API
export class ZaloAccountsAPI {
  private static instance: ZaloAccountsAPI;
  private api = axios.create({
    baseURL: `${API_URL}/accounts`,
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

  public static getInstance(): ZaloAccountsAPI {
    if (!ZaloAccountsAPI.instance) {
      ZaloAccountsAPI.instance = new ZaloAccountsAPI();
    }
    return ZaloAccountsAPI.instance;
  }

  // Get all available Zalo accounts
  async getAvailableAccounts(): Promise<ZaloAccount[]> {
    try {
      const response = await this.api.get<AccountsResponse>("/available");
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Không thể lấy danh sách tài khoản"
      );
    }
  }

  // Get account by ID
  async getAccount(id: number): Promise<ZaloAccount> {
    try {
      const response = await this.api.get<AccountResponse>(`/${id}`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Không thể lấy thông tin tài khoản"
      );
    }
  }

  // Purchase Zalo account
  async purchaseAccount(data: PurchaseData): Promise<PurchaseResponse["data"]> {
    try {
      const response = await this.api.post<PurchaseResponse>("/purchase", data);
      return response.data.data!;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Không thể mua tài khoản"
      );
    }
  }

  // Get user's purchased accounts
  async getPurchases(
    page: number = 1,
    limit: number = 10
  ): Promise<PurchasesResponse> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await this.api.get<PurchasesResponse>(
        `/user-purchases?${params}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Không thể lấy danh sách tài khoản đã mua"
      );
    }
  }
}

// Export singleton instance
export const zaloAccountsAPI = ZaloAccountsAPI.getInstance();
