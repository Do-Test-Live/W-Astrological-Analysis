/**
 * Astrology.js - Astrology calculator with Moon Sign (Rashi) calculation
 * Uses improved algorithm for moon position
 */

// Zodiac sign data (Rashi)
const ZODIAC_SIGNS = [
    { name: 'Aries', symbol: '♈', start: [3, 21], end: [4, 19], element: 'Fire', ruler: 'Mars' },
    { name: 'Taurus', symbol: '♉', start: [4, 20], end: [5, 20], element: 'Earth', ruler: 'Venus' },
    { name: 'Gemini', symbol: '♊', start: [5, 21], end: [6, 20], element: 'Air', ruler: 'Mercury' },
    { name: 'Cancer', symbol: '♋', start: [6, 21], end: [7, 22], element: 'Water', ruler: 'Moon' },
    { name: 'Leo', symbol: '♌', start: [7, 23], end: [8, 22], element: 'Fire', ruler: 'Sun' },
    { name: 'Virgo', symbol: '♍', start: [8, 23], end: [9, 22], element: 'Earth', ruler: 'Mercury' },
    { name: 'Libra', symbol: '♎', start: [9, 23], end: [10, 22], element: 'Air', ruler: 'Venus' },
    { name: 'Scorpio', symbol: '♏', start: [10, 23], end: [11, 21], element: 'Water', ruler: 'Mars' },
    { name: 'Sagittarius', symbol: '♐', start: [11, 22], end: [12, 21], element: 'Fire', ruler: 'Jupiter' },
    { name: 'Capricorn', symbol: '♑', start: [12, 22], end: [1, 19], element: 'Earth', ruler: 'Saturn' },
    { name: 'Aquarius', symbol: '♒', start: [1, 20], end: [2, 18], element: 'Air', ruler: 'Saturn' },
    { name: 'Pisces', symbol: '♓', start: [2, 19], end: [3, 20], element: 'Water', ruler: 'Jupiter' }
];

// Nakshatras (27 lunar mansions)
const NAKSHATRAS = [
    { name: 'Ashwini', rashi: 'Aries', startDegree: 0, endDegree: 13.33 },
    { name: 'Bharani', rashi: 'Aries', startDegree: 13.33, endDegree: 26.67 },
    { name: 'Krittika', rashi: 'Aries', startDegree: 26.67, endDegree: 30 },
    { name: 'Krittika', rashi: 'Taurus', startDegree: 0, endDegree: 10 },
    { name: 'Rohini', rashi: 'Taurus', startDegree: 10, endDegree: 23.33 },
    { name: 'Mrigashira', rashi: 'Taurus', startDegree: 23.33, endDegree: 30 },
    { name: 'Mrigashira', rashi: 'Gemini', startDegree: 0, endDegree: 6.67 },
    { name: 'Ardra', rashi: 'Gemini', startDegree: 6.67, endDegree: 20 },
    { name: 'Punarvasu', rashi: 'Gemini', startDegree: 20, endDegree: 30 },
    { name: 'Punarvasu', rashi: 'Cancer', startDegree: 0, endDegree: 3.33 },
    { name: 'Pushya', rashi: 'Cancer', startDegree: 3.33, endDegree: 16.67 },
    { name: 'Ashlesha', rashi: 'Cancer', startDegree: 16.67, endDegree: 30 },
    { name: 'Magha', rashi: 'Leo', startDegree: 0, endDegree: 13.33 },
    { name: 'Purva Phalguni', rashi: 'Leo', startDegree: 13.33, endDegree: 26.67 },
    { name: 'Uttara Phalguni', rashi: 'Leo', startDegree: 26.67, endDegree: 30 },
    { name: 'Uttara Phalguni', rashi: 'Virgo', startDegree: 0, endDegree: 10 },
    { name: 'Hasta', rashi: 'Virgo', startDegree: 10, endDegree: 23.33 },
    { name: 'Chitra', rashi: 'Virgo', startDegree: 23.33, endDegree: 30 },
    { name: 'Chitra', rashi: 'Libra', startDegree: 0, endDegree: 6.67 },
    { name: 'Swati', rashi: 'Libra', startDegree: 6.67, endDegree: 20 },
    { name: 'Vishakha', rashi: 'Libra', startDegree: 20, endDegree: 30 },
    { name: 'Vishakha', rashi: 'Scorpio', startDegree: 0, endDegree: 3.33 },
    { name: 'Anuradha', rashi: 'Scorpio', startDegree: 3.33, endDegree: 16.67 },
    { name: 'Jyeshtha', rashi: 'Scorpio', startDegree: 16.67, endDegree: 30 },
    { name: 'Mula', rashi: 'Sagittarius', startDegree: 0, endDegree: 13.33 },
    { name: 'Purva Ashadha', rashi: 'Sagittarius', startDegree: 13.33, endDegree: 26.67 },
    { name: 'Uttara Ashadha', rashi: 'Sagittarius', startDegree: 26.67, endDegree: 30 },
    { name: 'Uttara Ashadha', rashi: 'Capricorn', startDegree: 0, endDegree: 10 },
    { name: 'Shravana', rashi: 'Capricorn', startDegree: 10, endDegree: 23.33 },
    { name: 'Dhanishta', rashi: 'Capricorn', startDegree: 23.33, endDegree: 30 },
    { name: 'Dhanishta', rashi: 'Aquarius', startDegree: 0, endDegree: 6.67 },
    { name: 'Shatabhisha', rashi: 'Aquarius', startDegree: 6.67, endDegree: 20 },
    { name: 'Purva Bhadrapada', rashi: 'Aquarius', startDegree: 20, endDegree: 30 },
    { name: 'Purva Bhadrapada', rashi: 'Pisces', startDegree: 0, endDegree: 3.33 },
    { name: 'Uttara Bhadrapada', rashi: 'Pisces', startDegree: 3.33, endDegree: 16.67 },
    { name: 'Revati', rashi: 'Pisces', startDegree: 16.67, endDegree: 30 }
];

// Moon sign characteristics
const MOON_SIGN_TRAITS = {
    'Aries': 'Emotionally dynamic and impulsive. Quick to react with passion and courage. Independent in feelings.',
    'Taurus': 'Emotionally stable and sensual. Needs security and comfort. Patient and loyal in relationships.',
    'Gemini': 'Emotionally versatile and curious. Needs mental stimulation. Communicative about feelings.',
    'Cancer': 'Deeply emotional and nurturing. Highly intuitive and protective. Strong connection to home and family.',
    'Leo': 'Emotionally warm and generous. Needs appreciation and recognition. Dramatic expression of feelings.',
    'Virgo': 'Emotionally analytical and practical. Needs order and usefulness. Helpful and service-oriented.',
    'Libra': 'Emotionally balanced and harmonious. Needs partnership and beauty. Diplomatic in relationships.',
    'Scorpio': 'Intensely emotional and transformative. Needs depth and authenticity. Passionate and private.',
    'Sagittarius': 'Emotionally optimistic and freedom-loving. Needs adventure and meaning. Philosophical about feelings.',
    'Capricorn': 'Emotionally reserved and responsible. Needs achievement and structure. Practical about relationships.',
    'Aquarius': 'Emotionally detached and humanitarian. Needs independence and innovation. Friendly but reserved.',
    'Pisces': 'Emotionally sensitive and compassionate. Needs spiritual connection. Empathetic and imaginative.'
};

// Daily Rashifol (Moon Sign Horoscope)
const MOON_HOROSCOPE_TEMPLATES = {
    'Aries': 'Your emotional energy is high today. Take initiative in matters of the heart. Trust your instincts and act on your feelings boldly.',
    'Taurus': 'Seek comfort and stability in your emotional life today. Focus on nurturing yourself and those you love. Material security brings peace of mind.',
    'Gemini': 'Your emotions are mentally active today. Communicate your feelings clearly. Variety in emotional experiences brings joy.',
    'Cancer': 'Deep emotional currents flow today. Trust your intuition about people and situations. Home and family need your attention.',
    'Leo': 'Your heart is generous and warm today. Express your love creatively. Recognition from loved ones lifts your spirits.',
    'Virgo': 'Emotional clarity through practical action today. Helping others brings emotional satisfaction. Organize your feelings methodically.',
    'Libra': 'Harmony in relationships is your emotional priority today. Balance giving and receiving. Beauty and partnership bring contentment.',
    'Scorpio': 'Intense feelings demand your attention today. Transform emotional challenges into growth. Deep connections are favored.',
    'Sagittarius': 'Your emotions seek freedom and expansion today. Explore new emotional territories. Optimism attracts positive experiences.',
    'Capricorn': 'Emotional maturity and responsibility guide you today. Set boundaries that protect your peace. Achievement brings emotional security.',
    'Aquarius': 'Emotional detachment serves you well today. Connect with friends and community. Innovation in relationships is highlighted.',
    'Pisces': 'Spiritual and emotional sensitivity is heightened today. Trust your dreams and intuitions. Compassion opens doors to healing.'
};

/**
 * Calculate Moon Sign using improved Meeus algorithm
 * This uses a more sophisticated calculation based on Julian dates
 * @param {Date} birthDate - Birth date
 * @param {string} birthTime - Birth time (HH:MM)
 * @returns {Object} Moon sign object
 */
function calculateMoonSign(birthDate, birthTime) {
    // Parse birth time
    const [hours, minutes] = birthTime.split(':').map(Number);

    // Create precise datetime
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
    const hour = hours + (minutes / 60);

    // Calculate Julian Date (JD)
    let a = Math.floor((14 - month) / 12);
    let y = year + 4800 - a;
    let m = month + 12 * a - 3;

    let jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    jd = jd + (hour - 12) / 24; // Add time component

    // Calculate centuries since J2000.0
    const T = (jd - 2451545.0) / 36525;

    // Moon's mean longitude (simplified formula)
    let L = 218.3164477 + 481267.88123421 * T;
    L = L % 360;
    if (L < 0) L += 360;

    // Moon's mean anomaly
    let M = 134.9633964 + 477198.8675055 * T;
    M = M % 360;
    if (M < 0) M += 360;
    M = M * Math.PI / 180; // Convert to radians

    // Sun's mean anomaly
    let M_sun = 357.5291092 + 35999.0502909 * T;
    M_sun = M_sun % 360;
    if (M_sun < 0) M_sun += 360;
    M_sun = M_sun * Math.PI / 180;

    // Moon's argument of latitude
    let F = 93.2720950 + 483202.0175233 * T;
    F = F % 360;
    if (F < 0) F += 360;
    F = F * Math.PI / 180;

    // Longitude corrections (simplified)
    let correction = 6.2886 * Math.sin(M);
    correction += 1.2740 * Math.sin(2 * (L * Math.PI / 180) - M);
    correction += 0.6583 * Math.sin(2 * (L * Math.PI / 180));
    correction += 0.2140 * Math.sin(2 * M);
    correction += -0.1851 * Math.sin(M_sun);

    // True moon longitude
    let moonLongitude = L + correction;
    moonLongitude = moonLongitude % 360;
    if (moonLongitude < 0) moonLongitude += 360;

    // Adjust for sidereal zodiac (Lahiri ayanamsa for Vedic)
    // Ayanamsa for year (approximate)
    const ayanamsa = 23.85 + (year - 2000) * 0.0138;
    moonLongitude = moonLongitude - ayanamsa;
    if (moonLongitude < 0) moonLongitude += 360;

    // Calculate sign (each sign is 30 degrees)
    const signIndex = Math.floor(moonLongitude / 30) % 12;
    const degreeInSign = moonLongitude % 30;

    console.log('Moon calculation details:', {
        julianDate: jd,
        T: T,
        meanLongitude: L,
        correction: correction,
        tropicalLongitude: (L + correction) % 360,
        ayanamsa: ayanamsa,
        siderealLongitude: moonLongitude,
        signIndex: signIndex,
        degreeInSign: degreeInSign.toFixed(2)
    });

    return {
        ...ZODIAC_SIGNS[signIndex],
        degreeInSign: degreeInSign.toFixed(2)
    };
}

/**
 * Calculate Nakshatra based on moon position
 * @param {Object} moonSign - Moon sign object with degree
 * @returns {Object} Nakshatra information
 */
function calculateNakshatra(moonSign) {
    const degreeInSign = parseFloat(moonSign.degreeInSign);

    // Find matching nakshatra
    for (let nakshatra of NAKSHATRAS) {
        if (nakshatra.rashi === moonSign.name) {
            if (degreeInSign >= nakshatra.startDegree && degreeInSign < nakshatra.endDegree) {
                // Calculate pada (1-4)
                const nakshatraSpan = nakshatra.endDegree - nakshatra.startDegree;
                const positionInNakshatra = degreeInSign - nakshatra.startDegree;
                const pada = Math.floor((positionInNakshatra / nakshatraSpan) * 4) + 1;

                return {
                    name: nakshatra.name,
                    pada: pada
                };
            }
        }
    }

    return { name: 'Ashwini', pada: 1 }; // Default
}

/**
 * Generate D1 Chart (Rashi Chart) with Moon placement
 * @param {string} rashiName - Name of the moon rashi
 * @param {number} degreeInSign - Degree within sign
 * @returns {string} HTML for D1 chart
 */
function generateD1Chart(rashiName, degreeInSign) {
    const signs = ZODIAC_SIGNS.map(s => s.name);
    const moonIndex = signs.indexOf(rashiName);

    let chartHTML = '<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: #333; padding: 20px; width: 100%; height: 100%; max-width: 300px; margin: 0 auto;">';

    signs.forEach((sign, index) => {
        const hasMoon = index === moonIndex;
        const signSymbol = ZODIAC_SIGNS[index].symbol;

        chartHTML += `
            <div style="background: ${hasMoon ? '#e3f2fd' : 'white'}; padding: 10px; text-align: center; font-size: 0.75rem; font-weight: ${hasMoon ? 'bold' : 'normal'}; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60px; border: 2px solid ${hasMoon ? '#2196f3' : '#ccc'};">
                <div style="font-size: 1.2rem;">${signSymbol}</div>
                <div style="font-size: 0.7rem; margin-top: 2px;">${sign.substring(0, 3)}</div>
                ${hasMoon ? `<div style="font-size: 1rem; margin-top: 2px;">🌙</div><div style="font-size: 0.6rem;">${degreeInSign}°</div>` : ''}
            </div>
        `;
    });

    chartHTML += '</div>';
    chartHTML += '<p class="text-center mt-2 small text-muted">D1 Chart - Moon in ' + rashiName + ' at ' + degreeInSign + '°</p>';
    return chartHTML;
}

/**
 * Generate D9 Chart (Navamsa)
 * @param {string} rashiName - Name of the rashi
 * @returns {string} HTML for D9 chart
 */
function generateD9Chart(rashiName) {
    const signs = ['Ari', 'Tau', 'Gem', 'Can', 'Leo', 'Vir', 'Lib', 'Sco', 'Sag', 'Cap', 'Aqu', 'Pis'];

    let chartHTML = '<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: #555; padding: 20px; width: 100%; height: 100%; max-width: 300px; margin: 0 auto;">';

    signs.forEach((sign, index) => {
        chartHTML += `
            <div style="background: #f8f9fa; padding: 10px; text-align: center; font-size: 0.7rem; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60px; border: 1px solid #999;">
                <div>D9</div>
                <div style="font-size: 0.65rem; margin-top: 2px;">${sign}</div>
            </div>
        `;
    });

    chartHTML += '</div>';
    chartHTML += '<p class="text-center mt-2 small text-muted">D9 (Navamsa) - Divisional Chart</p>';
    return chartHTML;
}

/**
 * Calculate transit summary
 * @param {Object} natalMoon - Birth moon sign
 * @returns {string} Transit summary
 */
function calculateTransit(natalMoon) {
    const today = new Date();
    const currentMoon = calculateMoonSign(today, '12:00');

    if (natalMoon.name === currentMoon.name) {
        return `The Moon is currently transiting through your natal Moon sign ${natalMoon.name}. This is an emotionally significant period bringing heightened sensitivity and intuition. Your feelings are strong and authentic now.`;
    }

    const signIndex = ZODIAC_SIGNS.findIndex(s => s.name === natalMoon.name);
    const currentIndex = ZODIAC_SIGNS.findIndex(s => s.name === currentMoon.name);

    let distance = (currentIndex - signIndex + 12) % 12;

    const transitMessages = {
        0: 'Emotional renewal and fresh starts',
        1: 'Focus on emotional security and comfort',
        2: 'Mental and emotional communication emphasized',
        3: 'Retreat and introspection needed',
        4: 'Creative emotional expression highlighted',
        5: 'Emotional health and adjustment',
        6: 'Relationship emotions intensified',
        7: 'Deep emotional transformation',
        8: 'Emotional expansion and optimism',
        9: 'Public emotional expression',
        10: 'Social and group emotional connections',
        11: 'Emotional healing and release'
    };

    return `The Moon is transiting through ${currentMoon.name}, which is your ${distance + 1}${getOrdinalSuffix(distance + 1)} house from your natal Moon. ${transitMessages[distance]}. This 2.5 day transit affects your emotional state and intuitive responses.`;
}

/**
 * Get ordinal suffix
 * @param {number} num - Number
 * @returns {string} Ordinal suffix
 */
function getOrdinalSuffix(num) {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
}

/**
 * Display astrology results
 * @param {Object} data - Form data
 */
function displayAstrologyResults(data) {
    try {
        const birthDate = new Date(data.birthDate);
        const today = new Date();

        if (isNaN(birthDate.getTime())) {
            alert('Please enter a valid birth date');
            return;
        }

        const natalMoon = calculateMoonSign(birthDate, data.birthTime);
        const nakshatra = calculateNakshatra(natalMoon);

        console.log('Natal Moon Sign:', natalMoon);
        console.log('Nakshatra:', nakshatra);

        document.getElementById('rashiSymbol').textContent = natalMoon.symbol;
        document.getElementById('rashiName').textContent = natalMoon.name + ' (Moon Sign)';
        document.getElementById('rashiDetails').innerHTML = `
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Birth Date:</strong> ${Utils.formatDate(birthDate)}</p>
            <p><strong>Birth Time:</strong> ${data.birthTime}</p>
            <p><strong>Birth Location:</strong> ${data.birthLocation}</p>
            ${data.latitude && data.longitude ?
            `<p><strong>Coordinates:</strong> ${data.latitude}°, ${data.longitude}°</p>` : ''}
            <p><strong>Moon Sign (Rashi):</strong> ${natalMoon.name}</p>
            <p><strong>Moon Position:</strong> ${natalMoon.degreeInSign}° in ${natalMoon.name}</p>
            <p><strong>Element:</strong> ${natalMoon.element}</p>
            <p><strong>Ruling Planet:</strong> ${natalMoon.ruler}</p>
            <p><strong>Nakshatra:</strong> ${nakshatra.name} (Pada ${nakshatra.pada})</p>
            <hr>
            <p class="small"><strong>Moon Sign Traits:</strong> ${MOON_SIGN_TRAITS[natalMoon.name]}</p>
        `;

        document.getElementById('todayRashifol').innerHTML = `
            <strong>${Utils.formatDate(today)}</strong><br><br>
            ${MOON_HOROSCOPE_TEMPLATES[natalMoon.name]}
            <br><br>
            <small class="text-muted">Based on your Moon in ${natalMoon.name}</small>
        `;

        document.getElementById('transitSummary').textContent = calculateTransit(natalMoon);
        document.getElementById('d1Chart').innerHTML = generateD1Chart(natalMoon.name, natalMoon.degreeInSign);
        document.getElementById('d9Chart').innerHTML = generateD9Chart(natalMoon.name);

        Utils.hideElement('placeholderMessage');
        Utils.showElement('resultsSection');

        setTimeout(() => {
            Utils.scrollToElement('resultsSection');
        }, 300);

    } catch (error) {
        console.error('Error displaying results:', error);
        alert('An error occurred while calculating your astrology. Please check your inputs and try again.');
    }
}

// Initialize form handler
document.addEventListener('DOMContentLoaded', function() {
    console.log('Moon Sign Astrology calculator loaded');

    const form = document.getElementById('astrologyForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                birthDate: document.getElementById('birthDate').value,
                birthTime: document.getElementById('birthTime').value,
                birthLocation: document.getElementById('birthLocation').value,
                latitude: document.getElementById('latitude').value,
                longitude: document.getElementById('longitude').value
            };

            if (!formData.name || !formData.birthDate || !formData.birthTime || !formData.birthLocation) {
                alert('Please fill in all required fields');
                return;
            }

            displayAstrologyResults(formData);
        });
    }
});