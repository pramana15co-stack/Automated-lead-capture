/**
 * API Configuration
 * Handles API base URL for development and production
 */

// Get API URL from environment variable or use relative path for development
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

/**
 * Get full API endpoint URL
 * @param {string} endpoint - API endpoint (e.g., '/api/leads')
 * @returns {string} Full URL
 */
export const getApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // If API_BASE_URL is set, use it; otherwise use relative path (for same-domain deployment)
  if (API_BASE_URL) {
    return `${API_BASE_URL}${cleanEndpoint}`;
  }
  
  return cleanEndpoint;
};

export default API_BASE_URL;

