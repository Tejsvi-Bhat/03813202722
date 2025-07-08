import React, { useEffect, useState } from 'react';
import './ShortenURL.css'; // reuse same styling

const StatisticsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('shortenedUrls');
    if (saved) {
      const parsed = JSON.parse(saved);
      const enriched = parsed.map((item) => ({
        ...item,
        clicks: Math.floor(Math.random() * 10), // simulate click count
        clicksData: [
          {
            time: new Date().toISOString(),
            source: 'direct',
            location: 'Delhi, India',
          },
        ],
      }));
      setData(enriched);
    }
  }, []);

  return (
    <div className="shorten-wrapper">
      <h2>Shortened URL Statistics</h2>
      {data.length === 0 ? (
        <p>No shortened URLs found.</p>
      ) : (
        <ul>
          {data.map((item, i) => (
            <li key={i} style={{ marginBottom: '12px' }}>
              <strong>{item.shortURL}</strong> → {item.longUrl}
              <br />
              Created At: {new Date(Date.now() - item.validity * 60000).toISOString()}
              <br />
              Expires At: {item.expiry}
              <br />
              Total Clicks: {item.clicks}
              <br />
              Click Details:
              <ul>
                {item.clicksData.map((click, j) => (
                  <li key={j}>
                    Time: {click.time} | Source: {click.source} | Location: {click.location}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatisticsPage;
