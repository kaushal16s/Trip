import React, { useState } from 'react';
import Hero from './components/Hero';
import TripForm from './components/TripForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import { generateItinerary } from './services/gemini';
import { getWeather } from './services/weather';
import { enrichItineraryWithImages } from './services/images';
import { getThemeForDestination, applyTheme } from './utils/themes';
import { useEffect } from 'react';

import LoadingScreen from './components/LoadingScreen';

function App() {
  const [view, setView] = useState('landing'); // landing, form, result
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStart = () => {
    setView('form');
  };

  const handleFormSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Get Weather
      const weatherData = await getWeather(data.destination, data.startDate, data.endDate);

      // 2. Generate Itinerary with Gemini
      const itinerary = await generateItinerary(data, weatherData);

      // 3. Enrich with Images
      const enrichedItinerary = await enrichItineraryWithImages(itinerary);

      setTripData(enrichedItinerary);
      setView('result');
    } catch (err) {
      console.error(err);
      setError("Failed to generate itinerary. Please check your API key or try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tripData?.itinerary?.destination) {
      const theme = getThemeForDestination(tripData.itinerary.destination);
      applyTheme(theme);
    } else {
      // Reset to default on initial load or reset
      applyTheme(getThemeForDestination(''));
    }
  }, [tripData]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-main">
      {loading && <LoadingScreen />}

      {view === 'landing' && !loading && <Hero onGenerate={handleFormSubmit} />}

      {view === 'form' && !loading && (
        <div className="container py-10">
          <button onClick={() => setView('landing')} className="mb-6 text-[var(--color-text-muted)] hover:text-white">
            &larr; Back
          </button>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Tell us your preferences</h2>
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl mb-6">
                {error}
              </div>
            )}
            {loading ? (
              <div className="glass p-10 text-center rounded-2xl">
                <div className="w-12 h-12 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-xl font-bold">Crafting your perfect trip...</h3>
                <p className="text-[var(--color-text-muted)]">This might take a moment.</p>
              </div>
            ) : (
              <TripForm onSubmit={handleFormSubmit} />
            )}
          </div>
        </div>
      )}

      {view === 'result' && (
        <div className="container py-10">
          <button onClick={() => setView('form')} className="mb-6 text-[var(--color-text-muted)] hover:text-white">
            &larr; Plan Another Trip
          </button>
          <ItineraryDisplay data={tripData} />
        </div>
      )}
    </div>
  );
}

export default App;
