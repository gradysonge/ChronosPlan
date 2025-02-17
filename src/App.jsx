import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar/Calendar';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<div>Dashboard</div>} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/professors" element={<div>Professeurs</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;