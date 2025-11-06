# 🌐 InfoHub — ByteXL Full Stack Coding Challenge

A modern full-stack application built for the **ByteXL InfoHub Challenge**.  
InfoHub provides live **Weather Updates**, **Currency Conversion**, and **Motivational Quotes** in a clean, tab-based interface — powered by a Node.js backend and React (Vite) frontend.

---

## 🚀 Tech Stack

### 🖥️ Frontend
- React (Vite)
- Axios for API calls
- Tailwind CSS for styling

### ⚙️ Backend
- Node.js + Express
- Axios for external API calls
- dotenv for environment variables

---

## 📁 Folder Structure

InfoHub-Challenge/
├── client/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── WeatherModule.jsx
│ │ │ ├── CurrencyConverter.jsx
│ │ │ └── QuoteGenerator.jsx
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── index.html
│ ├── vite.config.js
│ └── package.json
│
└── server/
├── server.js
├── .env
└── package.json

# Backend Setup
cd server
npm install

OPENWEATHER_API_KEY=your_openweather_api_key
PORT=3001
start the server :node server.js

# Frontend Setup

cd ../client
npm install
npm run dev


🧩 Modules Overview
🌀 Weather Module

Displays real-time weather using OpenWeatherMap API.

💱 Currency Converter

Converts INR to USD and EUR using live exchange rates.

💬 Quote Generator

Shows random motivational quotes with a “New Quote” button.