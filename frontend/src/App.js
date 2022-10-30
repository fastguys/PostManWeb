import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import LoginPage from './views/LoginPage';
import SignUpPage from './views/SignupPage/SignUpPage';
import HomePage from './views/HomePage';
import ChatPage from './views/ChatPage';
import ProgressPage from './views/ProgressPage';
import ProfilePage from './views/ProfilePage/ProfilePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/task-progress" element={<ProgressPage />} />
          <Route path="/chatpage" element={<ChatPage />} />
          <Route path="/profilepage" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
