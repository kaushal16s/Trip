const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeather = async (destination, startDate, endDate) => {
    if (!API_KEY) {
        console.warn("Weather API Key missing");
        return null;
    }

    try {
        // Use the direct city query for 5-day forecast
        const weatherRes = await fetch(`${BASE_URL}/forecast?q=${destination}&units=metric&appid=${API_KEY}`);
        const weatherData = await weatherRes.json();

        if (weatherRes.status !== 200) {
            console.error("Weather API Error:", weatherData.message);
            return null;
        }

        if (!weatherData.list) return null;

        // Map forecast to dates (simplified)
        // In a real app, we would match dates.
        return weatherData.list.filter((_, index) => index % 8 === 0).map(item => ({
            date: item.dt_txt.split(' ')[0],
            temp: Math.round(item.main.temp),
            condition: item.weather[0].main,
            description: item.weather[0].description
        }));

    } catch (error) {
        console.error("Error fetching weather:", error);
        return null;
    }
};

export const getCurrentWeather = async (destination) => {
    if (!API_KEY) {
        console.warn("Weather API Key missing");
        return null;
    }

    try {
        const response = await fetch(`${BASE_URL}/weather?q=${destination}&units=metric&appid=${API_KEY}`);
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            console.error("Weather API Error:", data.message);
            return null;
        }
    } catch (error) {
        console.error("Error fetching current weather:", error);
        return null;
    }
};
