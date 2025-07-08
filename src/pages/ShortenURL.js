// src/pages/ShortenURL.js

import React, { useState } from 'react';
import { logEvent } from '../utils/logger'; // make sure path is correct

const ShortenURL = () => {
  const [urlData, setUrlData] = useState([
    { longUrl: '', shortcode: '', validity: 30 },
    { longUrl: '', shortcode: '', validity: 30 },
    { longUrl: '', shortcode: '', validity: 30 },
    { longUrl: '', shortcode: '', validity: 30 },
    { longUrl: '', shortcode: '', validity: 30 },
  ]);

  const [shortenedUrls, setShortenedUrls] = useState([]);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...urlData];
    updatedData[index][field] = value;
    setUrlData(updatedData);
  };

  const generateRandomShortcode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const handleShorten = (index) => {
    const { longUrl, shortcode, validity } = urlData[index];
    if (!longUrl) {
      alert("Please enter a valid URL.");
      return;
    }

    const code = shortcode || generateRandomShortcode();
    const expiry = new Date(Date.now() + validity * 60 * 1000); // in ms

    const shortURL = `http://localhost:3000/${code}`;

    const entry = {
      longUrl,
      shortcode: code,
      validity,
      expiry: expiry.toISOString(),
      shortURL,
    };

    setShortenedUrls([...shortenedUrls, entry]);

    logEvent("frontend", "info", "component", `Shortened URL created: ${shortURL}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shorten Your URLs (Max 5)</h2>
      {urlData.map((row, idx) => (
        <div key={idx} style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Enter long URL"
            value={row.longUrl}
            onChange={(e) => handleInputChange(idx, 'longUrl', e.target.value)}
            style={{ width: "40%", marginRight: "5px" }}
          />
          <input
            type="text"
            placeholder="Custom shortcode (optional)"
            value={row.shortcode}
            onChange={(e) => handleInputChange(idx, 'shortcode', e.target.value)}
            style={{ width: "20%", marginRight: "5px" }}
          />
          <input
            type="number"
            placeholder="Validity in mins"
            value={row.validity}
            onChange={(e) => handleInputChange(idx, 'validity', e.target.value)}
            style={{ width: "10%", marginRight: "5px" }}
          />
          <button onClick={() => handleShorten(idx)}>Shorten</button>
        </div>
      ))}

      <h3>Shortened URLs</h3>
      <ul>
        {shortenedUrls.map((url, idx) => (
          <li key={idx}>
            <strong>{url.shortURL}</strong> → {url.longUrl}  
            <br />
            Expires at: {url.expiry}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShortenURL;
