import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Globe2,
  Heart,
  Mail,
  MapPin,
  Menu,
  Mountain,
  Plane,
  Search,
  Sparkles,
  Star,
  Users,
  WalletCards,
  X,
  Utensils,
  Camera,
  Hotel,
  Navigation,
  CloudSun,
  Droplets,
  Thermometer,
  Wind,
  RefreshCw,
  Bookmark,
  Trash2,
  History,
} from "lucide-react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85";

const destinations = [
  {
    id: 1,
    name: "Goa",
    location: "Goa, India",
    category: "Beach",
    rating: 4.8,
    reviews: 1240,
    duration: "3–5 Days",
    price: "₹12,000",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
    description:
      "Relax on beautiful beaches, enjoy water activities, explore Portuguese heritage and experience Goa's famous nightlife.",
    highlights: [
      "Baga & Calangute Beach",
      "Fort Aguada",
      "Old Goa",
      "Sunset cruise",
    ],
    activities: [
      "Beach hopping",
      "Water sports",
      "Fort Aguada visit",
      "Old Goa sightseeing",
      "Sunset cruise",
      "Local seafood dinner",
      "Night market",
    ],
  },
  {
    id: 2,
    name: "Manali",
    location: "Himachal Pradesh, India",
    category: "Mountains",
    rating: 4.7,
    reviews: 980,
    duration: "4–6 Days",
    price: "₹14,000",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=85",
    description:
      "A mountain escape filled with snow-capped peaks, scenic valleys, adventure activities and peaceful cafés.",
    highlights: [
      "Solang Valley",
      "Old Manali",
      "Rohtang region",
      "Hadimba Temple",
    ],
    activities: [
      "Explore Mall Road",
      "Visit Hadimba Temple",
      "Solang Valley adventure",
      "Café hopping in Old Manali",
      "River-side walk",
      "Mountain photography",
      "Local Himachali dinner",
    ],
  },
  {
    id: 3,
    name: "Ladakh",
    location: "Ladakh, India",
    category: "Adventure",
    rating: 4.9,
    reviews: 860,
    duration: "5–8 Days",
    price: "₹22,000",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ladakh%20Mountain.jpg",
    description:
      "Discover dramatic Himalayan landscapes, high-altitude lakes, monasteries and unforgettable mountain roads.",
    highlights: [
      "Pangong Lake",
      "Nubra Valley",
      "Leh Palace",
      "Khardung La",
    ],
    activities: [
      "Explore Leh Market",
      "Visit Leh Palace",
      "Drive towards Nubra Valley",
      "Camel ride at Hunder",
      "Pangong Lake sightseeing",
      "Visit a Himalayan monastery",
      "Scenic mountain photography",
    ],
  },
  {
    id: 4,
    name: "Udaipur",
    location: "Rajasthan, India",
    category: "Romantic",
    rating: 4.8,
    reviews: 1120,
    duration: "3–4 Days",
    price: "₹11,000",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lake%20Palace,Udaipur.jpg",
    description:
      "Known as the City of Lakes, Udaipur offers royal palaces, beautiful lakes, heritage streets and romantic sunsets.",
    highlights: [
      "Lake Pichola",
      "City Palace",
      "Lake Palace",
      "Bagore Ki Haveli",
    ],
    activities: [
      "Visit City Palace",
      "Boat ride on Lake Pichola",
      "Explore Jagdish Temple",
      "Watch sunset at Ambrai Ghat",
      "Visit Bagore Ki Haveli",
      "Explore local markets",
      "Rajasthani dinner",
    ],
  },
  {
    id: 5,
    name: "Jaipur",
    location: "Rajasthan, India",
    category: "Heritage",
    rating: 4.7,
    reviews: 1350,
    duration: "3–4 Days",
    price: "₹10,000",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=85",
    description:
      "Experience royal Rajasthan through magnificent forts, colourful markets, historic palaces and traditional cuisine.",
    highlights: [
      "Amber Fort",
      "Hawa Mahal",
      "City Palace",
      "Jantar Mantar",
    ],
    activities: [
      "Visit Amber Fort",
      "Photograph Hawa Mahal",
      "Explore City Palace",
      "Visit Jantar Mantar",
      "Shop at Johari Bazaar",
      "Try authentic Rajasthani food",
      "Evening cultural experience",
    ],
  },
  {
    id: 6,
    name: "Kerala",
    location: "Kerala, India",
    category: "Nature",
    rating: 4.9,
    reviews: 1180,
    duration: "4–6 Days",
    price: "₹16,000",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85",
    description:
      "Enjoy peaceful backwaters, lush greenery, beaches, hill stations and Kerala's unique food and culture.",
    highlights: [
      "Alleppey Backwaters",
      "Munnar",
      "Kovalam",
      "Tea plantations",
    ],
    activities: [
      "Houseboat experience",
      "Explore Alleppey",
      "Visit Munnar tea gardens",
      "Waterfall sightseeing",
      "Traditional Kerala lunch",
      "Relax at Kovalam Beach",
      "Ayurvedic wellness experience",
    ],
  },
  {
    id: 7,
    name: "Bengaluru",
    location: "Karnataka, India",
    category: "City",
    rating: 4.6,
    reviews: 920,
    duration: "2–3 Days",
    price: "₹7,000",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=85",
    description:
      "Explore India's tech capital through gardens, cafés, food streets, nightlife and modern city experiences.",
    highlights: [
      "Lalbagh",
      "Cubbon Park",
      "Bangalore Palace",
      "Church Street",
    ],
    activities: [
      "Walk through Cubbon Park",
      "Visit Bangalore Palace",
      "Explore Lalbagh",
      "Café hopping",
      "Church Street evening",
      "Try local South Indian food",
      "Explore art and shopping districts",
    ],
  },
  {
    id: 8,
    name: "Mumbai",
    location: "Maharashtra, India",
    category: "City",
    rating: 4.7,
    reviews: 1050,
    duration: "2–4 Days",
    price: "₹9,000",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=85",
    description:
      "Experience the energy of Mumbai through iconic landmarks, beaches, street food and vibrant neighbourhoods.",
    highlights: [
      "Gateway of India",
      "Marine Drive",
      "Colaba",
      "Elephanta Caves",
    ],
    activities: [
      "Visit Gateway of India",
      "Explore Colaba Causeway",
      "Sunset at Marine Drive",
      "Taste Mumbai street food",
      "Visit Elephanta Caves",
      "Explore Bandra",
      "Evening city walk",
    ],
  },
  {
    id: 9,
    name: "Mysuru",
    location: "Karnataka, India",
    category: "Heritage",
    rating: 4.7,
    reviews: 760,
    duration: "2–3 Days",
    price: "₹6,500",
    image:
      "https://images.unsplash.com/photo-1600100397608-f0109a7a2c64?auto=format&fit=crop&w=1200&q=85",
    description:
      "Discover royal architecture, gardens, temples and the cultural charm of Mysuru.",
    highlights: [
      "Mysore Palace",
      "Chamundi Hills",
      "Brindavan Gardens",
      "Devaraja Market",
    ],
    activities: [
      "Visit Mysore Palace",
      "Explore Chamundi Hills",
      "Walk through Devaraja Market",
      "Visit St. Philomena's Church",
      "Evening at Brindavan Gardens",
      "Try Mysore Pak",
      "Explore local handicrafts",
    ],
  },
  {
    id: 10,
    name: "Rishikesh",
    location: "Uttarakhand, India",
    category: "Adventure",
    rating: 4.8,
    reviews: 840,
    duration: "3–5 Days",
    price: "₹10,000",
    image:
      "https://images.unsplash.com/photo-1590050752117-23a9d3f7b4e0?auto=format&fit=crop&w=1200&q=85",
    description:
      "Combine spirituality and adventure with river rafting, yoga, waterfalls and peaceful Himalayan views.",
    highlights: [
      "River Rafting",
      "Laxman Jhula",
      "Ganga Aarti",
      "Neer Garh Waterfall",
    ],
    activities: [
      "Attend Ganga Aarti",
      "River rafting",
      "Visit Laxman Jhula",
      "Yoga session",
      "Explore cafés near the Ganges",
      "Visit Neer Garh Waterfall",
      "Sunrise meditation",
    ],
  },
];

const categories = [
  "All",
  "Beach",
  "Mountains",
  "Heritage",
  "Romantic",
  "Adventure",
  "Nature",
  "City",
];

const plannerOptions = [
  "Goa",
  "Manali",
  "Ladakh",
  "Udaipur",
  "Jaipur",
  "Kerala",
  "Bengaluru",
  "Mumbai",
  "Mysuru",
  "Rishikesh",
];

const durationOptions = [
  "2 Days",
  "3 Days",
  "4 Days",
  "5 Days",
  "6 Days",
  "7 Days",
  "8 Days",
  "10 Days",
];

const travelerOptions = [
  "1 Traveler",
  "2 Travelers",
  "3 Travelers",
  "4 Travelers",
  "5 Travelers",
  "6+ Travelers",
];

const budgetOptions = [
  "Under ₹5,000",
  "₹5,000 - ₹10,000",
  "₹10,000 - ₹15,000",
  "₹15,000 - ₹25,000",
  "₹25,000+",
];

const destinationPlans = {
  Goa: [
    ["Beach morning", "Fort Aguada", "Sunset at Baga Beach"],
    ["Old Goa", "Portuguese heritage walk", "Local seafood dinner"],
    ["Water sports", "Beach relaxation", "Night market"],
    ["Dudhsagar / nature day", "Local sightseeing", "Sunset cruise"],
    ["North Goa exploration", "Café hopping", "Beachside dinner"],
    ["South Goa beaches", "Churches & heritage", "Relaxed evening"],
    ["Free exploration", "Shopping", "Farewell beach sunset"],
    ["Flexible day", "Optional adventure", "Farewell dinner"],
  ],

  Manali: [
    ["Mall Road", "Hadimba Temple", "Old Manali café evening"],
    ["Solang Valley", "Adventure activities", "Mountain sunset"],
    ["Local village exploration", "River-side lunch", "Old Manali walk"],
    ["Scenic mountain drive", "Nature viewpoint", "Himachali dinner"],
    ["Rohtang region", "Snow activities", "Relax at hotel"],
    ["Free morning", "Shopping", "Farewell dinner"],
    ["Nature walk", "Photography", "Sunset café"],
    ["Flexible exploration", "Local food", "Farewell evening"],
  ],

  Ladakh: [
    ["Leh Market", "Leh Palace", "Shanti Stupa sunset"],
    ["Monastery visit", "Local lunch", "Explore Leh"],
    ["Nubra Valley drive", "Hunder sand dunes", "Camp-style dinner"],
    ["Diskit Monastery", "Village exploration", "Mountain sunset"],
    ["Pangong Lake drive", "Pangong sightseeing", "Lakeside evening"],
    ["Return toward Leh", "Scenic photography", "Relaxation"],
    ["Local market", "Souvenir shopping", "Farewell dinner"],
    ["Flexible exploration", "Photography", "Final Himalayan sunset"],
  ],

  Udaipur: [
    ["City Palace", "Jagdish Temple", "Lake Pichola sunset"],
    ["Lake Palace viewpoint", "Local lunch", "Ambrai Ghat sunset"],
    ["Bagore Ki Haveli", "Old city walk", "Cultural evening"],
    ["Saheliyon Ki Bari", "Local shopping", "Rajasthani dinner"],
    ["Monsoon Palace", "Scenic viewpoints", "Lakeside evening"],
    ["Local markets", "Handicraft shopping", "Boat ride"],
    ["Free morning", "Café by the lake", "Farewell sunset"],
    ["Flexible exploration", "Photography", "Farewell dinner"],
  ],

  Jaipur: [
    ["Amber Fort", "Panna Meena Stepwell", "Jaipur sunset"],
    ["City Palace", "Jantar Mantar", "Hawa Mahal evening"],
    ["Local market", "Rajasthani lunch", "Cultural show"],
    ["Nahargarh Fort", "Scenic viewpoints", "Farewell dinner"],
    ["Local exploration", "Shopping", "Flexible evening"],
    ["Heritage walk", "Café break", "Sunset photography"],
    ["Free morning", "Shopping", "Farewell dinner"],
    ["Flexible day", "Local food", "Final city walk"],
  ],

  Kerala: [
    ["Arrive in Kochi", "Fort Kochi", "Chinese fishing nets"],
    ["Drive to Munnar", "Tea plantation", "Mountain sunset"],
    ["Munnar sightseeing", "Tea museum", "Local dinner"],
    ["Drive to Alleppey", "Houseboat check-in", "Backwater sunset"],
    ["Houseboat morning", "Kerala lunch", "Relaxation"],
    ["Kovalam / beach", "Local sightseeing", "Beach sunset"],
    ["Shopping", "Traditional food", "Farewell evening"],
    ["Flexible exploration", "Photography", "Farewell dinner"],
  ],

  Bengaluru: [
    ["Cubbon Park", "Bangalore Palace", "Church Street evening"],
    ["Lalbagh", "Local South Indian lunch", "Café hopping"],
    ["Art & shopping", "Indiranagar exploration", "Nightlife / dinner"],
    ["Nandi Hills day trip", "Scenic viewpoints", "Return to Bengaluru"],
    ["Local markets", "Food exploration", "Relaxed evening"],
    ["Flexible city exploration", "Shopping", "Farewell dinner"],
    ["Free morning", "Café", "Final city walk"],
    ["Flexible day", "Local food", "Farewell evening"],
  ],

  Mumbai: [
    ["Gateway of India", "Colaba", "Marine Drive sunset"],
    ["Elephanta Caves", "Local lunch", "South Mumbai walk"],
    ["Bandra", "Street food", "Bandra sunset"],
    ["Juhu Beach", "Shopping", "Farewell dinner"],
    ["Local neighbourhoods", "Café hopping", "Night city walk"],
    ["Free exploration", "Shopping", "Marine Drive evening"],
    ["Flexible day", "Street food", "Farewell dinner"],
    ["Optional day trip", "Photography", "Final city evening"],
  ],

  Mysuru: [
    ["Mysore Palace", "Devaraja Market", "Local dinner"],
    ["Chamundi Hills", "Traditional lunch", "Brindavan Gardens"],
    ["St. Philomena's Church", "Shopping", "Cultural evening"],
    ["Local exploration", "Mysore Pak tasting", "Farewell evening"],
    ["Flexible day", "Handicraft shopping", "Final palace visit"],
    ["Free morning", "Café", "Farewell dinner"],
    ["Local sightseeing", "Shopping", "Final evening"],
    ["Flexible exploration", "Food tour", "Farewell dinner"],
  ],

  Rishikesh: [
    ["Laxman Jhula", "Café by the Ganges", "Ganga Aarti"],
    ["River rafting", "Relax by the river", "Sunset meditation"],
    ["Neer Garh Waterfall", "Local lunch", "Yoga session"],
    ["Adventure activities", "Explore local markets", "Ganga-side dinner"],
    ["Yoga morning", "Café hopping", "Farewell Ganga Aarti"],
    ["Flexible exploration", "Shopping", "Sunset walk"],
    ["Free morning", "Wellness activity", "Farewell dinner"],
    ["Flexible day", "Photography", "Final evening"],
  ],
};

function getDestinationByName(name) {
  return destinations.find(
    (destination) => destination.name.toLowerCase() === name.toLowerCase()
  );
}

function getDays(value) {
  const match = String(value).match(/\d+/);
  return match ? Number(match[0]) : 3;
}

function getTravelers(value) {
  const match = String(value).match(/\d+/);
  return match ? Number(match[0]) : 2;
}

function getBudgetNumber(value) {
  if (value.includes("Under")) return 5000;
  if (value.includes("5,000")) return 7500;
  if (value.includes("10,000")) return 12500;
  if (value.includes("15,000")) return 20000;
  if (value.includes("25,000+")) return 30000;
  return 10000;
}

function formatCurrency(number) {
  return `₹${Math.round(number).toLocaleString("en-IN")}`;
}

function getGenericPlan(destinationName) {
  return [
    [
      "Explore the main attractions",
      "Local sightseeing",
      "Sunset and local dinner",
    ],
    [
      "Popular landmark visit",
      "Local food experience",
      "Evening city exploration",
    ],
    [
      "Nature or cultural experience",
      "Shopping and cafés",
      "Relaxed evening",
    ],
    [
      "Adventure / optional activity",
      "Scenic sightseeing",
      "Local dinner",
    ],
    [
      "Hidden gems",
      "Photography and exploration",
      "Sunset experience",
    ],
    [
      "Local market",
      "Souvenir shopping",
      "Farewell dinner",
    ],
    [
      "Free morning",
      "Flexible exploration",
      "Final sunset",
    ],
    [
      "Optional day trip",
      "Local experience",
      "Farewell evening",
    ],
  ].map((item, index) => ({
    day: index + 1,
    title:
      index === 0
        ? `Welcome to ${destinationName}`
        : index === 7
        ? "Flexible Exploration Day"
        : `Explore ${destinationName}`,
    morning: item[0],
    afternoon: item[1],
    evening: item[2],
  }));
}

function buildItinerary(destinationName, days) {
  const customPlan = destinationPlans[destinationName];

  if (!customPlan) {
    return getGenericPlan(destinationName).slice(0, days);
  }

  return Array.from({ length: days }, (_, index) => {
    const activities = customPlan[index % customPlan.length];

    return {
      day: index + 1,
      title:
        index === 0
          ? `Welcome to ${destinationName}`
          : index === days - 1
          ? "Relaxed Final Day"
          : `Explore ${destinationName}`,
      morning: activities[0],
      afternoon: activities[1],
      evening: activities[2],
    };
  });
}


const weatherLocations = {
  Goa: { latitude: 15.4909, longitude: 73.8278 },
  Manali: { latitude: 32.2432, longitude: 77.1892 },
  Ladakh: { latitude: 34.1526, longitude: 77.5771 },
  Udaipur: { latitude: 24.5854, longitude: 73.7125 },
  Jaipur: { latitude: 26.9124, longitude: 75.7873 },
  Kerala: { latitude: 9.9312, longitude: 76.2673 },
  Bengaluru: { latitude: 12.9716, longitude: 77.5946 },
  Mumbai: { latitude: 19.076, longitude: 72.8777 },
  Mysuru: { latitude: 12.2958, longitude: 76.6394 },
  Rishikesh: { latitude: 30.0869, longitude: 78.2676 },
};

function getWeatherInfo(code) {
  const weatherMap = {
    0: { label: "Clear sky", icon: "☀️" },
    1: { label: "Mainly clear", icon: "🌤️" },
    2: { label: "Partly cloudy", icon: "⛅" },
    3: { label: "Overcast", icon: "☁️" },
    45: { label: "Foggy", icon: "🌫️" },
    48: { label: "Foggy", icon: "🌫️" },
    51: { label: "Light drizzle", icon: "🌦️" },
    53: { label: "Drizzle", icon: "🌦️" },
    55: { label: "Heavy drizzle", icon: "🌦️" },
    56: { label: "Freezing drizzle", icon: "🌧️" },
    57: { label: "Freezing drizzle", icon: "🌧️" },
    61: { label: "Light rain", icon: "🌧️" },
    63: { label: "Rain", icon: "🌧️" },
    65: { label: "Heavy rain", icon: "🌧️" },
    66: { label: "Freezing rain", icon: "🌧️" },
    67: { label: "Freezing rain", icon: "🌧️" },
    71: { label: "Light snow", icon: "🌨️" },
    73: { label: "Snow", icon: "❄️" },
    75: { label: "Heavy snow", icon: "❄️" },
    77: { label: "Snow grains", icon: "❄️" },
    80: { label: "Rain showers", icon: "🌦️" },
    81: { label: "Rain showers", icon: "🌦️" },
    82: { label: "Heavy showers", icon: "⛈️" },
    85: { label: "Snow showers", icon: "🌨️" },
    86: { label: "Heavy snow showers", icon: "🌨️" },
    95: { label: "Thunderstorm", icon: "⛈️" },
    96: { label: "Thunderstorm with hail", icon: "⛈️" },
    99: { label: "Thunderstorm with hail", icon: "⛈️" },
  };

  return weatherMap[code] || { label: "Weather unavailable", icon: "🌤️" };
}

function formatForecastDate(dateString) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

async function fetchDestinationWeather(destinationName, signal) {
  const location = weatherLocations[destinationName];

  if (!location) {
    throw new Error("Weather location is not configured for this destination.");
  }

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}` +
    `&longitude=${location.longitude}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
    `&forecast_days=5&timezone=auto`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Unable to fetch weather right now.");
  }

  const data = await response.json();

  if (!data.current || !data.daily) {
    throw new Error("Weather data is incomplete.");
  }

  const currentInfo = getWeatherInfo(data.current.weather_code);

  const forecast = data.daily.time.map((date, index) => ({
    date,
    label: formatForecastDate(date),
    icon: getWeatherInfo(data.daily.weather_code[index]).icon,
    condition: getWeatherInfo(data.daily.weather_code[index]).label,
    max: Math.round(data.daily.temperature_2m_max[index]),
    min: Math.round(data.daily.temperature_2m_min[index]),
  }));

  return {
    current: {
      temperature: Math.round(data.current.temperature_2m),
      feelsLike: Math.round(data.current.apparent_temperature),
      humidity: Math.round(data.current.relative_humidity_2m),
      wind: Math.round(data.current.wind_speed_10m),
      icon: currentInfo.icon,
      condition: currentInfo.label,
    },
    forecast,
    timezone: data.timezone,
  };
}

function getBudgetBreakdown(totalBudget, travelers, days) {
  const total = totalBudget;

  return [
    {
      label: "Stay",
      value: Math.round(total * 0.35),
      icon: Hotel,
    },
    {
      label: "Food",
      value: Math.round(total * 0.2),
      icon: Utensils,
    },
    {
      label: "Transport",
      value: Math.round(total * 0.2),
      icon: Navigation,
    },
    {
      label: "Activities",
      value: Math.round(total * 0.15),
      icon: Camera,
    },
    {
      label: "Buffer",
      value: Math.round(total * 0.1),
      icon: WalletCards,
    },
  ];
}

const API_BASE_URL = "http://localhost:8080/api";

function getClientId() {
  const storageKey = "wonderly_client_id";

  try {
    const existing = localStorage.getItem(storageKey);
    if (existing) return existing;

    const generated =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `wonderly-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    localStorage.setItem(storageKey, generated);
    return generated;
  } catch {
    return `wonderly-${Date.now()}`;
  }
}

function parseSavedItinerary(value) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [planner, setPlanner] = useState({
    destination: "Bengaluru",
    duration: "7 Days",
    travelers: "2 Travelers",
    budget: "₹10,000 - ₹15,000",
  });

  const [tripPlan, setTripPlan] = useState(null);

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");
  const [weatherRefreshKey, setWeatherRefreshKey] = useState(0);

  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const [clientId] = useState(() => getClientId());
  const [savedTrips, setSavedTrips] = useState([]);
  const [savedTripsLoading, setSavedTripsLoading] = useState(false);
  const [savedTripsError, setSavedTripsError] = useState("");
  const [showMyTrips, setShowMyTrips] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const filteredDestinations = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return destinations.filter((destination) => {
      const matchesCategory =
        activeCategory === "All" || destination.category === activeCategory;

      const matchesSearch =
        !query ||
        destination.name.toLowerCase().includes(query) ||
        destination.location.toLowerCase().includes(query) ||
        destination.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    );
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMobileMenuOpen(false);
  };

  const handlePlannerChange = (field, value) => {
    setPlanner((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleGenerateTrip = (event) => {
    event.preventDefault();

    const destinationName = planner.destination.trim();

    if (!destinationName) {
      return;
    }

    const matchedDestination =
      getDestinationByName(destinationName) || null;

    const days = getDays(planner.duration);
    const travelers = getTravelers(planner.travelers);
    const totalBudget = getBudgetNumber(planner.budget);

    const itinerary = buildItinerary(destinationName, days);

    const estimatedPerPerson = totalBudget / travelers;

    setTripPlan({
      destination: destinationName,
      days,
      travelers,
      budget: planner.budget,
      totalBudget,
      estimatedPerPerson,
      matchedDestination,
      itinerary,
      breakdown: getBudgetBreakdown(totalBudget, travelers, days),
    });
    setSaveMessage("");
  };

  const loadMyTrips = async () => {
    setSavedTripsLoading(true);
    setSavedTripsError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/trips?clientId=${encodeURIComponent(clientId)}`
      );

      if (!response.ok) {
        throw new Error("Unable to load saved trips.");
      }

      const data = await response.json();
      setSavedTrips(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("My Trips error:", error);
      setSavedTripsError(
        "Unable to load your saved trips. Make sure the Spring Boot backend is running."
      );
    } finally {
      setSavedTripsLoading(false);
    }
  };

  const openMyTrips = async () => {
    setShowMyTrips(true);
    await loadMyTrips();
  };

  const saveTripToBackend = async () => {
    if (!tripPlan) return;

    setSaveMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/trips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId,
          destination: tripPlan.destination,
          days: tripPlan.days,
          travelers: tripPlan.travelers,
          budget: tripPlan.budget,
          totalBudget: tripPlan.totalBudget,
          itineraryJson: JSON.stringify(tripPlan.itinerary),
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Unable to save trip.");
      }

      const savedTrip = await response.json();
      setSavedTrips((current) => [savedTrip, ...current]);
      setSaveMessage("Trip saved successfully ✓");
    } catch (error) {
      console.error("Save trip error:", error);
      setSaveMessage("Unable to save the trip. Please check the backend.");
    }
  };

  const deleteSavedTrip = async (tripId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/trips/${tripId}?clientId=${encodeURIComponent(clientId)}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Unable to delete trip.");
      }

      setSavedTrips((current) =>
        current.filter((trip) => trip.id !== tripId)
      );
    } catch (error) {
      console.error("Delete trip error:", error);
      setSavedTripsError("Unable to delete this trip right now.");
    }
  };

  const openSavedTrip = (savedTrip) => {
    const itinerary = parseSavedItinerary(savedTrip.itineraryJson);
    const totalBudget = Number(savedTrip.totalBudget || 0);
    const travelers = Number(savedTrip.travelers || 1);
    const days = Number(savedTrip.days || itinerary.length || 1);

    setTripPlan({
      destination: savedTrip.destination,
      days,
      travelers,
      budget: savedTrip.budget || "Custom",
      totalBudget,
      estimatedPerPerson: travelers ? totalBudget / travelers : totalBudget,
      matchedDestination: getDestinationByName(savedTrip.destination) || null,
      itinerary,
      breakdown: getBudgetBreakdown(totalBudget, travelers, days),
    });

    setSaveMessage("");
    setShowMyTrips(false);
  };

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) return;

    setNewsletterMessage(
      "You're subscribed! Travel inspiration is on the way ✈️"
    );
    setEmail("");
  };


  useEffect(() => {
    if (!tripPlan?.destination) {
      setWeather(null);
      setWeatherError("");
      setWeatherLoading(false);
      return undefined;
    }

    const controller = new AbortController();

    const loadWeather = async () => {
      setWeatherLoading(true);
      setWeatherError("");
      setWeather(null);

      try {
        const data = await fetchDestinationWeather(
          tripPlan.destination,
          controller.signal
        );
        setWeather(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setWeatherError(
            "Live weather could not be loaded right now. Please try again."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setWeatherLoading(false);
        }
      }
    };

    loadWeather();

    return () => controller.abort();
  }, [tripPlan?.destination, weatherRefreshKey]);

  useEffect(() => {
    document.body.style.overflow =
      selectedDestination || tripPlan || showMyTrips ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedDestination, tripPlan, showMyTrips]);

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar-inner">
          <button
            className="brand"
            onClick={() => scrollToSection("home")}
            type="button"
          >
            <span className="brand-mark">
              <Plane size={18} />
            </span>

            <span>Wonderly</span>
          </button>

          <nav className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
            <button onClick={() => scrollToSection("home")} type="button">
              Home
            </button>

            <button
              onClick={() => scrollToSection("destinations")}
              type="button"
            >
              Destinations
            </button>

            <button
              onClick={() => scrollToSection("planner")}
              type="button"
            >
              Trip Planner
            </button>

            <button
              onClick={() => scrollToSection("why-wonderly")}
              type="button"
            >
              Why Wonderly
            </button>

            <button onClick={() => scrollToSection("contact")} type="button">
              Contact
            </button>

            <button
              className="mobile-nav-cta"
              onClick={() => scrollToSection("planner")}
              type="button"
            >
              Plan a Trip
            </button>
          </nav>

          <div className="navbar-actions">
            <button
              className="my-trips-nav"
              onClick={openMyTrips}
              type="button"
              title="My Trips"
            >
              <History size={18} />
              <span>My Trips</span>
            </button>

            <button
              className="favorite-nav"
              onClick={() => scrollToSection("destinations")}
              type="button"
              title="Favorites"
            >
              <Heart size={18} />
              <span>{favorites.length}</span>
            </button>

            <button
              className="nav-cta"
              onClick={() => scrollToSection("planner")}
              type="button"
            >
              Plan a Trip
              <ArrowRight size={17} />
            </button>

            <button
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen((current) => !current)}
              type="button"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section className="hero" id="home">
          <div className="hero-background" />

          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} />
              Smart travel planning made simple
            </div>

            <h1>
              Travel more.
              <br />
              <span>Plan less.</span>
            </h1>

            <p>
              Discover beautiful destinations, build personalized trips and
              turn your travel ideas into unforgettable experiences.
            </p>

            <div className="hero-search">
              <Search size={20} />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);

                  setTimeout(() => {
                    document
                      .getElementById("destinations")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }, 0);
                }}
                placeholder="Search destinations..."
              />

              <button
                type="button"
                onClick={() => scrollToSection("destinations")}
              >
                Explore
              </button>
            </div>

            <div className="hero-trust">
              <div>
                <Check size={16} />
                Personalized plans
              </div>

              <div>
                <Check size={16} />
                Budget-friendly ideas
              </div>

              <div>
                <Check size={16} />
                Curated destinations
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats-section">
          <div className="stats-container">
            <div className="stat">
              <strong>50+</strong>
              <span>Destinations</span>
            </div>

            <div className="stat">
              <strong>10K+</strong>
              <span>Travelers Inspired</span>
            </div>

            <div className="stat">
              <strong>4.8/5</strong>
              <span>Average Rating</span>
            </div>

            <div className="stat">
              <strong>24/7</strong>
              <span>Travel Inspiration</span>
            </div>
          </div>
        </section>

        {/* DESTINATIONS */}
        <section className="section" id="destinations">
          <div className="section-heading">
            <div>
              <span className="eyebrow">EXPLORE INDIA</span>

              <h2>
                Places you'll
                <br />
                want to remember.
              </h2>
            </div>

            <div className="search-box">
              <Search size={18} />

              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="category-list">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  activeCategory === category ? "category-button active" : "category-button"
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredDestinations.length > 0 ? (
            <div className="destination-grid">
              {filteredDestinations.map((destination) => (
                <article className="destination-card" key={destination.id}>
                  <div className="destination-image-wrapper">
                    <img
                      className="destination-image"
                      src={destination.image}
                      alt={destination.name}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = FALLBACK_IMAGE;
                      }}
                    />

                    <button
                      className="favorite-button"
                      type="button"
                      onClick={() => toggleFavorite(destination.id)}
                      aria-label={`Favorite ${destination.name}`}
                    >
                      <Heart
                        size={19}
                        fill={
                          favorites.includes(destination.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    <div className="rating-badge">
                      <Star size={14} fill="currentColor" />
                      {destination.rating}
                    </div>
                  </div>

                  <div className="destination-content">
                    <div className="destination-meta">
                      <span>
                        <MapPin size={14} />
                        {destination.location}
                      </span>

                      <span>
                        <Clock3 size={14} />
                        {destination.duration}
                      </span>
                    </div>

                    <h3>{destination.name}</h3>

                    <p>{destination.description}</p>

                    <div className="destination-bottom">
                      <div>
                        <small>Starting from</small>
                        <strong>{destination.price}</strong>
                      </div>

                      <button
                        className="explore-button"
                        type="button"
                        onClick={() =>
                          setSelectedDestination(destination)
                        }
                      >
                        Explore
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: "#fff",
                borderRadius: "24px",
              }}
            >
              <Search size={38} />
              <h3>No destinations found</h3>
              <p>
                Try another destination or choose a different category.
              </p>

              <button
                className="generate-button"
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                }}
              >
                Show All Destinations
              </button>
            </div>
          )}
        </section>

        {/* PLANNER */}
        <section className="planner-section" id="planner">
          <div className="planner-container">
            <div className="planner-text">
              <span className="eyebrow">SMART TRIP PLANNER</span>

              <h2>
                Tell us what you want.
                <br />
                <span>We'll help plan it.</span>
              </h2>

              <p>
                Choose your destination, duration, budget and number of
                travelers. Wonderly will create a simple day-by-day itinerary
                to help you start planning.
              </p>

              <ul>
                <li>
                  <Check size={17} />
                  Personalized day-by-day itinerary
                </li>

                <li>
                  <Check size={17} />
                  Budget breakdown
                </li>

                <li>
                  <Check size={17} />
                  Morning, afternoon & evening ideas
                </li>

                <li>
                  <Check size={17} />
                  Flexible plans for different trip lengths
                </li>
              </ul>
            </div>

            <div className="planner-card">
              <div className="planner-card-header">
                <div className="planner-icon">
                  <Sparkles size={22} />
                </div>

                <div>
                  <h3>Build your trip</h3>
                  <p>Tell us a little about your plans.</p>
                </div>
              </div>

              <form onSubmit={handleGenerateTrip}>
                <label>
                  <span>Destination</span>

                  <div className="form-input">
                    <MapPin size={18} />

                    <select
                      value={planner.destination}
                      onChange={(event) =>
                        handlePlannerChange(
                          "destination",
                          event.target.value
                        )
                      }
                    >
                      {plannerOptions.map((destination) => (
                        <option key={destination} value={destination}>
                          {destination}
                        </option>
                      ))}
                    </select>

                    <ChevronDown size={17} />
                  </div>
                </label>

                <div className="form-row">
                  <label>
                    <span>Duration</span>

                    <div className="form-input">
                      <CalendarDays size={18} />

                      <select
                        value={planner.duration}
                        onChange={(event) =>
                          handlePlannerChange(
                            "duration",
                            event.target.value
                          )
                        }
                      >
                        {durationOptions.map((duration) => (
                          <option key={duration} value={duration}>
                            {duration}
                          </option>
                        ))}
                      </select>

                      <ChevronDown size={17} />
                    </div>
                  </label>

                  <label>
                    <span>Travelers</span>

                    <div className="form-input">
                      <Users size={18} />

                      <select
                        value={planner.travelers}
                        onChange={(event) =>
                          handlePlannerChange(
                            "travelers",
                            event.target.value
                          )
                        }
                      >
                        {travelerOptions.map((traveler) => (
                          <option key={traveler} value={traveler}>
                            {traveler}
                          </option>
                        ))}
                      </select>

                      <ChevronDown size={17} />
                    </div>
                  </label>
                </div>

                <label>
                  <span>Approximate Budget</span>

                  <div className="form-input">
                    <WalletCards size={18} />

                    <select
                      value={planner.budget}
                      onChange={(event) =>
                        handlePlannerChange(
                          "budget",
                          event.target.value
                        )
                      }
                    >
                      {budgetOptions.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>

                    <ChevronDown size={17} />
                  </div>
                </label>

                <button className="generate-button" type="submit">
                  <Sparkles size={18} />
                  Generate My Trip
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* WHY WONDERLY */}
        <section className="why-section" id="why-wonderly">
          <div className="section-heading">
            <div>
              <span className="eyebrow">WHY WONDERLY</span>

              <h2>
                Planning should feel
                <br />
                exciting, not exhausting.
              </h2>
            </div>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">
                <Sparkles size={22} />
              </div>

              <h3>Personalized</h3>

              <p>
                Build a travel plan around your destination, time, travelers
                and budget.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <WalletCards size={22} />
              </div>

              <h3>Budget Friendly</h3>

              <p>
                Get a simple estimated budget breakdown before you start
                booking.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <Globe2 size={22} />
              </div>

              <h3>Explore More</h3>

              <p>
                Discover beaches, mountains, heritage cities, nature escapes
                and adventure destinations.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <CalendarDays size={22} />
              </div>

              <h3>Flexible</h3>

              <p>
                Change your trip duration and generate a fresh itinerary
                whenever you want.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="cta-content">
            <span className="eyebrow">YOUR NEXT ADVENTURE</span>

            <h2>
              Somewhere out there,
              <br />
              your next story is waiting.
            </h2>

            <p>
              Stop saving destinations for later. Start planning your next
              escape with Wonderly.
            </p>

            <button
              type="button"
              onClick={() => scrollToSection("planner")}
            >
              Start Planning
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonials-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">TRAVELER STORIES</span>

              <h2>
                Loved by people
                <br />
                who love to travel.
              </h2>
            </div>
          </div>

          <div className="testimonial-grid">
            <div className="testimonial">
              <div className="testimonial-rating">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star key={item} size={16} fill="currentColor" />
                ))}
              </div>

              <p>
                “Wonderly made planning our trip so much easier. I loved
                having everything organized day by day.”
              </p>

              <strong>Priya S.</strong>
              <span>Weekend Traveler</span>
            </div>

            <div className="testimonial">
              <div className="testimonial-rating">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star key={item} size={16} fill="currentColor" />
                ))}
              </div>

              <p>
                “The destination ideas were exactly what I was looking for.
                The planner is simple and really useful.”
              </p>

              <strong>Rahul K.</strong>
              <span>Adventure Traveler</span>
            </div>

            <div className="testimonial">
              <div className="testimonial-rating">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star key={item} size={16} fill="currentColor" />
                ))}
              </div>

              <p>
                “I especially liked the budget breakdown and the morning,
                afternoon and evening suggestions.”
              </p>

              <strong>Ananya R.</strong>
              <span>Solo Traveler</span>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="footer-main">
          <div className="footer-brand">
            <button
              className="brand"
              onClick={() => scrollToSection("home")}
              type="button"
            >
              <span className="brand-mark">
                <Plane size={18} />
              </span>

              <span>Wonderly</span>
            </button>

            <p>
              A smarter way to discover destinations and build memorable
              travel plans.
            </p>

            <div className="footer-contact">
              <span>
                <Mail size={16} />
                hello@wonderly.travel
              </span>

              <span>
                <Globe2 size={16} />
                Travel. Explore. Wonder.
              </span>
            </div>
          </div>

          <div className="footer-column">
            <h4>Explore</h4>

            <button
              type="button"
              onClick={() => scrollToSection("destinations")}
            >
              Destinations
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("planner")}
            >
              Trip Planner
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("why-wonderly")}
            >
              Why Wonderly
            </button>
          </div>

          <div className="footer-column">
            <h4>Popular</h4>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("Goa");
                scrollToSection("destinations");
              }}
            >
              Goa
            </button>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("Manali");
                scrollToSection("destinations");
              }}
            >
              Manali
            </button>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("Ladakh");
                scrollToSection("destinations");
              }}
            >
              Ladakh
            </button>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("Udaipur");
                scrollToSection("destinations");
              }}
            >
              Udaipur
            </button>
          </div>

          <div className="footer-newsletter">
            <h4>Get travel inspiration</h4>

            <p>
              Subscribe for destination ideas, travel tips and planning
              inspiration.
            </p>

            <form onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              <button type="submit">
                <ArrowRight size={18} />
              </button>
            </form>

            {newsletterMessage && <small>{newsletterMessage}</small>}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Wonderly. Built for curious travelers.</span>

          <span>Made with ❤️ for travel lovers.</span>
        </div>
      </footer>

      {/* DESTINATION MODAL */}
      {selectedDestination && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedDestination(null)}
        >
          <div
            className="destination-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setSelectedDestination(null)}
              aria-label="Close destination details"
            >
              <X size={21} />
            </button>

            <div className="modal-image-container">
              <img
                src={selectedDestination.image}
                alt={selectedDestination.name}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = FALLBACK_IMAGE;
                }}
              />

              <div className="modal-image-content">
                <span>{selectedDestination.category}</span>
                <h2>{selectedDestination.name}</h2>

                <p>
                  <MapPin size={15} />
                  {selectedDestination.location}
                </p>
              </div>
            </div>

            <div className="modal-content">
              <div className="modal-rating">
                <Star size={16} fill="currentColor" />
                <strong>{selectedDestination.rating}</strong>
                <span>
                  ({selectedDestination.reviews.toLocaleString()} reviews)
                </span>
              </div>

              <p>{selectedDestination.description}</p>

              <div className="highlights-grid">
                {selectedDestination.highlights.map((highlight) => (
                  <div className="highlight-item" key={highlight}>
                    <Check size={16} />
                    {highlight}
                  </div>
                ))}
              </div>

              <div className="modal-footer">
                <div>
                  <small>Estimated starting budget</small>
                  <strong>{selectedDestination.price}</strong>
                </div>

                <button
                  className="modal-plan-button"
                  type="button"
                  onClick={() => {
                    setPlanner((current) => ({
                      ...current,
                      destination: selectedDestination.name,
                    }));

                    setSelectedDestination(null);

                    setTimeout(() => {
                      scrollToSection("planner");
                    }, 100);
                  }}
                >
                  Plan This Trip
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REAL TRIP ITINERARY MODAL */}
      {tripPlan && (
        <div
          className="modal-backdrop itinerary-backdrop"
          onClick={() => setTripPlan(null)}
        >
          <div
            className="destination-modal itinerary-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setTripPlan(null)}
              aria-label="Close trip plan"
            >
              <X size={21} />
            </button>

            <div className="modal-image-container">
              <img
                src={
                  tripPlan.matchedDestination?.image || FALLBACK_IMAGE
                }
                alt={tripPlan.destination}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = FALLBACK_IMAGE;
                }}
              />

              <div className="modal-image-content">
                <span>Your Wonderly Trip</span>

                <h2>{tripPlan.destination}</h2>

                <p>
                  <CalendarDays size={15} />
                  {tripPlan.days} Days · {tripPlan.travelers} Travelers
                </p>
              </div>
            </div>

            <div className="modal-content itinerary-content">
              <div className="trip-summary">
                <div>
                  <span>
                    <CalendarDays size={17} />
                    Duration
                  </span>
                  <strong>{tripPlan.days} Days</strong>
                </div>

                <div>
                  <span>
                    <Users size={17} />
                    Travelers
                  </span>
                  <strong>{tripPlan.travelers}</strong>
                </div>

                <div>
                  <span>
                    <WalletCards size={17} />
                    Budget
                  </span>
                  <strong>{tripPlan.budget}</strong>
                </div>
              </div>

              <div className="trip-plan-intro">
                <div>
                  <span className="eyebrow">YOUR PERSONALIZED PLAN</span>

                  <h3>
                    {tripPlan.days}-day adventure in{" "}
                    {tripPlan.destination}
                  </h3>
                </div>

                <p>
                  This is an estimated travel plan created from your selected
                  preferences. You can customize the activities, hotels,
                  transport and timings before booking.
                </p>
              </div>


              {/* LIVE WEATHER */}
              <section className="weather-section">
                <div className="weather-header">
                  <div>
                    <span className="eyebrow">LIVE DESTINATION WEATHER</span>
                    <h3>Weather in {tripPlan.destination}</h3>
                    <p>
                      Current conditions and a 5-day forecast to help you plan
                      your activities.
                    </p>
                  </div>

                  <button
                    className="weather-refresh"
                    type="button"
                    onClick={() => {
                      setWeatherRefreshKey((current) => current + 1);
                    }}
                    disabled={weatherLoading}
                    title="Refresh weather"
                  >
                    <RefreshCw
                      size={16}
                      className={weatherLoading ? "weather-spin" : ""}
                    />
                    Refresh
                  </button>
                </div>

                {weatherLoading && (
                  <div className="weather-loading">
                    <CloudSun size={24} />
                    <div>
                      <strong>Checking live weather...</strong>
                      <span>Getting the latest conditions for your destination.</span>
                    </div>
                  </div>
                )}

                {!weatherLoading && weatherError && (
                  <div className="weather-error">
                    <CloudSun size={22} />
                    <div>
                      <strong>Weather temporarily unavailable</strong>
                      <span>{weatherError}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setWeatherRefreshKey((current) => current + 1);
                      }}
                    >
                      Try again
                    </button>
                  </div>
                )}

                {!weatherLoading && !weatherError && weather && (
                  <>
                    <div className="weather-current">
                      <div className="weather-main">
                        <div className="weather-symbol">{weather.current.icon}</div>
                        <div>
                          <div className="weather-temperature">
                            {weather.current.temperature}°C
                          </div>
                          <strong>{weather.current.condition}</strong>
                          <span>
                            Feels like {weather.current.feelsLike}°C
                          </span>
                        </div>
                      </div>

                      <div className="weather-details">
                        <div>
                          <Droplets size={18} />
                          <span>Humidity</span>
                          <strong>{weather.current.humidity}%</strong>
                        </div>
                        <div>
                          <Wind size={18} />
                          <span>Wind</span>
                          <strong>{weather.current.wind} km/h</strong>
                        </div>
                        <div>
                          <Thermometer size={18} />
                          <span>Feels like</span>
                          <strong>{weather.current.feelsLike}°C</strong>
                        </div>
                      </div>
                    </div>

                    <div className="forecast-grid">
                      {weather.forecast.map((day) => (
                        <div className="forecast-card" key={day.date}>
                          <span>{day.label}</span>
                          <strong className="forecast-icon">{day.icon}</strong>
                          <small>{day.condition}</small>
                          <div>
                            <b>{day.max}°</b>
                            <span>{day.min}°</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="weather-note">
                      Weather data is provided by Open-Meteo and can change as
                      forecasts are updated.
                    </p>
                  </>
                )}
              </section>


              {/* DAY BY DAY */}
              <div className="itinerary-list">
                {tripPlan.itinerary.map((day) => (
                  <div className="itinerary-day" key={day.day}>
                    <div className="itinerary-day-number">
                      <span>DAY</span>
                      <strong>{day.day}</strong>
                    </div>

                    <div className="itinerary-day-content">
                      <h4>{day.title}</h4>

                      <div className="itinerary-activity">
                        <div className="activity-time">
                          <span className="activity-dot" />
                          Morning
                        </div>

                        <p>{day.morning}</p>
                      </div>

                      <div className="itinerary-activity">
                        <div className="activity-time">
                          <span className="activity-dot" />
                          Afternoon
                        </div>

                        <p>{day.afternoon}</p>
                      </div>

                      <div className="itinerary-activity">
                        <div className="activity-time">
                          <span className="activity-dot" />
                          Evening
                        </div>

                        <p>{day.evening}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* BUDGET */}
              <div className="budget-section">
                <div className="budget-header">
                  <div>
                    <span className="eyebrow">ESTIMATED BUDGET</span>
                    <h3>Where your budget may go</h3>
                  </div>

                  <div className="budget-total">
                    <small>Total estimate</small>
                    <strong>{formatCurrency(tripPlan.totalBudget)}</strong>
                  </div>
                </div>

                <div className="budget-grid">
                  {tripPlan.breakdown.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div className="budget-item" key={item.label}>
                        <div className="budget-item-icon">
                          <Icon size={18} />
                        </div>

                        <div>
                          <span>{item.label}</span>
                          <strong>{formatCurrency(item.value)}</strong>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="budget-note">
                  Approx. {formatCurrency(tripPlan.estimatedPerPerson)} per
                  traveler based on your selected budget. Actual costs can
                  vary depending on accommodation, transport, season and
                  activities.
                </p>
              </div>

              {/* FINAL ACTIONS */}
              <div className="save-trip-row">
                <button
                  className="save-trip-button"
                  type="button"
                  onClick={saveTripToBackend}
                >
                  <Bookmark size={17} />
                  Save This Trip
                </button>
                {saveMessage && <span className="save-trip-message">{saveMessage}</span>}
              </div>

              <div className="itinerary-actions">
                <button
                  className="modal-plan-button secondary"
                  type="button"
                  onClick={() => setTripPlan(null)}
                >
                  Close Plan
                </button>

                <button
                  className="modal-plan-button"
                  type="button"
                  onClick={() => {
                    setTripPlan(null);

                    setTimeout(() => {
                      scrollToSection("planner");
                    }, 100);
                  }}
                >
                  Modify Trip
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MY TRIPS MODAL */}
      {showMyTrips && (
        <div
          className="modal-backdrop my-trips-backdrop"
          onClick={() => setShowMyTrips(false)}
        >
          <div
            className="destination-modal my-trips-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setShowMyTrips(false)}
              aria-label="Close My Trips"
            >
              <X size={21} />
            </button>

            <div className="my-trips-header">
              <div>
                <span className="eyebrow">YOUR SAVED TRIPS</span>
                <h2>My Trips</h2>
                <p>Saved plans stay available on this browser.</p>
              </div>
              <History size={34} />
            </div>

            {savedTripsLoading && (
              <div className="my-trips-empty">Loading your saved trips...</div>
            )}

            {!savedTripsLoading && savedTripsError && (
              <div className="my-trips-error">{savedTripsError}</div>
            )}

            {!savedTripsLoading && !savedTripsError && savedTrips.length === 0 && (
              <div className="my-trips-empty">
                <Bookmark size={32} />
                <h3>No saved trips yet</h3>
                <p>Generate a trip and click “Save This Trip” to see it here.</p>
                <button
                  type="button"
                  className="modal-plan-button"
                  onClick={() => {
                    setShowMyTrips(false);
                    setTimeout(() => scrollToSection("planner"), 100);
                  }}
                >
                  Plan My First Trip
                  <ArrowRight size={17} />
                </button>
              </div>
            )}

            {!savedTripsLoading && savedTrips.length > 0 && (
              <div className="saved-trip-list">
                {savedTrips.map((savedTrip) => (
                  <article className="saved-trip-card" key={savedTrip.id}>
                    <div className="saved-trip-card-main">
                      <div className="saved-trip-icon">
                        <Plane size={20} />
                      </div>
                      <div>
                        <h3>{savedTrip.destination}</h3>
                        <p>
                          {savedTrip.days} Days · {savedTrip.travelers} Travelers · {savedTrip.budget}
                        </p>
                        <small>
                          {savedTrip.createdAt
                            ? new Date(savedTrip.createdAt).toLocaleString()
                            : "Saved trip"}
                        </small>
                      </div>
                    </div>

                    <div className="saved-trip-actions">
                      <button
                        type="button"
                        className="saved-trip-open"
                        onClick={() => openSavedTrip(savedTrip)}
                      >
                        Open Trip
                        <ArrowRight size={15} />
                      </button>
                      <button
                        type="button"
                        className="saved-trip-delete"
                        onClick={() => deleteSavedTrip(savedTrip.id)}
                        aria-label={`Delete ${savedTrip.destination} trip`}
                        title="Delete trip"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* INLINE STYLES FOR THE NEW ITINERARY UI */}
      <style>{`
        .mobile-nav-cta {
          display: none;
        }

        .itinerary-modal {
          max-width: 980px;
        }

        .itinerary-content {
          max-height: 65vh;
          overflow-y: auto;
        }

        .trip-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: 28px;
        }

        .trip-summary > div {
          padding: 18px;
          border-radius: 16px;
          background: #f7f5ff;
          border: 1px solid rgba(91, 70, 193, 0.1);
        }

        .trip-summary span {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          color: #777;
          margin-bottom: 7px;
        }

        .trip-summary strong {
          display: block;
          font-size: 17px;
          color: #222;
        }

        .trip-plan-intro {
          margin-bottom: 26px;
        }

        .trip-plan-intro h3 {
          margin: 7px 0 8px;
          font-size: 25px;
        }

        .trip-plan-intro p {
          margin: 0;
          color: #707070;
          line-height: 1.7;
        }


        .weather-section {
          margin: 0 0 30px;
          padding: 22px;
          border-radius: 20px;
          background: linear-gradient(135deg, #f7f8ff 0%, #ffffff 100%);
          border: 1px solid #e7e5f3;
        }

        .weather-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 18px;
        }

        .weather-header h3 {
          margin: 6px 0 5px;
          font-size: 21px;
        }

        .weather-header p {
          margin: 0;
          color: #777;
          font-size: 13px;
          line-height: 1.6;
        }

        .weather-refresh {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 13px;
          border: 1px solid #ddd8f0;
          border-radius: 11px;
          background: #fff;
          color: #5541ae;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
        }

        .weather-refresh:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .weather-spin {
          animation: weatherSpin 1s linear infinite;
        }

        @keyframes weatherSpin {
          to {
            transform: rotate(360deg);
          }
        }

        .weather-current {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 15px;
          margin-bottom: 14px;
        }

        .weather-main {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px;
          border-radius: 17px;
          background: #fff;
          border: 1px solid #eceaf4;
        }

        .weather-symbol {
          font-size: 48px;
          line-height: 1;
        }

        .weather-temperature {
          font-size: 34px;
          font-weight: 800;
          line-height: 1;
          color: #2d2750;
          margin-bottom: 7px;
        }

        .weather-main strong {
          display: block;
          color: #403769;
          font-size: 14px;
        }

        .weather-main span {
          display: block;
          margin-top: 4px;
          color: #777;
          font-size: 12px;
        }

        .weather-details {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 9px;
        }

        .weather-details > div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
          padding: 13px;
          border-radius: 15px;
          background: #fff;
          border: 1px solid #eceaf4;
          color: #5c45c7;
        }

        .weather-details span {
          color: #777;
          font-size: 10px;
        }

        .weather-details strong {
          color: #2d2750;
          font-size: 14px;
        }

        .forecast-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 9px;
        }

        .forecast-card {
          padding: 13px 10px;
          border-radius: 15px;
          background: #fff;
          border: 1px solid #eceaf4;
          text-align: center;
        }

        .forecast-card > span {
          display: block;
          color: #666;
          font-size: 11px;
          font-weight: 700;
        }

        .forecast-icon {
          display: block;
          margin: 8px 0 5px;
          font-size: 25px;
        }

        .forecast-card small {
          display: block;
          min-height: 28px;
          color: #777;
          font-size: 9px;
          line-height: 1.4;
        }

        .forecast-card > div {
          display: flex;
          justify-content: center;
          gap: 7px;
          margin-top: 7px;
        }

        .forecast-card b {
          color: #332b5e;
          font-size: 13px;
        }

        .forecast-card > div span {
          color: #999;
          font-size: 13px;
        }

        .weather-note {
          margin: 12px 0 0;
          color: #8a8a8a;
          font-size: 10px;
          line-height: 1.5;
        }

        .weather-loading,
        .weather-error {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 17px;
          border-radius: 15px;
          background: #fff;
          border: 1px solid #eceaf4;
        }

        .weather-loading > svg,
        .weather-error > svg {
          color: #5c45c7;
          flex-shrink: 0;
        }

        .weather-loading strong,
        .weather-error strong {
          display: block;
          color: #332b5e;
          font-size: 13px;
        }

        .weather-loading span,
        .weather-error span {
          display: block;
          margin-top: 3px;
          color: #777;
          font-size: 11px;
        }

        .weather-error button {
          margin-left: auto;
          padding: 9px 12px;
          border: none;
          border-radius: 10px;
          background: #5c45c7;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
        }

        .itinerary-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .itinerary-day {
          display: grid;
          grid-template-columns: 75px 1fr;
          gap: 18px;
          padding: 20px;
          border: 1px solid #eceaf4;
          border-radius: 18px;
          background: #fff;
        }

        .itinerary-day-number {
          width: 58px;
          height: 58px;
          border-radius: 16px;
          background: #5c45c7;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .itinerary-day-number span {
          font-size: 8px;
          letter-spacing: 1px;
          opacity: 0.8;
        }

        .itinerary-day-number strong {
          font-size: 21px;
        }

        .itinerary-day-content h4 {
          margin: 0 0 13px;
          font-size: 18px;
        }

        .itinerary-activity {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 15px;
          align-items: center;
          padding: 8px 0;
          border-top: 1px solid #f1eff5;
        }

        .itinerary-activity:first-of-type {
          border-top: none;
        }

        .activity-time {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #6658a8;
          font-size: 12px;
          font-weight: 700;
        }

        .activity-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #6658a8;
        }

        .itinerary-activity p {
          margin: 0;
          color: #444;
          font-size: 14px;
        }

        .budget-section {
          margin-top: 30px;
          padding: 24px;
          border-radius: 20px;
          background: #f8f7fc;
          border: 1px solid #ebe8f5;
        }

        .budget-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 20px;
        }

        .budget-header h3 {
          margin: 5px 0 0;
          font-size: 21px;
        }

        .budget-total {
          text-align: right;
        }

        .budget-total small {
          display: block;
          color: #777;
          margin-bottom: 4px;
        }

        .budget-total strong {
          font-size: 24px;
          color: #4e3cb3;
        }

        .budget-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
        }

        .budget-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 13px;
          border-radius: 14px;
          background: white;
        }

        .budget-item-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eeeafd;
          color: #5c45c7;
          flex-shrink: 0;
        }

        .budget-item span {
          display: block;
          color: #777;
          font-size: 11px;
        }

        .budget-item strong {
          display: block;
          margin-top: 3px;
          font-size: 13px;
        }

        .budget-note {
          margin: 15px 0 0;
          color: #777;
          font-size: 12px;
          line-height: 1.6;
        }

        .itinerary-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 25px;
        }

        .modal-plan-button.secondary {
          background: #efedf7;
          color: #4e3caa;
        }

        @media (max-width: 760px) {
          .my-trips-nav span {
            display: none;
          }

          .ai-planner-header,
          .saved-trip-card {
            flex-direction: column;
            align-items: stretch;
          }

        

          .saved-trip-actions {
            width: 100%;
          }

          .saved-trip-open {
            flex: 1;
          }

          .weather-header {
            flex-direction: column;
          }

          .weather-current {
            grid-template-columns: 1fr;
          }

          .forecast-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .weather-refresh {
            width: 100%;
            justify-content: center;
          }

          .mobile-nav-cta {
            display: inline-flex;
          }

          .trip-summary {
            grid-template-columns: 1fr;
          }

          .budget-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .budget-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .budget-total {
            text-align: left;
          }

          .itinerary-day {
            grid-template-columns: 55px 1fr;
            gap: 12px;
            padding: 15px;
          }

          .itinerary-day-number {
            width: 48px;
            height: 48px;
          }

          .itinerary-activity {
            grid-template-columns: 1fr;
            gap: 4px;
          }

          .itinerary-actions {
            flex-direction: column;
          }

          .itinerary-actions button {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .weather-section {
            padding: 15px;
          }

          .weather-details {
            grid-template-columns: 1fr;
          }

          .forecast-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .weather-error {
            align-items: flex-start;
            flex-wrap: wrap;
          }

          .weather-error button {
            margin-left: 34px;
          }

          .budget-grid {
            grid-template-columns: 1fr;
          }

          .trip-plan-intro h3 {
            font-size: 21px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;