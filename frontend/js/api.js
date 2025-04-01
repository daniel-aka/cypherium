const api = {
    baseUrl: 'http://localhost:5001',
    
    // Helper function to handle API responses
    async handleResponse(response) {
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'An error occurred');
        }
        return response.json();
    },

    // Authentication endpoints
    auth: {
        async login(email, password) {
            const response = await fetch(`${api.baseUrl}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await api.handleResponse(response);
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            return data;
        },

        async register(userData) {
            const response = await fetch(`${api.baseUrl}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            return api.handleResponse(response);
        },

        async logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login.html';
        },

        async getCurrentUser() {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${api.baseUrl}/api/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return api.handleResponse(response);
        }
    },

    // User profile endpoints
    user: {
        async updateProfile(userData) {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${api.baseUrl}/user/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });
            return api.handleResponse(response);
        },

        async getProfile() {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${api.baseUrl}/user/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return api.handleResponse(response);
        }
    },

    // Investment endpoints
    investments: {
        async getInvestments() {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${api.baseUrl}/investments`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return api.handleResponse(response);
        },

        async createInvestment(investmentData) {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${api.baseUrl}/investments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(investmentData)
            });
            return api.handleResponse(response);
        },

        async getTransactions() {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${api.baseUrl}/transactions`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return api.handleResponse(response);
        },

        async deposit(amount) {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${api.baseUrl}/transactions/deposit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ amount })
            });
            return api.handleResponse(response);
        },

        async withdraw(amount) {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${api.baseUrl}/transactions/withdraw`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ amount })
            });
            return api.handleResponse(response);
        }
    }
};

// Export the API object
window.api = api; 