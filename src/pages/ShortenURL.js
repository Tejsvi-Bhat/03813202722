// ShortenURL.js
import React, { useState } from 'react';
import { logEvent } from '../utils/logger';

const ShortenPage = () => {
  const [urls, setUrls] = useState(
    Array(5).fill({ longUrl: '', shortcode: '', validity: '' })
  );

  const handleChange = (index, field, value) => {
    setUrls((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleShorten = (index) => {
    const { longUrl, shortcode, validity } = urls[index];

    if (!longUrl.trim()) {
      alert("Please enter a URL.");
      logEvent("frontend", "warn", "component", `Missing long URL at index ${index}`);
      return;
    }

    logEvent("frontend", "info", "component", `Shorten clicked at index ${index}`);
    console.log("Ready to send:", { longUrl, shortcode, validity });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>URL Shortener</h2>
      {urls.map((entry, idx) => (
        <div
          key={idx}
          style={{
            marginBottom: '1rem',
            padding: '1rem',
            border: '1px solid #ddd',
            borderRadius: '6px',
          }}
        >
          <input
            type="text"
            placeholder="Enter long URL"
            value={entry.longUrl}
            onChange={(e) => handleChange(idx, 'longUrl', e.target.value)}
            style={{ marginRight: 10, width: '30%' }}
          />
          <input
            type="text"
            placeholder="Custom shortcode (optional)"
            value={entry.shortcode}
            onChange={(e) => handleChange(idx, 'shortcode', e.target.value)}
            style={{ marginRight: 10, width: '20%' }}
          />
          <input
            type="number"
            placeholder="Validity (min)"
            value={entry.validity}
            onChange={(e) => handleChange(idx, 'validity', e.target.value)}
            style={{ marginRight: 10, width: '15%' }}
          />
          <button onClick={() => handleShorten(idx)}>Shorten</button>
        </div>
      ))}
    </div>
  );
};

export default ShortenPage;
