import React, { useState } from 'react';
import WeatherModule from './components/WeatherModule';
import CurrencyConverter from './components/CurrencyConverter';
import QuoteGenerator from './components/QuoteGenerator';

export default function App() {
  const [activeTab, setActiveTab] = useState('Weather');
  const tabs = [
    { name: 'Weather', icon: '🌤️' },
    { name: 'Currency', icon: '💱' },
    { name: 'Quote', icon: '💬' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-gray-100">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-700 drop-shadow-sm">
          InfoHub Dashboard
        </h1>

        
        <div className="flex justify-center gap-3 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-200 shadow-sm
                ${activeTab === tab.name
                  ? 'bg-blue-600 text-white scale-105 shadow-lg'
                  : 'bg-white hover:bg-blue-50 text-gray-600 border border-gray-200'
                }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        
        <div className="bg-white rounded-2xl shadow-inner p-6 min-h-[300px] transition-all duration-300 border border-gray-100">
          {activeTab === 'Weather' && <WeatherModule />}
          {activeTab === 'Currency' && <CurrencyConverter />}
          {activeTab === 'Quote' && <QuoteGenerator />}
        </div>

        <footer className="text-center mt-8 text-sm text-gray-500">
          Built with 💙 by <span className="font-semibold text-blue-600">ByteXL Challenge</span>
        </footer>
      </div>
    </div>
  );
}
