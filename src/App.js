import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Homepage from './components/Homepage';
import SignUp from "./components/SignUp";



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
