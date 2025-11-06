import React, { useState } from 'react';
import axios from 'axios';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const convert = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await axios.get('/api/currency', { params: { amount } });
      setResult(res.data);
    } catch {
      setError('Could not convert currency.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <input
          value={amount}
          onChange={e => setAmount(e.target.value)}
          type="number"
          min="0"
          className="border p-2 rounded w-40"
        />
        <button onClick={convert} className="px-3 py-2 rounded bg-indigo-600 text-white">
          Convert INR
        </button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {result && (
        <div className="mt-3">
          <p>INR: {result.amountINR}</p>
          <p>USD: {result.usd}</p>
          <p>EUR: {result.eur}</p>
          {result.note && <p className="text-sm text-gray-500">{result.note}</p>}
        </div>
      )}
    </div>
  );
}
