/**
 * Common.js - Shared utilities and helper functions
 * Used across both astrology and numerology calculators
 */

// Utility Functions
const Utils = {
    /**
     * Format date to readable string
     * @param {Date} date - Date object
     * @returns {string} Formatted date string
     */
    formatDate: function(date) {
        try {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        } catch (error) {
            console.error('Date formatting error:', error);
            return date.toString();
        }
    },

    /**
     * Show element with animation
     * @param {string} elementId - ID of element to show
     */
    showElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('d-none');
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.transition = 'opacity 0.5s';
                element.style.opacity = '1';
            }, 10);
        } else {
            console.warn(`Element ${elementId} not found`);
        }
    },

    /**
     * Hide element
     * @param {string} elementId - ID of element to hide
     */
    hideElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add('d-none');
        } else {
            console.warn(`Element ${elementId} not found`);
        }
    },

    /**
     * Validate form inputs
     * @param {HTMLFormElement} form - Form element
     * @returns {boolean} Is form valid
     */
    validateForm: function(form) {
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return false;
        }
        return true;
    },

    /**
     * Show notification toast
     * @param {string} message - Message to display
     * @param {string} type - Type of message (success, error, info)
     */
    showNotification: function(message, type = 'info') {
        console.log(`[${type.toUpperCase()}] ${message}`);
        // Could be enhanced with Bootstrap toast in the future
    },

    /**
     * Scroll to element smoothly
     * @param {string} elementId - ID of element to scroll to
     */
    scrollToElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Common utilities loaded successfully');

    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Make Utils available globally
window.Utils = Utils;