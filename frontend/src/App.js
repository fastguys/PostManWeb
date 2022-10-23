import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import LoginPage from './LoginPage';
import SignUpPage from "./SignupPage/SignUpPage";
import HomePage from "./Homepage";

import "./App.css";


function App() {
  return (
    <div className="App">
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
