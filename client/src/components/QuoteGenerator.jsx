import React, { useState } from 'react';
import axios from 'axios';

export default function QuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchQuote = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/api/quote');
      setQuote(res.data.quote);
    } catch {
      setError('Could not load a quote.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchQuote} className="mb-4 px-4 py-2 rounded bg-green-600 text-white">
        Get Quote
      </button>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {quote && (
        <blockquote className="mt-4 p-4 border-l-4 border-gray-300">
          <p className="italic">"{quote.text}"</p>
          <footer className="mt-2 text-sm">— {quote.author || 'Unknown'}</footer>
        </blockquote>
      )}
    </div>
  );
}
