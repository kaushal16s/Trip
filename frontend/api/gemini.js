import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { prompt } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: "Server configuration error: GEMINI_API_KEY is missing" });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Using 2.0-flash as requested, though server used 1.5-flash-lite

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        res.status(200).json({ text });
    } catch (err) {
        console.error("Gemini API Error:", err);
        res.status(500).json({ error: err.message });
    }
}
