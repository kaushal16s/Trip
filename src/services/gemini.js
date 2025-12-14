const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');

export const generateItinerary = async (tripData, weatherData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/itinerary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tripData,
        weatherData
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend API Error:", errorData);
      throw new Error(errorData.error?.message || "Failed to fetch from Backend API");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw error;
  }
};
