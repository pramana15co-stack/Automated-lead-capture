/**
 * Logging Utility
 * Production-ready logging with different levels
 */

const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Format log message with timestamp and level
 */
function formatLog(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...(data && { data })
  };

  return JSON.stringify(logEntry);
}

/**
 * Log error
 */
export function logError(message, error = null) {
  const errorData = error ? {
    message: error.message,
    stack: isDevelopment ? error.stack : undefined,
    name: error.name
  } : null;

  console.error(formatLog(LOG_LEVELS.ERROR, message, errorData));
}

/**
 * Log warning
 */
export function logWarn(message, data = null) {
  console.warn(formatLog(LOG_LEVELS.WARN, message, data));
}

/**
 * Log info
 */
export function logInfo(message, data = null) {
  if (isDevelopment) {
    console.log(formatLog(LOG_LEVELS.INFO, message, data));
  }
}

/**
 * Log debug (only in development)
 */
export function logDebug(message, data = null) {
  if (isDevelopment) {
    console.log(formatLog(LOG_LEVELS.DEBUG, message, data));
  }
}

/**
 * Log API request
 */
export function logRequest(method, path, statusCode, duration = null) {
  const data = {
    method,
    path,
    statusCode,
    ...(duration && { duration: `${duration}ms` })
  };
  
  if (statusCode >= 400) {
    logError(`API ${method} ${path}`, data);
  } else {
    logInfo(`API ${method} ${path}`, data);
  }
}


