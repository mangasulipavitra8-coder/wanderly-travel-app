# 🌍 Wanderly - Travel App

Wanderly is a responsive travel web application built with React that helps users explore destinations, check live weather information, use their current location to view weather, and create personalized travel plans.

## 🚀 Features

- 🌍 Explore popular travel destinations
- 🔎 Search destinations and check weather
- 🌤️ Live weather information using Open-Meteo API
- 📍 Get weather based on the user's current location
- 🗺️ Destination cards with quick weather access
- ✨ Interactive trip planner
- 📅 Generate day-by-day travel plans
- 💰 Budget and travel-type selection
- 📱 Responsive design for desktop and mobile devices
- 🧭 Smooth navigation between sections
- 🔗 Interactive navbar and hero-section features

## 🛠️ Technologies Used

### Frontend
- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- Vite

### Libraries & APIs
- Lucide React
- Open-Meteo Geocoding API
- Open-Meteo Weather API
- Browser Geolocation API

## 📌 Application Sections

### 🏠 Home
A modern hero section that allows users to search for destinations and quickly access major application features.

### 🌍 Destinations
Displays popular destinations that users can select to automatically view their current weather information.

### 🌤️ Live Weather
Provides real-time weather information including:

- Temperature
- Feels-like temperature
- Humidity
- Wind speed
- Country/location information

### 📍 My Location
Uses the browser's geolocation permission to retrieve the user's current coordinates and display weather information for their location.

### ✨ Trip Planner
An interactive trip planning feature where users can select:

- Destination
- Number of days
- Budget
- Travel type

The application then generates a day-by-day travel plan.

## 🔄 How It Works

1. Search for a destination.
2. Wanderly retrieves the destination coordinates using the Open-Meteo Geocoding API.
3. Weather information is retrieved using the Open-Meteo Weather API.
4. Users can also use **My Location** to get weather based on their current location.
5. Users can select destinations directly from the destination cards.
6. The Trip Planner generates a customized day-by-day travel plan based on the selected preferences.

## 📂 Project Structure

```text
wanderly-travel-app/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── README.md
└── .gitignore

## 🌐 APIs Used

### Open-Meteo

Wanderly uses Open-Meteo for:

- Destination geocoding
- Current weather information
- Temperature
- Humidity
- Wind speed
- Feels-like temperature

No API key is required for the current implementation.

🎯 Future Enhancements
🏨 Hotel recommendations
✈️ Flight search integration
🗺️ Interactive maps
⭐ Destination reviews and ratings
❤️ Save favorite destinations
🤖 Integration with a real AI travel assistant
🌐 Multi-language support
🔐 User authentication

👩‍💻 Author
Pavitra Mangasule

GitHub: https://github.com/mangasulipavitra8-coder
LinkedIn: https://www.linkedin.com/in/pavitra-mangasule/


📄 License
This project is created for learning and portfolio purposes.