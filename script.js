import SunCalc from 'https://cdn.skypack.dev/suncalc';

class DaylightDashboard {
    constructor() {
        this.locationStatus = document.getElementById('locationStatus');
        this.locationName = document.getElementById('locationName');
        this.initializeLocation();
    }

    async initializeLocation() {
        try {
            if ('geolocation' in navigator) {
                const position = await this.getCurrentPosition();
                const locationData = await this.getLocationName(position.coords.latitude, position.coords.longitude);
                this.updateDaylightInfo(position.coords.latitude, position.coords.longitude);
                this.locationStatus.textContent = 'Location obtained';
                this.locationName.textContent = locationData;
                setTimeout(() => this.locationStatus.classList.add('hide'), 1000);
            } else {
                const ipData = await this.getLocationByIP();
                this.updateDaylightInfo(ipData.latitude, ipData.longitude);
                this.locationStatus.textContent = 'Location obtained via IP';
                this.locationName.textContent = `${ipData.city, ipData.country_name}`;
                setTimeout(() => this.locationStatus.classList.add('hide'), 1000);
            }
        } catch (error) {
            this.locationStatus.textContent = 'Error getting location: ' + error.message;
        }
    }

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    async getLocationByIP() {
        const response = await fetch('https://ipapi.co/json/');
        return await response.json();
    }

    async getLocationName(lat, lon) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
            const data = await response.json();
            return data.address.city || data.address.town || data.address.village || data.address.suburb || 'Unknown location';
        } catch (error) {
            console.error('Error fetching location name:', error);
            return 'Unknown location';
        }
    }

    updateDaylightInfo(latitude, longitude) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const summerSolstice = new Date(today.getFullYear(), 5, 21);
        const winterSolstice = new Date(today.getFullYear(), 11, 21);

        const todayTimes = SunCalc.getTimes(today, latitude, longitude);
        const tomorrowTimes = SunCalc.getTimes(tomorrow, latitude, longitude);
        const yesterdayTimes = SunCalc.getTimes(yesterday, latitude, longitude);
        const summerTimes = SunCalc.getTimes(summerSolstice, latitude, longitude);
        const winterTimes = SunCalc.getTimes(winterSolstice, latitude, longitude);

        const todayLength = this.getDayLength(todayTimes);
        const summerLength = this.getDayLength(summerTimes);
        const winterLength = this.getDayLength(winterTimes);
        const yesterdayLength = this.getDayLength(yesterdayTimes);
        const tomorrowLength = this.getDayLength(tomorrowTimes);

        document.getElementById('dayLength').textContent = this.formatDuration(todayLength);
        document.getElementById('sunrise').textContent = this.formatTime(todayTimes.sunrise);
        document.getElementById('sunset').textContent = this.formatTime(todayTimes.sunset);
        document.getElementById('fromLongest').textContent = this.formatDuration(summerLength - todayLength);
        document.getElementById('fromShortest').textContent = this.formatDuration(todayLength - winterLength);
        
        const dailyChange = (tomorrowLength - yesterdayLength) / 2;
        const changeText = `${this.formatMinutesAndSeconds(Math.abs(dailyChange))} (${dailyChange > 0 ? 'increasing' : 'decreasing'})`;
        document.getElementById('dailyChange').textContent = changeText;

        // Add sunrise extremes calculation and display
        const sunriseExtremes = this.calculateSunriseExtremes(latitude, longitude);
        const sunsetExtremes = this.calculateSunsetExtremes(latitude, longitude);
        
        // Update sunrise extremes display
        document.getElementById('earliestSunriseDate').textContent = this.formatDate(sunriseExtremes.earliest.date);
        document.getElementById('earliestSunriseTime').textContent = this.formatTime(sunriseExtremes.earliest.time);
        document.getElementById('latestSunriseDate').textContent = this.formatDate(sunriseExtremes.latest.date);
        document.getElementById('latestSunriseTime').textContent = this.formatTime(sunriseExtremes.latest.time);

        // Update sunset extremes display
        document.getElementById('earliestSunsetDate').textContent = this.formatDate(sunsetExtremes.earliest.date);
        document.getElementById('earliestSunsetTime').textContent = this.formatTime(sunsetExtremes.earliest.time);
        document.getElementById('latestSunsetDate').textContent = this.formatDate(sunsetExtremes.latest.date);
        document.getElementById('latestSunsetTime').textContent = this.formatTime(sunsetExtremes.latest.time);
    }

    formatMinutesAndSeconds(minutes) {
        const mins = Math.floor(Math.abs(minutes));
        const secs = Math.round((Math.abs(minutes) - mins) * 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    calculateSunriseExtremes(latitude, longitude) {
        const year = new Date().getFullYear();
        let earliest = { time: new Date(year, 0, 1, 23, 59), date: null };
        let latest = { time: new Date(year, 0, 1, 0, 0), date: null };

        // Check around winter solstice (December) for latest sunrise
        // and around summer solstice (June) for earliest sunrise
        const periods = [
            { start: 11, days: 31 }, // December
            { start: 0, days: 31 },  // January
            { start: 5, days: 31 },  // June
            { start: 4, days: 31 },  // May
            { start: 6, days: 31 },  // July
            { start: 7, days: 31 }   // July
        ];

        for (const period of periods) {
            for (let day = 1; day <= period.days; day++) {
                const date = new Date(year, period.start, day);
                const times = SunCalc.getTimes(date, latitude, longitude);
                
                // Normalize times to compare only time of day, not date
                const sunriseTime = new Date(times.sunrise);
                const normalizedTime = new Date(year, 0, 1, 
                    sunriseTime.getHours(), 
                    sunriseTime.getMinutes()
                );

                if (normalizedTime < earliest.time) {
                    earliest = { 
                        time: normalizedTime, 
                        date: new Date(date) 
                    };
                }
                if (normalizedTime > latest.time) {
                    latest = { 
                        time: normalizedTime, 
                        date: new Date(date) 
                    };
                }
            }
        }

        return { earliest, latest };
    }

    calculateSunsetExtremes(latitude, longitude) {
        const year = new Date().getFullYear();
        let earliest = { time: new Date(year, 0, 1, 23, 59), date: null };
        let latest = { time: new Date(year, 0, 1, 0, 0), date: null };

        // Check around winter solstice (December) for earliest sunset
        // and around summer solstice (June) for latest sunset
        const periods = [
            { start: 11, days: 31 }, // December
            { start: 0, days: 31 },  // January
            { start: 5, days: 31 },  // June
            { start: 4, days: 31 },  // May
            { start: 6, days: 31 },  // July
            { start: 7, days: 31 }   // July
        ];

        for (const period of periods) {
            for (let day = 1; day <= period.days; day++) {
                const date = new Date(year, period.start, day);
                const times = SunCalc.getTimes(date, latitude, longitude);
                
                // Normalize times to compare only time of day, not date
                const sunsetTime = new Date(times.sunset);
                const normalizedTime = new Date(year, 0, 1, 
                    sunsetTime.getHours(), 
                    sunsetTime.getMinutes()
                );

                if (normalizedTime < earliest.time) {
                    earliest = { 
                        time: normalizedTime, 
                        date: new Date(date) 
                    };
                }
                if (normalizedTime > latest.time) {
                    latest = { 
                        time: normalizedTime, 
                        date: new Date(date) 
                    };
                }
            }
        }

        return { earliest, latest };
    }

    getDayLength(times) {
        return (times.sunset - times.sunrise) / (1000 * 60); // Length in minutes
    }

    formatTime(date) {
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
    }

    formatDuration(minutes) {
        const hours = Math.floor(Math.abs(minutes) / 60);
        const mins = Math.floor(Math.abs(minutes) % 60);
        return `${hours}h ${mins}m`;
    }

    formatDate(date) {
        return date.toLocaleDateString('en-US', { 
            year: 'numeric',
            month: 'long', 
            day: 'numeric' 
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DaylightDashboard();
});

