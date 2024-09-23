// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import MyFlight from './pages/MyFlight';

function App() {
  return (
    <Router>
      <div className="bg-zinc-100 py-5 mx- ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myflight" element={<MyFlight />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
