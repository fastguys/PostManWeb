import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Homepage from './Homepage';
import SignUp from "./SignUp";



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
