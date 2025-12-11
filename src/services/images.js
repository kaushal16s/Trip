const API_KEY = import.meta.env.VITE_GOOGLE_SEARCH_API_KEY;
const CX = import.meta.env.VITE_GOOGLE_SEARCH_CX;
const BASE_URL = 'https://www.googleapis.com/customsearch/v1';

export const getPlaceImage = async (query) => {
    // Robust fallback image service
    const getFallback = (text) => `https://placehold.co/800x600/1a1a1a/white?text=${encodeURIComponent(text)}`;

    if (!API_KEY || !CX || CX === 'YOUR_SEARCH_ENGINE_ID_HERE') {
        if (!API_KEY) console.warn("Google Search API Key missing");
        if (!CX || CX === 'YOUR_SEARCH_ENGINE_ID_HERE') console.warn("Google Search Engine ID (CX) missing or invalid");
        return getFallback(query);
    }

    // 1. Clean the query
    const cleanQuery = query.replace(/\(.*\)/, '').trim();

    // 2. Define queries to try
    const searchQueries = [
        `${query} tourism high quality`,
        `${cleanQuery} aesthetic travel`,
        cleanQuery
    ];

    // 3. Try each query sequentially
    for (const q of searchQueries) {
        try {
            const url = `${BASE_URL}?q=${encodeURIComponent(q)}&cx=${CX}&key=${API_KEY}&searchType=image&imgSize=large&num=1&safe=active`;
            const res = await fetch(url);

            if (res.ok) {
                const data = await res.json();
                if (data.items && data.items.length > 0) {
                    return data.items[0].link;
                }
            }
        } catch (e) {
            console.warn(`Failed image fetch for "${q}":`, e);
            // Continue to next query
        }
    }

    // 4. If all fail, return placeholder
    return getFallback(cleanQuery);
};

export const fetchDestinationGallery = async (destination) => {
    // Mock gallery fallback if API fails
    const mockGallery = (dest) => [
        { id: 'm1', url: `https://placehold.co/600x400/10b981/white?text=${encodeURIComponent(dest + ' Scenic')}`, description: 'Scenic View', type: 'Scenic', photographer: 'AI Placeholder' },
        { id: 'm2', url: `https://placehold.co/600x400/3b82f6/white?text=${encodeURIComponent(dest + ' Food')}`, description: 'Local Cuisine', type: 'Food', photographer: 'AI Placeholder' },
        { id: 'm3', url: `https://placehold.co/600x400/f59e0b/white?text=${encodeURIComponent(dest + ' Culture')}`, description: 'Cultural Site', type: 'Culture', photographer: 'AI Placeholder' },
        { id: 'm4', url: `https://placehold.co/600x400/6366f1/white?text=${encodeURIComponent(dest + ' Landmark')}`, description: 'Famous Landmark', type: 'Landmark', photographer: 'AI Placeholder' },
    ];

    if (!API_KEY || !CX || CX === 'YOUR_SEARCH_ENGINE_ID_HERE') return mockGallery(destination);

    const categories = [
        { query: `${destination} scenic travel`, type: 'Scenic' },
        { query: `${destination} food street`, type: 'Food' },
        { query: `${destination} landmark`, type: 'Landmark' },
        { query: `${destination} culture people`, type: 'Culture' }
    ];

    try {
        const promises = categories.map(async (cat) => {
            const url = `${BASE_URL}?q=${encodeURIComponent(cat.query)}&cx=${CX}&key=${API_KEY}&searchType=image&imgSize=large&num=3&safe=active`;
            const res = await fetch(url);

            if (!res.ok) return []; // Skip this category on error

            const data = await res.json();
            return (data.items || []).map(img => ({
                id: Math.random().toString(36).substr(2, 9),
                url: img.link,
                thumbnail: img.image.thumbnailLink,
                description: img.title || cat.type,
                photographer: img.displayLink || 'Google Search',
                type: cat.type
            }));
        });

        const results = await Promise.all(promises);
        const flatResults = results.flat().sort(() => 0.5 - Math.random());

        // If we got nothing (e.g. quota limit), return mock
        if (flatResults.length === 0) return mockGallery(destination);

        return flatResults;

    } catch (error) {
        console.error("Error fetching gallery:", error);
        return mockGallery(destination);
    }
};

export const enrichItineraryWithImages = async (itinerary) => {
    // Process days sequentially to avoid rate limits if any, but parallel is usually fine for Google
    // Using Promise.all for speed as Google quota is per day generally
    const updatedDays = await Promise.all(itinerary.days.map(async (day) => {
        const updatedActivities = await Promise.all(day.activities.map(async (activity) => {
            const imageUrl = await getPlaceImage(activity.place);
            return { ...activity, imageUrl };
        }));
        return { ...day, activities: updatedActivities };
    }));

    return { ...itinerary, days: updatedDays };
};
