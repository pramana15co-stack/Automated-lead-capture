/**
 * API Configuration
 * Handles API base URL for development and production
 * 
 * In Next.js, API routes are on the same domain, so we use relative paths
 */

// Get API URL from environment variable or use relative path (Next.js default)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Get full API endpoint URL
 * @param {string} endpoint - API endpoint (e.g., '/api/lead')
 * @returns {string} Full URL
 */
export const getApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // If API_BASE_URL is set (for external API), use it
  // Otherwise use relative path (Next.js API routes on same domain)
  if (API_BASE_URL) {
    return `${API_BASE_URL}${cleanEndpoint}`;
  }
  
  return cleanEndpoint;
};

export default API_BASE_URL;

