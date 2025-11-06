require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" }
];

app.get('/api/quote', (req, res) => {
  try {
    const idx = Math.floor(Math.random() * quotes.length);
    res.json({ quote: quotes[idx] });
  } catch {
    res.status(500).json({ error: 'Could not fetch a quote.' });
  }
});

app.get('/api/weather', async (req, res) => {
  const city = req.query.city || 'London';
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    if (!apiKey) {
      return res.json({
        city,
        temperatureC: 18,
        temperatureF: 64.4,
        condition: 'Partly cloudy (mock)'
      });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    const data = response.data;

    res.json({
      city: data.name,
      temperatureC: data.main.temp,
      temperatureF: data.main.temp * 9 / 5 + 32,
      condition: data.weather && data.weather[0] ? data.weather[0].description : 'Unknown'
    });
  } catch {
    res.status(500).json({ error: 'Could not fetch weather data.' });
  }
});

app.get('/api/currency', async (req, res) => {
  const amountRaw = req.query.amount;
  const amount = Number(amountRaw);
  if (!amountRaw || Number.isNaN(amount) || amount < 0) {
    return res.status(400).json({ error: 'Invalid amount. Provide a non-negative number as ?amount=100' });
  }

  try {
    const resp = await axios.get(`https://api.exchangerate.host/latest?base=INR&symbols=USD,EUR`);
    const rates = resp.data.rates;
    const usd = Number((amount * rates.USD).toFixed(4));
    const eur = Number((amount * rates.EUR).toFixed(4));
    res.json({ amountINR: amount, usd, eur, timestamp: resp.data.date });
  } catch {
    const usd = Number((amount * 0.012).toFixed(4));
    const eur = Number((amount * 0.011).toFixed(4));
    res.json({ amountINR: amount, usd, eur, note: 'Mock fallback rates used' });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
