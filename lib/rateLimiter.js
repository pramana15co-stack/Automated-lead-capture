/**
 * Simple Rate Limiter
 * In-memory rate limiting (for serverless, consider Redis for production)
 */

const rateLimitStore = new Map();

/**
 * Clean old entries (run periodically)
 */
function cleanOldEntries() {
  const now = Date.now();
  const maxAge = 60 * 1000; // 1 minute

  for (const [key, value] of rateLimitStore.entries()) {
    if (now - value.firstRequest > maxAge) {
      rateLimitStore.delete(key);
    }
  }
}

// Clean every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanOldEntries, 5 * 60 * 1000);
}

/**
 * Check rate limit
 * @param {string} identifier - IP address or user ID
 * @param {number} maxRequests - Maximum requests allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {object} { allowed: boolean, remaining: number, resetAt: number }
 */
export function checkRateLimit(identifier, maxRequests = 10, windowMs = 60000) {
  const now = Date.now();
  const key = identifier;

  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, {
      count: 1,
      firstRequest: now,
      lastRequest: now
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: now + windowMs
    };
  }

  const record = rateLimitStore.get(key);
  const timeSinceFirst = now - record.firstRequest;

  // Reset if window expired
  if (timeSinceFirst > windowMs) {
    rateLimitStore.set(key, {
      count: 1,
      firstRequest: now,
      lastRequest: now
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: now + windowMs
    };
  }

  // Check if limit exceeded
  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.firstRequest + windowMs
    };
  }

  // Increment count
  record.count++;
  record.lastRequest = now;
  rateLimitStore.set(key, record);

  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetAt: record.firstRequest + windowMs
  };
}

/**
 * Get client IP from request
 */
export function getClientIP(req) {
  // Check various headers (Vercel, proxies, etc.)
  const forwarded = req.headers['x-forwarded-for'];
  const realIP = req.headers['x-real-ip'];
  const cfIP = req.headers['cf-connecting-ip'];

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  if (cfIP) {
    return cfIP;
  }

  return req.socket?.remoteAddress || 'unknown';
}



