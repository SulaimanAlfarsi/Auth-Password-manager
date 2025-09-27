import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/passwords";

axios.defaults.withCredentials = true;

export const usePasswordStore = create((set, get) => ({
    passwords: [],
    isLoading: false,
    error: null,

    // Get all passwords for the user
    fetchPasswords: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(API_URL);
            set({ 
                passwords: response.data.passwords, 
                isLoading: false 
            });
        } catch (error) {
            set({ 
                error: error.response?.data?.message || "Failed to fetch passwords", 
                isLoading: false 
            });
            throw error;
        }
    },

    // Create a new password
    createPassword: async (passwordData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(API_URL, passwordData);
            const newPassword = response.data.password;
            
            set(state => ({ 
                passwords: [newPassword, ...state.passwords], 
                isLoading: false 
            }));
            
            return newPassword;
        } catch (error) {
            set({ 
                error: error.response?.data?.message || "Failed to create password", 
                isLoading: false 
            });
            throw error;
        }
    },

    // Get a specific password (with decrypted password)
    getPassword: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            set({ isLoading: false });
            return response.data.password;
        } catch (error) {
            set({ 
                error: error.response?.data?.message || "Failed to get password", 
                isLoading: false 
            });
            throw error;
        }
    },

    // Update a password
    updatePassword: async (id, passwordData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.put(`${API_URL}/${id}`, passwordData);
            const updatedPassword = response.data.password;
            
            set(state => ({ 
                passwords: state.passwords.map(p => 
                    p._id === id ? updatedPassword : p
                ), 
                isLoading: false 
            }));
            
            return updatedPassword;
        } catch (error) {
            set({ 
                error: error.response?.data?.message || "Failed to update password", 
                isLoading: false 
            });
            throw error;
        }
    },

    // Delete a password
    deletePassword: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axios.delete(`${API_URL}/${id}`);
            
            set(state => ({ 
                passwords: state.passwords.filter(p => p._id !== id), 
                isLoading: false 
            }));
        } catch (error) {
            set({ 
                error: error.response?.data?.message || "Failed to delete password", 
                isLoading: false 
            });
            throw error;
        }
    },

    // Clear error
    clearError: () => set({ error: null }),

    // Clear all passwords (for logout)
    clearPasswords: () => set({ passwords: [], error: null })
}));
