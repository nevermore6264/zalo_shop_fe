import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Types
export interface RechargeRequest {
  id: number;
  user_id: number;
  amount: number;
  notes?: string;
  status: "pending" | "approved" | "rejected";
  admin_notes?: string;
  created_at: string;
  updated_at?: string;
  approved_at?: string;
  rejected_at?: string;
  approved_by?: number;
  rejected_by?: number;
}

export interface BankAccount {
  id: number;
  bank_name: string;
  account_name: string;
  account_number: string;
  branch?: string;
  qr_code_url?: string;
  is_default: boolean;
  status: "active" | "inactive";
  created_at: string;
}

export interface CreateRechargeData {
  amount: number;
  notes?: string;
}

export interface RechargeResponse {
  success: boolean;
  message: string;
  data?: RechargeRequest;
}

export interface RechargesResponse {
  success: boolean;
  data: RechargeRequest[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface BankInfoResponse {
  success: boolean;
  data: BankAccount;
}

// Recharge API
export class RechargeAPI {
  private static instance: RechargeAPI;
  private api = axios.create({
    baseURL: `${API_URL}/recharge`,
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

  public static getInstance(): RechargeAPI {
    if (!RechargeAPI.instance) {
      RechargeAPI.instance = new RechargeAPI();
    }
    return RechargeAPI.instance;
  }

  // Create recharge request
  async createRechargeRequest(
    data: CreateRechargeData
  ): Promise<RechargeRequest> {
    try {
      const response = await this.api.post<RechargeResponse>("/request", data);
      return response.data.data!;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Không thể tạo yêu cầu nạp tiền"
      );
    }
  }

  // Get user's recharge history
  async getUserRechargeHistory(): Promise<RechargeRequest[]> {
    try {
      const response = await this.api.get<RechargesResponse>("/user-history");
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Không thể lấy lịch sử nạp tiền"
      );
    }
  }

  // Get recharge request by ID
  async getRecharge(id: number): Promise<RechargeRequest> {
    try {
      const response = await this.api.get<RechargeResponse>(`/${id}`);
      return response.data.data!;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Không thể lấy thông tin nạp tiền"
      );
    }
  }

  // Get bank information
  async getBankInfo(): Promise<BankAccount> {
    try {
      const response = await this.api.get<BankInfoResponse>("/bank-info");
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Không thể lấy thông tin ngân hàng"
      );
    }
  }
}

// Export singleton instance
export const rechargeAPI = RechargeAPI.getInstance();
