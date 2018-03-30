import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';

/**
 * Main Route for the application
 */
const MainRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  );
};

export default MainRoute;