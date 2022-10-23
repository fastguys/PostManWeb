import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import LoginPage from './views/LoginPage';
import SignUpPage from "./views/SignupPage/SignUpPage";
import HomePage from "./views/Homepage";
import ChatPage from "./views/ChatPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/chatpage" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
