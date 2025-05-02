import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TestInterface from './components/TestInterface';
import Results from './components/Results';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test" element={<TestInterface />} />
        <Route path="/results" element={<Results />} />
        <Route path="/" element={<Home />} /> {/* Example for the root path */}
      </Routes>
    </BrowserRouter>
  );
}

// Example Home component - you can replace this with your actual homepage
function Home() {
  return (
    <div>
      <h1>Welcome to the Online Test Portal</h1>
      <p>Use the navigation above to get started.</p>
    </div>
  );
}

export default App;