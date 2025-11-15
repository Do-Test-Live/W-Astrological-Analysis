/**
 * Numerology.js - Numerology calculator using Pythagorean system
 * Calculates Life Path, Expression, and Soul Urge numbers
 */

// Pythagorean numerology chart (A=1, B=2, ..., I=9, J=1, ...)
const NUMEROLOGY_CHART = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
    'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
};

// Vowels for Soul Urge calculation
const VOWELS = ['A', 'E', 'I', 'O', 'U'];

// Number meanings
const NUMBER_MEANINGS = {
    1: 'Leadership, independence, and pioneering spirit. You are a natural leader with innovative ideas and strong willpower.',
    2: 'Cooperation, diplomacy, and sensitivity. You excel at bringing people together and creating harmony in relationships.',
    3: 'Creativity, self-expression, and joy. You have a gift for communication and inspire others with your optimistic outlook.',
    4: 'Stability, practicality, and hard work. You build strong foundations and are reliable, organized, and disciplined.',
    5: 'Freedom, adventure, and versatility. You thrive on change and variety, with a curious and adaptable nature.',
    6: 'Responsibility, nurturing, and service. You are caring and protective, with a strong sense of duty to family and community.',
    7: 'Spirituality, analysis, and wisdom. You seek deeper truths and understanding through introspection and study.',
    8: 'Ambition, success, and material mastery. You have strong business acumen and the ability to manifest abundance.',
    9: 'Compassion, humanitarianism, and completion. You are idealistic and work toward the greater good of all.',
    11: 'Intuition, inspiration, and spiritual insight. Master number representing enlightenment and visionary thinking.',
    22: 'Master builder, practical idealism, and manifesting dreams. You have the power to turn grand visions into reality.',
    33: 'Master teacher, compassion, and selfless service. You embody unconditional love and spiritual guidance for others.'
};

/**
 * Reduce number to single digit or master number
 * @param {number} num - Number to reduce
 * @param {boolean} preserveMaster - Whether to preserve master numbers
 * @returns {number} Reduced number
 */
function reduceToSingleDigit(num, preserveMaster = true) {
    while (num > 9) {
        // Preserve master numbers 11, 22, 33
        if (preserveMaster && (num === 11 || num === 22 || num === 33)) {
            return num;
        }

        // Sum the digits
        let sum = 0;
        while (num > 0) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }
        num = sum;
    }
    return num;
}

/**
 * Calculate Life Path number from birth date
 * @param {string} dateString - Date string (YYYY-MM-DD)
 * @returns {Object} Life path number and calculation steps
 */
function calculateLifePath(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Calculate each component
    const yearSum = reduceToSingleDigit(year);
    const monthSum = reduceToSingleDigit(month);
    const daySum = reduceToSingleDigit(day);

    // Add all components
    const total = yearSum + monthSum + daySum;
    const lifePath = reduceToSingleDigit(total);

    const calculation = `${day} + ${month} + ${year} = ${daySum} + ${monthSum} + ${yearSum} = ${total} = ${lifePath}`;

    return {
        number: lifePath,
        calculation: calculation,
        meaning: NUMBER_MEANINGS[lifePath]
    };
}

/**
 * Calculate Expression/Destiny number from full name
 * @param {string} fullName - Full name
 * @returns {Object} Expression number and calculation steps
 */
function calculateExpression(fullName) {
    const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
    let sum = 0;
    let values = [];

    for (let char of cleanName) {
        if (NUMEROLOGY_CHART[char]) {
            const value = NUMEROLOGY_CHART[char];
            sum += value;
            values.push(value);
        }
    }

    const expression = reduceToSingleDigit(sum);
    const calculation = `${fullName} = ${values.join(' + ')} = ${sum} = ${expression}`;

    return {
        number: expression,
        calculation: calculation,
        meaning: NUMBER_MEANINGS[expression]
    };
}

/**
 * Calculate Soul Urge number from vowels in name
 * @param {string} fullName - Full name
 * @returns {Object} Soul Urge number and calculation steps
 */
function calculateSoulUrge(fullName) {
    const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
    let sum = 0;
    let values = [];

    for (let char of cleanName) {
        if (VOWELS.includes(char) && NUMEROLOGY_CHART[char]) {
            const value = NUMEROLOGY_CHART[char];
            sum += value;
            values.push(value);
        }
    }

    const soulUrge = reduceToSingleDigit(sum);
    const vowelsFound = cleanName.split('').filter(c => VOWELS.includes(c)).join('');
    const calculation = `Vowels (${vowelsFound}) = ${values.join(' + ')} = ${sum} = ${soulUrge}`;

    return {
        number: soulUrge,
        calculation: calculation,
        meaning: NUMBER_MEANINGS[soulUrge]
    };
}

/**
 * Display numerology results
 * @param {Object} data - Form data
 */
function displayNumerologyResults(data) {
    // Calculate all numbers
    const lifePath = calculateLifePath(data.dateOfBirth);
    const expression = calculateExpression(data.fullName);
    const soulUrge = calculateSoulUrge(data.fullName);

    // Display Life Path
    document.getElementById('lifePathNumber').textContent = lifePath.number;
    document.getElementById('lifePathMeaning').textContent = lifePath.meaning;
    document.getElementById('lifePathCalc').textContent = lifePath.calculation;

    // Display Expression
    document.getElementById('expressionNumber').textContent = expression.number;
    document.getElementById('expressionMeaning').textContent = expression.meaning;
    document.getElementById('expressionCalc').textContent = expression.calculation;

    // Display Soul Urge
    document.getElementById('soulUrgeNumber').textContent = soulUrge.number;
    document.getElementById('soulUrgeMeaning').textContent = soulUrge.meaning;
    document.getElementById('soulUrgeCalc').textContent = soulUrge.calculation;

    // Display summary
    document.getElementById('summaryLifePath').textContent = lifePath.number;
    document.getElementById('summaryExpression').textContent = expression.number;
    document.getElementById('summarySoulUrge').textContent = soulUrge.number;

    // Show results, hide placeholder
    Utils.hideElement('numerologyPlaceholder');
    Utils.showElement('numerologyResults');

    // Scroll to results
    setTimeout(() => {
        Utils.scrollToElement('numerologyResults');
    }, 300);
}

// Initialize form handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('numerologyForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!Utils.validateForm(form)) {
                return;
            }

            // Collect form data
            const formData = {
                fullName: document.getElementById('fullName').value,
                dateOfBirth: document.getElementById('dateOfBirth').value
            };

            // Display results
            displayNumerologyResults(formData);
        });
    }
});
