import { useState } from "react";
import {
  MapPin,
  Search,
  CloudSun,
  Sparkles,
  X,
} from "lucide-react";

function App() {
  // =========================
  // WEATHER
  // =========================

  const [weatherCity, setWeatherCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");

  const searchWeather = async () => {
    if (!weatherCity.trim()) {
      setWeatherError("Please enter a destination.");
      setWeather(null);
      return;
    }

    setWeatherLoading(true);
    setWeatherError("");
    setWeather(null);

    setTimeout(() => {
      document.getElementById("weather")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);

    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          weatherCity
        )}&count=1&language=en&format=json`
      );

      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        setWeatherError(
          "Destination not found. Please try another city."
        );
        setWeatherLoading(false);
        return;
      }

      const location = geoData.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m&timezone=auto`
      );

      const weatherData = await weatherResponse.json();

      setWeather({
        city: location.name,
        country: location.country,
        temperature: weatherData.current.temperature_2m,
        feelsLike: weatherData.current.apparent_temperature,
        humidity: weatherData.current.relative_humidity_2m,
        wind: weatherData.current.wind_speed_10m,
      });
    } catch (error) {
      console.error("Weather error:", error);

      setWeatherError(
        "Unable to get weather. Please try again."
      );

      setWeather(null);
    }

    setWeatherLoading(false);
  };

  // =========================
  // MY LOCATION
  // =========================

  const getMyLocation = () => {
    if (!navigator.geolocation) {
      setWeatherError(
        "Geolocation is not supported by your browser."
      );

      scrollToSection("weather");
      return;
    }

    setWeatherLoading(true);
    setWeatherError("");
    setWeather(null);

    scrollToSection("weather");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m&timezone=auto`
          );

          const weatherData = await weatherResponse.json();

          setWeather({
            city: "Your Location",
            country: "",
            temperature:
              weatherData.current.temperature_2m,
            feelsLike:
              weatherData.current.apparent_temperature,
            humidity:
              weatherData.current.relative_humidity_2m,
            wind:
              weatherData.current.wind_speed_10m,
          });

          setWeatherCity("My Location");
        } catch (error) {
          console.error(
            "Location weather error:",
            error
          );

          setWeatherError(
            "Unable to get weather for your location."
          );
        }

        setWeatherLoading(false);
      },

      (error) => {
        console.error("Location error:", error);

        if (error.code === 1) {
          setWeatherError(
            "Location permission was denied. Please allow location access."
          );
        } else if (error.code === 2) {
          setWeatherError(
            "Your location could not be detected."
          );
        } else {
          setWeatherError(
            "Unable to detect your location."
          );
        }

        setWeatherLoading(false);
      }
    );
  };

  // =========================
  // DESTINATIONS
  // =========================

  const destinations = [
    {
      name: "Goa",
      country: "India",
      emoji: "🌴",
      description: "Beaches, sunsets and coastal adventures",
    },
    {
      name: "Manali",
      country: "India",
      emoji: "🏔️",
      description: "Mountains, snow and peaceful valleys",
    },
    {
      name: "Jaipur",
      country: "India",
      emoji: "🏰",
      description: "Royal palaces and colourful culture",
    },
    {
      name: "Kerala",
      country: "India",
      emoji: "🌿",
      description: "Backwaters, nature and beautiful greenery",
    },
    {
      name: "Bengaluru",
      country: "India",
      emoji: "🌆",
      description: "Technology, gardens and city life",
    },
    {
      name: "Mumbai",
      country: "India",
      emoji: "🌃",
      description: "The city of dreams and endless energy",
    },
    {
      name: "Paris",
      country: "France",
      emoji: "🗼",
      description: "Art, culture and unforgettable streets",
    },
    {
      name: "Bali",
      country: "Indonesia",
      emoji: "🌺",
      description: "Tropical beaches and island experiences",
    },
    {
      name: "Dubai",
      country: "UAE",
      emoji: "🏙️",
      description: "Luxury, shopping and modern attractions",
    },
    {
      name: "London",
      country: "United Kingdom",
      emoji: "🎡",
      description: "History, landmarks and vibrant streets",
    },
    {
      name: "Tokyo",
      country: "Japan",
      emoji: "🗾",
      description: "Technology, food and Japanese culture",
    },
    {
      name: "Singapore",
      country: "Singapore",
      emoji: "🌇",
      description: "Modern attractions and beautiful city views",
    },
  ];

  const exploreDestination = (city) => {
    setWeatherCity(city);
    searchWeatherForCity(city);
  };

  const searchWeatherForCity = async (city) => {
    setWeatherLoading(true);
    setWeatherError("");
    setWeather(null);

    setTimeout(() => {
      document.getElementById("weather")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);

    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1&language=en&format=json`
      );

      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        setWeatherError("Weather information not found.");
        setWeatherLoading(false);
        return;
      }

      const location = geoData.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m&timezone=auto`
      );

      const weatherData = await weatherResponse.json();

      setWeather({
        city: location.name,
        country: location.country,
        temperature: weatherData.current.temperature_2m,
        feelsLike: weatherData.current.apparent_temperature,
        humidity: weatherData.current.relative_humidity_2m,
        wind: weatherData.current.wind_speed_10m,
      });
    } catch (error) {
      console.error(error);

      setWeatherError(
        "Unable to get weather. Please try again."
      );
    }

    setWeatherLoading(false);
  };

  // =========================
  // TRIP PLANNER
  // =========================

  const [showPlanner, setShowPlanner] = useState(false);

  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("Moderate");
  const [travelType, setTravelType] = useState("Adventure");

  const [tripPlan, setTripPlan] = useState(null);

  const generateTripPlan = () => {
    if (!destination.trim() || !days) {
      alert("Please enter destination and number of days.");
      return;
    }

    const numberOfDays = Number(days);

    if (numberOfDays < 1 || numberOfDays > 30) {
      alert("Please enter a number of days between 1 and 30.");
      return;
    }

    const activities = {
      Adventure: [
        "Explore famous local attractions",
        "Try an exciting outdoor activity",
        "Discover hidden places and local food",
        "Enjoy an evening adventure",
      ],

      Relaxation: [
        "Visit peaceful and beautiful places",
        "Enjoy a relaxing day",
        "Spend time at scenic locations",
        "Enjoy a peaceful evening",
      ],

      Culture: [
        "Visit famous historical places",
        "Explore museums and cultural sites",
        "Try local food and traditions",
        "Enjoy local art and culture",
      ],

      "Food & Travel": [
        "Explore famous food spots",
        "Try local specialities",
        "Visit popular markets and restaurants",
        "Enjoy a local food experience",
      ],
    };

    const selectedActivities =
      activities[travelType] || activities.Adventure;

    const plan = [];

    for (let i = 0; i < numberOfDays; i++) {
      plan.push({
        day: i + 1,
        activity:
          selectedActivities[i % selectedActivities.length],
      });
    }

    setTripPlan({
      destination: destination.trim(),
      days: numberOfDays,
      budget,
      travelType,
      plan,
    });
  };

  // =========================
  // SCROLL
  // =========================

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="app">

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo">
          Wanderly<span>.</span>
        </div>

        <div className="nav-links">

          <a
            href="#destinations"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("destinations");
            }}
          >
            Destinations
          </a>

          <a
            href="#weather"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("weather");
            }}
          >
            Weather
          </a>

          <a
            href="#assistant"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("assistant");
            }}
          >
            AI Assistant
          </a>

        </div>

        <button
          className="location-btn"
          onClick={getMyLocation}
        >
          <MapPin size={17} />
          My Location
        </button>

      </nav>

      <main>

        {/* HERO */}

        <section className="hero">

          <div className="hero-content">

            <p className="eyebrow">
              <Sparkles size={16} />
              YOUR NEXT ADVENTURE STARTS HERE
            </p>

            <h1>
              Discover places
              <br />
              worth remembering.
            </h1>

            <p className="hero-description">
              Explore beautiful destinations, check real-time
              weather, discover famous places and plan your
              perfect trip with AI.
            </p>

            <div className="search-box">

              <Search size={22} />

              <input
                type="text"
                placeholder="Search a destination..."
                value={weatherCity}
                onChange={(e) =>
                  setWeatherCity(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchWeather();
                  }
                }}
              />

              <button onClick={searchWeather}>
                Explore
              </button>

            </div>

           <div className="hero-features">
  <button
    type="button"
    onClick={() => scrollToSection("destinations")}
  >
    <MapPin size={16} />
    120+ destinations
  </button>

  <button
    type="button"
    onClick={() => scrollToSection("weather")}
  >
    <CloudSun size={16} />
    Live weather
  </button>

  <button
    type="button"
    onClick={() => setShowPlanner(true)}
  >
    <Sparkles size={16} />
    AI trip planner
  </button>
</div>
          </div>

        </section>

        {/* DESTINATIONS */}

        <section
          id="destinations"
          className="destinations-section"
        >

          <div className="section-heading">

            <p className="section-label">
              EXPLORE DESTINATIONS
            </p>

            <h2>
              Find your next destination.
            </h2>

            <p>
              From beautiful Indian escapes to amazing
              international cities, discover places worth
              exploring.
            </p>

          </div>

          <div className="destination-grid">

            {destinations.map((place) => (

              <div
                className="destination-card"
                key={place.name}
                onClick={() =>
                  exploreDestination(place.name)
                }
              >

                <div className="destination-image">
                  <span>
                    {place.emoji}
                  </span>
                </div>

                <div className="destination-info">

                  <div className="destination-title">

                    <h3>
                      {place.name}
                    </h3>

                    <span>
                      {place.country}
                    </span>

                  </div>

                  <p>
                    {place.description}
                  </p>

                  <button>
                    Check Weather →
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* WEATHER */}

        <section
          id="weather"
          className="feature-section"
        >

          <div>

            <p className="section-label">
              REAL-TIME WEATHER
            </p>

            <h2>
              Know before you go.
            </h2>

            <p>
              Check the current weather conditions for your
              chosen destination before planning your journey.
            </p>

          </div>

          <div className="weather-card">

            <CloudSun size={42} />

            <div>

              <h3>
                Live Weather
              </h3>

              <p>
                Search a destination to see current
                conditions.
              </p>

              <div className="weather-search">

                <input
                  type="text"
                  value={weatherCity}
                  onChange={(e) =>
                    setWeatherCity(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searchWeather();
                    }
                  }}
                  placeholder="Enter destination e.g. Paris"
                />

                <button onClick={searchWeather}>
                  <Search size={16} />
                  Search
                </button>

              </div>

              {weatherLoading && (
                <p>
                  Loading weather...
                </p>
              )}

              {weatherError && (
                <p className="weather-error">
                  {weatherError}
                </p>
              )}

              {weather && (
                <div className="weather-result">

                  <h3>
                    {weather.city}
                    {weather.country
                      ? `, ${weather.country}`
                      : ""}
                  </h3>

                  <h2>
                    {weather.temperature}°C
                  </h2>

                  <p>
                    Feels like: {weather.feelsLike}°C
                  </p>

                  <p>
                    💧 Humidity: {weather.humidity}%
                  </p>

                  <p>
                    💨 Wind: {weather.wind} km/h
                  </p>

                </div>
              )}

            </div>

          </div>

        </section>

        {/* AI ASSISTANT */}

        <section
          id="assistant"
          className="ai-section"
        >

          <div className="ai-icon">
            <Sparkles size={30} />
          </div>

          <p className="section-label">
            AI TRAVEL ASSISTANT
          </p>

          <h2>
            Let AI plan your perfect trip.
          </h2>

          <p>
            Ask about the best places to visit, how many
            days to stay, what to see and when to go.
          </p>

          <button
            className="ai-btn"
            onClick={() => setShowPlanner(true)}
          >
            <Sparkles size={17} />
            Plan my trip
          </button>

        </section>

      </main>

      {/* FOOTER */}

      <footer>

        <div className="logo">
          Wanderly<span>.</span>
        </div>

        <p>
          Explore more. Travel better.
        </p>

      </footer>

      {/* TRIP PLANNER */}

      {showPlanner && (

        <div className="modal-overlay">

          <div className="planner-modal">

            <button
              className="close-btn"
              onClick={() => {
                setShowPlanner(false);
                setTripPlan(null);
              }}
            >
              <X size={22} />
            </button>

            <div className="planner-header">

              <div className="planner-icon">
                <Sparkles size={28} />
              </div>

              <h2>
                Plan Your Trip
              </h2>

              <p>
                Tell us a few details and we'll create
                your trip plan.
              </p>

            </div>

            <div className="form-group">

              <label>
                Destination
              </label>

              <input
                type="text"
                placeholder="e.g. Paris"
                value={destination}
                onChange={(e) =>
                  setDestination(e.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>
                Number of days
              </label>

              <input
                type="number"
                min="1"
                max="30"
                placeholder="e.g. 5"
                value={days}
                onChange={(e) =>
                  setDays(e.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>
                Budget
              </label>

              <select
                value={budget}
                onChange={(e) =>
                  setBudget(e.target.value)
                }
              >

                <option value="Budget">
                  Budget
                </option>

                <option value="Moderate">
                  Moderate
                </option>

                <option value="Luxury">
                  Luxury
                </option>

              </select>

            </div>

            <div className="form-group">

              <label>
                Travel type
              </label>

              <select
                value={travelType}
                onChange={(e) =>
                  setTravelType(e.target.value)
                }
              >

                <option value="Adventure">
                  Adventure
                </option>

                <option value="Relaxation">
                  Relaxation
                </option>

                <option value="Culture">
                  Culture
                </option>

                <option value="Food & Travel">
                  Food & Travel
                </option>

              </select>

            </div>

            <button
              className="generate-btn"
              onClick={generateTripPlan}
            >
              <Sparkles size={18} />
              Generate Trip Plan
            </button>

            {tripPlan && (

              <div className="trip-result">

                <h3>
                  ✨ Your {tripPlan.days}-Day Trip to{" "}
                  {tripPlan.destination}
                </h3>

                <p>
                  <strong>Budget:</strong>{" "}
                  {tripPlan.budget}
                </p>

                <p>
                  <strong>Travel style:</strong>{" "}
                  {tripPlan.travelType}
                </p>

                <div className="daily-plan">

                  {tripPlan.plan.map((item) => (

                    <div
                      className="day-plan"
                      key={item.day}
                    >

                      <h4>
                        Day {item.day}
                      </h4>

                      <p>
                        {item.activity}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default App;