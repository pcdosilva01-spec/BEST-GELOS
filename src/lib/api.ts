import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

class ApiClient {
  private client: AxiosInstance;
  private refreshTokenPromise: Promise<string> | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (typeof window !== 'undefined') {
          const accessToken = localStorage.getItem('accessToken');
          if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newAccessToken = await this.refreshAccessToken();
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }
            return this.client(originalRequest);
          } catch (refreshError) {
            this.clearAuth();
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private async refreshAccessToken(): Promise<string> {
    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise;
    }

    this.refreshTokenPromise = (async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token');
      }

      const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
      const { accessToken, refreshToken: newRefreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      return accessToken;
    })();

    try {
      return await this.refreshTokenPromise;
    } finally {
      this.refreshTokenPromise = null;
    }
  }

  private clearAuth() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  clearTokens() {
    this.clearAuth();
  }

  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  // Auth endpoints
  async register(data: { name: string; email: string; password: string; phone?: string }) {
    const response = await this.client.post('/auth/register', data);
    return response.data;
  }

  async login(data: { email: string; password: string }) {
    const response = await this.client.post('/auth/login', data);
    return response.data;
  }

  async logout() {
    await this.client.post('/auth/logout');
    this.clearTokens();
  }

  async refreshToken() {
    const response = await this.client.post('/auth/refresh');
    return response.data;
  }

  async getProfile() {
    const response = await this.client.get('/auth/profile');
    return response.data;
  }

  async forgotPassword(email: string) {
    const response = await this.client.post('/auth/forgot-password', { email });
    return response.data;
  }

  async resetPassword(token: string, password: string) {
    const response = await this.client.post('/auth/reset-password', { token, password });
    return response.data;
  }

  // Products endpoints
  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    featured?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const response = await this.client.get('/products', { params });
    return response.data;
  }

  async getFeaturedProducts() {
    const response = await this.client.get('/products/featured');
    return response.data;
  }

  async getCategories() {
    const response = await this.client.get('/products/categories');
    return response.data;
  }

  async getProduct(idOrSlug: string) {
    const response = await this.client.get(`/products/${idOrSlug}`);
    return response.data;
  }

  // Orders endpoints
  async createOrder(data: {
    items: Array<{ productId: string; quantity: number }>;
    paymentMethod: string;
    deliveryAddress?: string;
    deliveryDate?: string;
    deliveryTime?: string;
    notes?: string;
  }) {
    const response = await this.client.post('/orders', data);
    return response.data;
  }

  async getMyOrders(params?: {
    page?: number;
    limit?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const response = await this.client.get('/orders', { params });
    return response.data;
  }

  async getOrderStats() {
    const response = await this.client.get('/orders/stats');
    return response.data;
  }

  async getOrder(id: string) {
    const response = await this.client.get(`/orders/${id}`);
    return response.data;
  }

  async cancelOrder(id: string, reason: string) {
    const response = await this.client.post(`/orders/${id}/cancel`, { reason });
    return response.data;
  }

  async getWhatsAppLink(id: string) {
    const response = await this.client.get(`/orders/${id}/whatsapp`);
    return response.data;
  }

  // Admin endpoints
  async adminLogin(data: { email: string; password: string }) {
    const response = await this.client.post('/admin/auth/login', data);
    return response.data;
  }

  async getAdminProfile() {
    const response = await this.client.get('/admin/auth/profile');
    return response.data;
  }

  async adminGetProducts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    includeInactive?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const response = await this.client.get('/admin/products', {
      params,
    });
    return response.data;
  }

  async adminGetProduct(id: string) {
    const response = await this.client.get(`/admin/products/${id}`);
    return response.data;
  }

  async adminCreateProduct(data: any) {
    const response = await this.client.post('/admin/products', data);
    return response.data;
  }

  async adminUpdateProduct(id: string, data: any) {
    const response = await this.client.patch(`/admin/products/${id}`, data);
    return response.data;
  }

  async adminUpdateStock(id: string, stock: number, operation: 'set' | 'add' | 'subtract' = 'set') {
    const response = await this.client.patch(`/admin/products/${id}/stock`, { stock, operation });
    return response.data;
  }

  async adminReorderProducts(ids: string[]) {
    const response = await this.client.post('/admin/products/reorder', { ids });
    return response.data;
  }

  async adminDeleteProduct(id: string) {
    const response = await this.client.delete(`/admin/products/${id}`);
    return response.data;
  }

  async adminGetProductStats() {
    const response = await this.client.get('/admin/products/stats');
    return response.data;
  }

  async adminGetOrders(params?: any) {
    const response = await this.client.get('/admin/orders', { params });
    return response.data;
  }

  async adminGetOrderStats(period?: 'today' | 'week' | 'month' | 'year') {
    const response = await this.client.get('/admin/orders/stats', { params: { period } });
    return response.data;
  }

  async adminGetRecentOrders(limit?: number) {
    const response = await this.client.get('/admin/orders/recent', { params: { limit } });
    return response.data;
  }

  async adminGetOrder(id: string) {
    const response = await this.client.get(`/admin/orders/${id}`);
    return response.data;
  }

  async adminUpdateOrder(id: string, data: any) {
    const response = await this.client.patch(`/admin/orders/${id}`, data);
    return response.data;
  }

  async adminUpdateOrderStatus(id: string, data: { status: string; notes?: string }) {
    const response = await this.client.patch(`/admin/orders/${id}/status`, data);
    return response.data;
  }

  async adminAddOrderStatusHistory(id: string, data: { status: string; notes?: string }) {
    const response = await this.client.post(`/admin/orders/${id}/status-history`, data);
    return response.data;
  }

  async adminExportOrdersCsv(params?: any) {
    const response = await this.client.get('/admin/orders/export/csv', { params, responseType: 'blob' });
    return response.data;
  }

  async adminExportReport(type: string, period?: string) {
    const response = await this.client.get('/admin/reports/export', {
      params: { type, period },
      responseType: 'blob',
    });
    return response.data;
  }

  async adminGetCustomers(params?: any) {
    const response = await this.client.get('/admin/customers', { params });
    return response.data;
  }

  async adminGetCustomerStats() {
    const response = await this.client.get('/admin/customers/stats');
    return response.data;
  }

  async adminGetCustomer(id: string) {
    const response = await this.client.get(`/admin/customers/${id}`);
    return response.data;
  }

  async adminUpdateCustomer(id: string, data: any) {
    const response = await this.client.patch(`/admin/customers/${id}`, data);
    return response.data;
  }

  async adminDeleteCustomer(id: string) {
    const response = await this.client.delete(`/admin/customers/${id}`);
    return response.data;
  }

  async adminGetDashboardStats() {
    const response = await this.client.get('/admin/dashboard/stats');
    return response.data;
  }

  async adminGetDeliveries(params?: any) {
    const response = await this.client.get('/admin/deliveries', { params });
    return response.data;
  }

  async adminUpdateDeliveryStatus(id: string, data: { status: string }) {
    const response = await this.client.patch(`/admin/deliveries/${id}/status`, data);
    return response.data;
  }
}

export const api = new ApiClient();
export default api;