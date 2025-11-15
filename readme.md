# Astro-Numerology Calculator

A complete, production-ready multi-page website for astrology (Rashi) and numerology calculations.

## 🌟 Features

### Astrology Calculator
- **Sun Sign (Rashi) Calculation**: Determines your zodiac sign based on birth date
- **Today's Rashifol**: Personalized daily horoscope for your sign
- **D1 Chart (Rashi Chart)**: Visual representation of your birth chart
- **D9 Chart (Navamsa)**: Divisional chart visualization
- **Transit Summary**: Current planetary transit analysis

### Numerology Calculator
- **Life Path Number**: Your life's purpose and journey
- **Expression/Destiny Number**: Natural talents and abilities
- **Soul Urge Number**: Inner desires and motivations
- **Detailed Calculations**: See how each number is derived

## 📁 Project Structure
```
project-root/
│
├── index.html              # Astrology calculator page
├── numerology.html         # Numerology calculator page
│
├── assets/
│   ├── css/
│   │   └── style.css       # Custom styles and responsive design
│   ├── js/
│   │   ├── astrology.js    # Astrology calculation logic
│   │   ├── numerology.js   # Numerology calculation logic
│   │   └── common.js       # Shared utility functions
│   └── img/
│       └── placeholder.png # Optional placeholder image
│
└── README.md              # This file
```

## 🚀 Getting Started

### Installation

1. **Download/Clone the project**
```bash
   # Create project directory
   mkdir astro-numerology
   cd astro-numerology
```

2. **Copy all files into the directory structure**
    - Ensure the folder structure matches the layout above
    - All file paths are relative and will work immediately

3. **Open in browser**
```bash
   # Simply open index.html in your web browser
   # No build process or server required!
```

### Usage

**Astrology Calculator:**
1. Navigate to `index.html`
2. Enter your birth details (name, date, time, location)
3. Optionally add latitude/longitude for precise calculations
4. Click "Calculate Rashi" to see your results

**Numerology Calculator:**
1. Navigate to `numerology.html`
2. Enter your full name and date of birth
3. Click "Calculate Numbers" to reveal your numerology profile

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations
- **Bootstrap 5.3**: Responsive grid and components
- **Vanilla JavaScript**: No frameworks or dependencies
- **No Build Tools**: Works directly in browser

## 📐 Calculation Methods

### Astrology
- **Sun Sign**: Calculated using tropical zodiac system based on month and day
- **Charts**: Placeholder visualizations using circular house divisions
- **Transits**: Compare natal sun position with current sun position

### Numerology
- **System**: Pythagorean (A=1, B=2, ... I=9, J=1, etc.)
- **Master Numbers**: Preserves 11, 22, and 33
- **Life Path**: Sum and reduce birth date components
- **Expression**: Sum and reduce all letters in full name
- **Soul Urge**: Sum and reduce only vowels in name

## 🎨 Customization

### Colors
Edit CSS variables in `assets/css/style.css`:
```css
:root {
    --primary-color: #0d6efd;
    --success-color: #198754;
    --info-color: #0dcaf0;
    --warning-color: #ffc107;
}
```

### Content
- **Horoscope Templates**: Edit `HOROSCOPE_TEMPLATES` in `astrology.js`
- **Number Meanings**: Edit `NUMBER_MEANINGS` in `numerology.js`
- **Zodiac Data**: Edit `ZODIAC_SIGNS` array in `astrology.js`

## 📱 Responsive Design

- Fully responsive layout using Bootstrap grid
- Mobile-optimized forms and cards
- Tablet and desktop layouts
- Touch-friendly interface

## ⚡ Performance

- Lightweight: No external dependencies except Bootstrap CDN
- Fast loading: Minimal CSS and JavaScript
- Client-side calculations: No server required
- Optimized animations: Smooth transitions

## 🔒 Privacy

- All calculations performed client-side
- No data sent to external servers
- No cookies or tracking
- User data never stored or transmitted

## 🧪 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Future Enhancements

Potential additions:
- [ ] More detailed house interpretations
- [ ] Planetary positions using astronomical calculations
- [ ] Compatibility calculator
- [ ] Print/export results as PDF
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Save results to local storage

## 🤝 Contributing

This is a standalone project, but improvements are welcome:
1. Add more accurate astronomical calculations
2. Enhance chart visualizations
3. Add more numerology systems
4. Improve mobile UX
5. Add accessibility features

## ⚖️ License

This project is free to use for personal and commercial purposes.

## ⚠️ Disclaimer

This calculator is for entertainment and self-reflection purposes only. Astrological and numerological interpretations should not be used as a substitute for professional advice in matters of health, legal, financial, or relationship decisions.

## 📧 Support

For issues or questions:
- Check that all files are in correct folder structure
- Ensure file paths match exactly as shown
- Verify Bootstrap CDN is accessible
- Check browser console for JavaScript errors

---

**Made with ❤️ for astrology and numerology enthusiasts**

*Current Version: 1.0.0*
*Last Updated: November 2025*