import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import BMI from './BMI';
import Timer from './Timer';

export default function App(){
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 16, fontFamily: 'system-ui, Arial' }}>
      <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 16 }}>
        <h1 style={{ margin:0 }}>Fitness Web</h1>
        <nav style={{ display:'flex', gap:12 }}>
          <Link to="/">Home</Link>
          <Link to="/bmi">BMI</Link>
          <Link to="/timer">Timer</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<div><h2>Welcome</h2><p>Web client for BMI & Interval Timer.</p></div>} />
        <Route path="/bmi" element={<BMI />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
    </div>
  );
}
