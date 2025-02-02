# Daylight Dashboard

A sleek, modern web application that provides detailed information about daylight hours and sun positions for your location. Built with vanilla JavaScript and CSS variables for a responsive, system-aware dark/light theme experience.

## Features

- 🌅 Real-time daylight information
- 📍 Automatic location detection (with fallback to IP-based location)
- 🌓 Automatic dark/light theme based on system preferences
- 📊 Detailed daylight statistics:
  - Current day length
  - Sunrise and sunset times
  - Daily daylight changes
  - Comparison with longest/shortest days
  - Sunrise and sunset extremes throughout the year

## Technology Stack

- Vanilla JavaScript (ES6+)
- CSS Custom Properties (variables)
- [SunCalc](https://github.com/mourner/suncalc) for solar calculations
- Responsive design with CSS Grid
- System-aware dark mode support

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/daylight-dashboard.git
```

2. Serve the project using a local server. For example, using Python:
```bash
python -m http.server 8000
```

3. Open your browser and navigate to `http://localhost:8000`

## API Dependencies

The application uses the following free APIs:
- OpenStreetMap's Nominatim for reverse geocoding
- ipapi.co for IP-based location fallback

## Browser Support

Supports all modern browsers that implement:
- CSS Custom Properties
- CSS Grid
- ES6+ JavaScript features
- Geolocation API

## License

MIT License - feel free to use and modify for your own projects!