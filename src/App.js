import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import LoginPage from './LoginPage';
import SignUpPage from "./SignupPage/SignUpPage";
import HomePage from "./Homepage";



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
