
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5000",
    "https://trip-mdmm.onrender.com",
    /\.vercel\.app$/
  ],
  methods: ["GET", "POST"]
}));
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("ERROR: GEMINI_API_KEY is missing in server/.env");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

app.post('/api/itinerary', async (req, res) => {
  try {
    const { tripData, weatherData } = req.body;

    if (!API_KEY) {
      return res.status(500).json({ error: { message: "Server configuration error: API Key missing" } });
    }

    const weatherContext = weatherData
      ? `Weather Forecast: ${JSON.stringify(weatherData)}`
      : "Weather information not available, please estimate based on season.";

    const prompt = `
    Act as an expert travel planner. Create a detailed day-by-day itinerary for a trip to ${tripData.destination}.
    
    Trip Details:
    - Dates: ${tripData.startDate} to ${tripData.endDate}
    - Travelers: ${tripData.travelType}
    - Budget: ${tripData.budget}
    - ${weatherContext}
    
    Requirements:
    1. Provide a day-by-day plan with morning, afternoon, and evening activities.
    2. Suggest specific places to visit and activities.
    3. Include estimated costs in INR (Indian Rupees).
    4. Categorize activities with a "poi_type" (e.g., Adventure, Food, Culture, Nature, Shopping).
    5. Provide Food Recommendations for each day categorized by budget (Low, Moderate, Premium).
    6. Provide a Detailed Budget Breakdown including Transport, Stay, Food, and Activities.
    7. Mention weather expectations.
    
    8. Estimate the total cost in INR.

    Format the response as a valid JSON object with the following structure:
    {
      "destination": "City, Country",
      "summary": "Brief overview of the trip",
      "days": [
        {
          "day": 1,
          "date": "YYYY-MM-DD",
          "theme": "Arrival & Exploration",
          "weather": "Sunny, 25°C",
          "activities": [
            {
              "time": "Morning",
              "description": "Activity description",
              "place": "Place Name",
              "poi_type": "Nature", // Options: Adventure, Food, Culture, Nature, Religion, Shopping, Viewpoint, Water
              "cost": 500
            }
          ],
          "food_recommendations": {
             "low": { "name": "Street Food Stall", "cost": 150 },
             "moderate": { "name": "Nice Cafe", "cost": 400 },
             "premium": { "name": "Fine Dining", "cost": 1200 }
          }
        }
      ],
      "budget_breakdown": {
        "transport": 2000,
        "stay_estimate": 5000,
        "food": 3000,
        "activities": 1000,
        "total": 11000,
        "recommended_budget_range": "₹10,000 - ₹12,000",
        "split_cost_per_person": "₹2,750 (approx. for 4 travelers)"
      },
      "tips": ["Tip 1", "Tip 2"]
    }
    
    IMPORTANT: Return ONLY the JSON string. Do not include markdown formatting like \`\`\`json.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const itinerary = JSON.parse(jsonString);

    res.json(itinerary);

  } catch (error) {
    console.error("Error generating itinerary:", error);
    res.status(500).json({ error: { message: error.message || "Failed to generate itinerary" } });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
