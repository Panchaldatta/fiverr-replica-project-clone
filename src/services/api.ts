
import { MockUser } from "@/context/AuthContext";

const API_URL = "http://localhost:5000/api";

// Helper to handle the API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    const error = data.error || response.statusText;
    return Promise.reject(error);
  }
  
  return data;
};

// Get the auth token from localStorage
const getToken = () => {
  return localStorage.getItem('token') || '';
};

// Authentication Service
export const authService = {
  // Register a new user
  async register(email: string, username: string, password: string) {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          username,
          password,
          displayName: username
        })
      });
      
      const data = await handleResponse(response);
      
      // Store the token
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false };
    }
  },
  
  // Log in a user
  async login(email: string, password: string) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      
      const data = await handleResponse(response);
      
      // Store the token
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false };
    }
  },
  
  // Log out the current user
  async logout() {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    return { success: true };
  },
  
  // Get the current authenticated user
  async getCurrentUser() {
    try {
      const token = getToken();
      
      if (!token) {
        return { user: null };
      }
      
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await handleResponse(response);
      return { user: data.data };
    } catch (error) {
      console.error('Get current user error:', error);
      return { user: null };
    }
  }
};

// Gig Service
export const gigService = {
  // Get all gigs
  async getAllGigs(params?: Record<string, string>) {
    const queryString = params 
      ? '?' + new URLSearchParams(params).toString() 
      : '';
    
    const response = await fetch(`${API_URL}/gigs${queryString}`);
    return handleResponse(response);
  },
  
  // Get gigs by category
  async getGigsByCategory(category: string) {
    const response = await fetch(`${API_URL}/gigs/category/${category}`);
    return handleResponse(response);
  },
  
  // Get a single gig
  async getGig(id: string) {
    const response = await fetch(`${API_URL}/gigs/${id}`);
    return handleResponse(response);
  },
  
  // Create a new gig
  async createGig(gigData: any) {
    const token = getToken();
    
    const response = await fetch(`${API_URL}/gigs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(gigData)
    });
    
    return handleResponse(response);
  },
  
  // Update a gig
  async updateGig(id: string, gigData: any) {
    const token = getToken();
    
    const response = await fetch(`${API_URL}/gigs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(gigData)
    });
    
    return handleResponse(response);
  },
  
  // Delete a gig
  async deleteGig(id: string) {
    const token = getToken();
    
    const response = await fetch(`${API_URL}/gigs/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return handleResponse(response);
  },
  
  // Get user gigs
  async getUserGigs(userId: string) {
    const response = await fetch(`${API_URL}/users/${userId}/gigs`);
    return handleResponse(response);
  }
};

// Order Service
export const orderService = {
  // Create a new order
  async createOrder(orderData: any) {
    const token = getToken();
    
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });
    
    return handleResponse(response);
  },
  
  // Get a single order
  async getOrder(id: string) {
    const token = getToken();
    
    const response = await fetch(`${API_URL}/orders/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return handleResponse(response);
  },
  
  // Get buyer orders
  async getBuyerOrders() {
    const token = getToken();
    
    const response = await fetch(`${API_URL}/orders/buyer`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return handleResponse(response);
  },
  
  // Get seller orders
  async getSellerOrders() {
    const token = getToken();
    
    const response = await fetch(`${API_URL}/orders/seller`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return handleResponse(response);
  },
  
  // Update an order
  async updateOrder(id: string, orderData: any) {
    const token = getToken();
    
    const response = await fetch(`${API_URL}/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });
    
    return handleResponse(response);
  }
};

// User Service
export const userService = {
  // Get user profile
  async getUserProfile(userId: string) {
    const response = await fetch(`${API_URL}/users/${userId}`);
    return handleResponse(response);
  },
  
  // Update user profile
  async updateUserProfile(userId: string, userData: any) {
    const token = getToken();
    
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });
    
    return handleResponse(response);
  },
  
  // Get user earnings
  async getUserEarnings(userId: string) {
    const token = getToken();
    
    const response = await fetch(`${API_URL}/users/${userId}/earnings`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return handleResponse(response);
  }
};
