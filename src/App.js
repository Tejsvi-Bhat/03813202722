import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ShortenURL from './pages/ShortenURL';
import StatisticsPage from './pages/StatisticsPage';

function App() {
  return (
    <Router>
      <div className="shorten-wrapper">
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/">Shorten URLs</Link> | <Link to="/stats">Statistics</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ShortenURL />} />
          <Route path="/stats" element={<StatisticsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
