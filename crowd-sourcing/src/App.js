//App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Sidebar from './components/Sidebar';

import HelpCenter from './HelpCenter'; // Make sure this path is correct
import InvestmentDetails_1 from './InvestmentDetails_1'; // Adjust the path as necessary
import TrackRecord from './TrackRecord';
import InvestmentListings from './components/InvestmentListings';
import HomePage from './HomePage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <main className="App-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/investment-details" element={<InvestmentDetails_1 />} />
            <Route path="/track-record" element={<TrackRecord />} />
            <Route path="/listings" element={<InvestmentListings minPrice={-1} maxPrice={-1} sortByRecent={false} propertyType={'none'} />} />
            {/* Other routes */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;