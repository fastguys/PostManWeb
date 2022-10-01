import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import LoginPage from './LoginPage';
import SignUpPage from "./SignupPage/SignUpPage";



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
