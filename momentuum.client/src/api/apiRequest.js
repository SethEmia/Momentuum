const BASE_URL = 'http://localhost:5144/api';

export function setUnauthorizedHandler(handler) {
    window.unauthorizedHandler = handler;
}
export async function apiRequest(endpoint, method = 'GET', body = null) {
    const token = localStorage.getItem('authToken');
    const headers = {
    };
    
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (body) {
        headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }
    
    const options = {
        method,
        headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, options);    
    if (response.status === 401) {
        localStorage.removeItem('authToken');    
        if (window.unauthorizedHandler) {
            window.unauthorizedHandler();
        }
    }
    
    
    if (response.status === 204) {
        return null; // No content
    }

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }
    

    const contentType = response.headers.get('Content-Type');
    
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }
    
    return response.text();
}