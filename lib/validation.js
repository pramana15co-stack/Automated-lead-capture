/**
 * Input Validation Utilities
 * Production-ready validation functions
 */

/**
 * Validate email format
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }

  const trimmed = email.trim().toLowerCase();
  
  if (trimmed.length === 0) {
    return { valid: false, error: 'Email cannot be empty' };
  }

  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Invalid email format' };
  }

  // Additional checks
  if (trimmed.length > 254) {
    return { valid: false, error: 'Email is too long' };
  }

  return { valid: true, email: trimmed };
}

/**
 * Validate name
 */
export function validateName(name) {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Name is required' };
  }

  const trimmed = name.trim();
  
  if (trimmed.length === 0) {
    return { valid: false, error: 'Name cannot be empty' };
  }

  if (trimmed.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: 'Name is too long' };
  }

  // Allow letters, spaces, hyphens, apostrophes
  const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
  if (!nameRegex.test(trimmed)) {
    return { valid: false, error: 'Name contains invalid characters' };
  }

  return { valid: true, name: trimmed };
}

/**
 * Validate phone number
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, error: 'Phone number is required' };
  }

  const trimmed = phone.trim();
  
  if (trimmed.length === 0) {
    return { valid: false, error: 'Phone number cannot be empty' };
  }

  // Allow digits, spaces, hyphens, plus, parentheses
  const phoneRegex = /^[\d\s\-+()]+$/;
  if (!phoneRegex.test(trimmed)) {
    return { valid: false, error: 'Invalid phone number format' };
  }

  // Remove non-digits for length check
  const digitsOnly = trimmed.replace(/\D/g, '');
  
  if (digitsOnly.length < 10) {
    return { valid: false, error: 'Phone number is too short' };
  }

  if (digitsOnly.length > 15) {
    return { valid: false, error: 'Phone number is too long' };
  }

  return { valid: true, phone: trimmed };
}

/**
 * Validate service selection
 */
export function validateService(service) {
  if (!service || typeof service !== 'string') {
    return { valid: false, error: 'Service selection is required' };
  }

  const trimmed = service.trim();
  
  if (trimmed.length === 0) {
    return { valid: false, error: 'Please select a service' };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: 'Service name is too long' };
  }

  return { valid: true, service: trimmed };
}

/**
 * Validate lead submission data
 */
export function validateLeadData(data) {
  const errors = {};
  const validated = {};

  // Validate name
  const nameResult = validateName(data.name);
  if (!nameResult.valid) {
    errors.name = nameResult.error;
  } else {
    validated.name = nameResult.name;
  }

  // Validate email
  const emailResult = validateEmail(data.email);
  if (!emailResult.valid) {
    errors.email = emailResult.error;
  } else {
    validated.email = emailResult.email;
  }

  // Validate phone
  const phoneResult = validatePhone(data.phone);
  if (!phoneResult.valid) {
    errors.phone = phoneResult.error;
  } else {
    validated.phone = phoneResult.phone;
  }

  // Validate service
  const serviceResult = validateService(data.service);
  if (!serviceResult.valid) {
    errors.service = serviceResult.error;
  } else {
    validated.service = serviceResult.service;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: validated
  };
}

/**
 * Sanitize string input
 */
export function sanitizeString(input) {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
}

