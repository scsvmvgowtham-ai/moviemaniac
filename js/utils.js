// ================= UTILITY FUNCTIONS - utils.js =================
// Reusable helper functions for the MovieManiac application

const MovieManiacUtils = {
  
  // ================= STRING UTILITIES =================
  
  /**
   * Sanitize user input to prevent XSS attacks
   * @param {string} input - The user input to sanitize
   * @returns {string} - Sanitized string
   */
  sanitize: function(input) {
    if (typeof input !== 'string') return input;
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  },

  /**
   * Normalize string for comparison (lowercase, trim, remove special chars)
   * @param {string} str - String to normalize
   * @returns {string} - Normalized string
   */
  normalize: function(str) {
    if (typeof str !== 'string') return '';
    return str.toLowerCase().trim().replace(/[^\w\s]/gi, '');
  },

  /**
   * Truncate string to specified length
   * @param {string} str - String to truncate
   * @param {number} maxLength - Maximum length
   * @returns {string} - Truncated string
   */
  truncate: function(str, maxLength = 100) {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + '...';
  },

  /**
   * Convert string to title case
   * @param {string} str - String to convert
   * @returns {string} - Title cased string
   */
  toTitleCase: function(str) {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },

  // ================= ARRAY UTILITIES =================

  /**
   * Shuffle array randomly
   * @param {Array} array - Array to shuffle
   * @returns {Array} - Shuffled array
   */
  shuffle: function(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },

  /**
   * Get random items from array
   * @param {Array} array - Source array
   * @param {number} count - Number of items to get
   * @returns {Array} - Random items
   */
  getRandomItems: function(array, count) {
    const shuffled = this.shuffle(array);
    return shuffled.slice(0, count);
  },

  /**
   * Remove duplicates from array
   * @param {Array} array - Array with potential duplicates
   * @returns {Array} - Array without duplicates
   */
  unique: function(array) {
    return [...new Set(array)];
  },

  /**
   * Group array by key
   * @param {Array} array - Array of objects
   * @param {string} key - Key to group by
   * @returns {Object} - Grouped object
   */
  groupBy: function(array, key) {
    return array.reduce((result, item) => {
      const group = item[key];
      if (!result[group]) {
        result[group] = [];
      }
      result[group].push(item);
      return result;
    }, {});
  },

  // ================= DATE UTILITIES =================

  /**
   * Format date to readable string
   * @param {Date|string} date - Date to format
   * @returns {string} - Formatted date
   */
  formatDate: function(date) {
    const d = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString('en-US', options);
  },

  /**
   * Get time ago string
   * @param {Date|string} date - Past date
   * @returns {string} - Time ago string
   */
  timeAgo: function(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return interval + ' ' + unit + (interval === 1 ? '' : 's') + ' ago';
      }
    }
    
    return 'just now';
  },

  // ================= NUMBER UTILITIES =================

  /**
   * Format number with commas
   * @param {number} num - Number to format
   * @returns {string} - Formatted number
   */
  formatNumber: function(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  /**
   * Generate random number between min and max
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} - Random number
   */
  randomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * Calculate percentage
   * @param {number} value - Current value
   * @param {number} total - Total value
   * @param {number} decimals - Number of decimal places
   * @returns {number} - Percentage
   */
  percentage: function(value, total, decimals = 2) {
    if (total === 0) return 0;
    return parseFloat(((value / total) * 100).toFixed(decimals));
  },

  // ================= STORAGE UTILITIES =================

  /**
   * Safe localStorage get with error handling
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if not found
   * @returns {*} - Stored value or default
   */
  getStorage: function(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },

  /**
   * Safe localStorage set with error handling
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   * @returns {boolean} - Success status
   */
  setStorage: function(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   * @returns {boolean} - Success status
   */
  removeStorage: function(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  /**
   * Clear all localStorage
   * @returns {boolean} - Success status
   */
  clearStorage: function() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  // ================= DOM UTILITIES =================

  /**
   * Create element with attributes and content
   * @param {string} tag - HTML tag name
   * @param {Object} attributes - Element attributes
   * @param {string} content - Inner content
   * @returns {HTMLElement} - Created element
   */
  createElement: function(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    Object.keys(attributes).forEach(key => {
      if (key === 'className') {
        element.className = attributes[key];
      } else if (key === 'style' && typeof attributes[key] === 'object') {
        Object.assign(element.style, attributes[key]);
      } else {
        element.setAttribute(key, attributes[key]);
      }
    });
    
    if (content) {
      element.innerHTML = content;
    }
    
    return element;
  },

  /**
   * Show element with animation
   * @param {HTMLElement} element - Element to show
   * @param {string} display - Display value
   */
  show: function(element, display = 'block') {
    element.style.display = display;
    setTimeout(() => {
      element.classList.add('visible');
    }, 10);
  },

  /**
   * Hide element with animation
   * @param {HTMLElement} element - Element to hide
   */
  hide: function(element) {
    element.classList.remove('visible');
    setTimeout(() => {
      element.style.display = 'none';
    }, 300);
  },

  // ================= VALIDATION UTILITIES =================

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} - Is valid
   */
  isValidEmail: function(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {Object} - Validation result
   */
  validatePassword: function(password) {
    const result = {
      valid: true,
      errors: []
    };
    
    if (password.length < 6) {
      result.valid = false;
      result.errors.push('Password must be at least 6 characters');
    }
    
    if (password.length < 8) {
      result.errors.push('Consider using 8+ characters for better security');
    }
    
    if (!/[A-Z]/.test(password)) {
      result.errors.push('Consider adding uppercase letters');
    }
    
    if (!/[0-9]/.test(password)) {
      result.errors.push('Consider adding numbers');
    }
    
    if (!/[^A-Za-z0-9]/.test(password)) {
      result.errors.push('Consider adding special characters');
    }
    
    return result;
  },

  /**
   * Validate URL format
   * @param {string} url - URL to validate
   * @returns {boolean} - Is valid
   */
  isValidURL: function(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // ================= DEBOUNCE/THROTTLE =================

  /**
   * Debounce function calls
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in ms
   * @returns {Function} - Debounced function
   */
  debounce: function(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Throttle function calls
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in ms
   * @returns {Function} - Throttled function
   */
  throttle: function(func, limit = 300) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // ================= URL UTILITIES =================

  /**
   * Get URL parameter value
   * @param {string} param - Parameter name
   * @returns {string|null} - Parameter value
   */
  getUrlParam: function(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  },

  /**
   * Set URL parameter
   * @param {string} param - Parameter name
   * @param {string} value - Parameter value
   */
  setUrlParam: function(param, value) {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.history.pushState({}, '', url);
  },

  /**
   * Remove URL parameter
   * @param {string} param - Parameter name
   */
  removeUrlParam: function(param) {
    const url = new URL(window.location);
    url.searchParams.delete(param);
    window.history.pushState({}, '', url);
  },

  // ================= PERFORMANCE UTILITIES =================

  /**
   * Measure function execution time
   * @param {Function} func - Function to measure
   * @param {string} label - Label for console
   * @returns {*} - Function result
   */
  measurePerformance: function(func, label = 'Function') {
    const start = performance.now();
    const result = func();
    const end = performance.now();
    console.log(`${label} took ${(end - start).toFixed(2)}ms`);
    return result;
  },

  /**
   * Lazy load images
   * @param {string} selector - Image selector
   */
  lazyLoadImages: function(selector = 'img[data-src]') {
    const images = document.querySelectorAll(selector);
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  },

  // ================= EXPORT UTILITIES =================

  /**
   * Export data to JSON file
   * @param {*} data - Data to export
   * @param {string} filename - File name
   */
  exportJSON: function(data, filename = 'export.json') {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  },

  /**
   * Export data to CSV file
   * @param {Array} data - Array of objects
   * @param {string} filename - File name
   */
  exportCSV: function(data, filename = 'export.csv') {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(','),
      ...data.map(row => headers.map(header => 
        JSON.stringify(row[header] || '')
      ).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  },

  // ================= COPY TO CLIPBOARD =================

  /**
   * Copy text to clipboard
   * @param {string} text - Text to copy
   * @returns {Promise<boolean>} - Success status
   */
  copyToClipboard: async function(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      } catch (err) {
        document.body.removeChild(textArea);
        console.error('Copy failed:', err);
        return false;
      }
    }
  },

  // ================= NOTIFICATION SYSTEM =================

  /**
   * Show notification
   * @param {string} message - Notification message
   * @param {string} type - Notification type (success, error, info)
   * @param {number} duration - Duration in ms
   */
  notify: function(message, type = 'info', duration = 3000) {
    const notification = this.createElement('div', {
      className: `notification notification-${type}`
    }, message);
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, duration);
  },

  // ================= SCREEN SIZE DETECTION =================

  /**
   * Check if mobile device
   * @returns {boolean} - Is mobile
   */
  isMobile: function() {
    return window.innerWidth <= 768;
  },

  /**
   * Check if tablet device
   * @returns {boolean} - Is tablet
   */
  isTablet: function() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
  },

  /**
   * Check if desktop device
   * @returns {boolean} - Is desktop
   */
  isDesktop: function() {
    return window.innerWidth > 1024;
  },

  // ================= COLOR UTILITIES =================

  /**
   * Convert hex to RGB
   * @param {string} hex - Hex color
   * @returns {Object} - RGB object
   */
  hexToRgb: function(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  /**
   * Generate random hex color
   * @returns {string} - Random hex color
   */
  randomColor: function() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }
};

// Make utilities globally available
window.MovieManiacUtils = MovieManiacUtils;

// ================= END OF UTILITIES =================