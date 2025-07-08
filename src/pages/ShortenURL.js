// src/pages/ShortenURL.js
import './ShortenURL.css';
import React, { useState, useEffect } from 'react';
import { logEvent } from '../utils/logger';

const ShortenURL = () => {
  const [urlInputs, setUrlInputs] = useState(
    Array(5).fill({ longUrl: '', shortcode: '', validity: 30 })
  );
  const [shortenedList, setShortenedList] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('shortenedUrls');
    if (saved) setShortenedList(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('shortenedUrls', JSON.stringify(shortenedList));
  }, [shortenedList]);

  const handleChange = (index, field, value) => {
    const updated = [...urlInputs];
    updated[index] = { ...updated[index], [field]: value };
    setUrlInputs(updated);
  };

  const getRandomCode = () => Math.random().toString(36).substring(2, 8);
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  const isValidCode = (code) => /^[a-zA-Z0-9]{1,10}$/.test(code);

  const shortenURL = (index) => {
    const { longUrl, shortcode, validity } = urlInputs[index];
    if (!isValidUrl(longUrl)) {
      alert("Please enter a valid URL.");
      return;
    }
    if (shortcode && !isValidCode(shortcode)) {
      alert("Shortcode must be alphanumeric (max 10 chars).");
      return;
    }
    const mins = parseInt(validity);
    if (isNaN(mins) || mins <= 0) {
      alert("Validity must be a positive number.");
      return;
    }

    const code = shortcode || getRandomCode();
    const expiryTime = new Date(Date.now() + mins * 60 * 1000);
    const shortLink = `http://localhost:3000/${code}`;

    const newEntry = {
      longUrl,
      shortcode: code,
      validity: mins,
      expiry: expiryTime.toISOString(),
      shortURL: shortLink,
    };

    setShortenedList([...shortenedList, newEntry]);
    logEvent("frontend", "info", "component", `Shortened: ${shortLink}`);
  };

  return (
    <div className="shorten-wrapper">
      <h2>URL Shortener (Max 5)</h2>

      {urlInputs.map((item, i) => (
        <div key={i} className="input-row">
          <input
            type="text"
            placeholder="Enter full URL"
            value={item.longUrl}
            onChange={(e) => handleChange(i, 'longUrl', e.target.value)}
          />
          <input
            type="text"
            placeholder="Custom code (optional)"
            value={item.shortcode}
            onChange={(e) => handleChange(i, 'shortcode', e.target.value)}
          />
          <input
            type="number"
            placeholder="Validity (mins)"
            value={item.validity}
            onChange={(e) => handleChange(i, 'validity', e.target.value)}
          />
          <button onClick={() => shortenURL(i)}>Shorten</button>
        </div>
      ))}

      {shortenedList.length > 0 && (
        <>
          <h3>Shortened URLs</h3>
          <ul>
            {shortenedList.map((item, i) => (
              <li key={i}>
                <strong>{item.shortURL}</strong> → {item.longUrl}
                <br />
                Expires at: {item.expiry}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ShortenURL;
