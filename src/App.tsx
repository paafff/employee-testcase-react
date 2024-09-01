import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Biodata from './pages/Biodata';
import ListUsers from './pages/ListUsers';
import DetailUser from './pages/DetailUser';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div>
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/auth" className="text-white hover:text-gray-300">
                Authentication
              </Link>
            </li>
            {/* <li>
              <Link to="/biodata" className="text-white hover:text-gray-300">
                Biodata
              </Link>
            </li> */}
            <li>
              <Link to="/list-users" className="text-white hover:text-gray-300">
                List User
              </Link>
            </li>
          </ul>
          <button
            onClick={toggleTheme}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Toggle Theme
          </button>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/biodata" element={<Biodata />} />
        <Route path="/list-users" element={<ListUsers />} />
        <Route path="/detail-user/:id" element={<DetailUser />} />
      </Routes>
    </div>
  );
};

export default App;
