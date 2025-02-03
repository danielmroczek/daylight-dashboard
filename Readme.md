# Daylight Dashboard

A sleek, modern web application that provides detailed information about daylight hours and sun positions for your location. Built with vanilla JavaScript and CSS variables for a responsive, system-aware dark/light theme experience.

## Live Demo

Try it here: [Daylight Dashboard](https://danielmroczek.github.io/daylight-dashboard/)

## Project Origin

I've always preferred longer days over shorter ones. As a child, I believed the summer solstice was the happiest day of the year, and it genuinely felt that way. I dislike the transition from summer to autumn in the Northern Hemisphere, when daylight noticeably shortens. Recently, this topic frequently came up in conversations - "It's getting dark so early these days!"

I discovered lately that the summer solstice (the longest day) doesn't actually coincide with the earliest sunrise or the latest sunset - these occur on different dates. This fascinating detail inspired me to create a dashboard where people could:
- Track how daylight hours increase after winter (and celebrate accordingly)
- Monitor the shortening days as winter approaches (and plan their vitamin D supplements)
- Check if sunrise will happen before their morning commute (spoiler alert: in winter, probably not)
- Access various daylight statistics in one clean interface (because who doesn't love stats?)

Think of it as your personal almanac for the digital age, helping you stay in tune with nature's light show.

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