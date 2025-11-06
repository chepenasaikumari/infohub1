import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function WeatherModule() {
  const [city, setCity] = useState('London');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (cityName = city) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/api/weather', { params: { city: cityName } });
      setData(res.data);
    } catch {
      setError('Could not load weather.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-5">
      <div className="flex gap-2 mb-3">
        <input
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="City"
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={() => fetchWeather(city)}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="p-5 border rounded-xl shadow-md bg-white animate-pulse">
          <div className="h-6 w-40 bg-gray-300 rounded mb-3"></div>
          <div className="h-4 w-28 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
        </div>
      )}

      {error && <div className="text-red-600">{error}</div>}

      {data && (
        <div className="mt-5">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-300/20 rounded-full blur-xl"></div>

            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <span>📍</span> {data.city}
              </h2>

              <div className="text-6xl font-extrabold mb-1">
                {data.temperatureC}°C
              </div>

              <p className="opacity-80 mb-4">
                {data.temperatureF}°F
              </p>

              <div className="flex items-center gap-3 mt-4 text-lg font-medium">
                <div className="text-4xl">
                  {data.condition.includes("Sunny") && "☀️"}
                  {data.condition.includes("Cloud") && "☁️"}
                  {data.condition.includes("Rain") && "🌧️"}
                  {data.condition.includes("Snow") && "❄️"}
                  {data.condition.includes("Wind") && "💨"}
                  {!["Sunny", "Cloud", "Rain", "Snow", "Wind"].some(word => data.condition.includes(word)) && "🌤️"}
                </div>

                <span>{data.condition}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
