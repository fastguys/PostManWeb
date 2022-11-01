import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./stores";
import LoginPage from "./views/LoginPage";
import SignUpPage from "./views/SignupPage/SignUpPage";
import HomePage from "./views/HomePage";
import ChatPage from "./views/ChatPage";
import ProgressPage from "./views/ProgressPage";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";

function App() {
  let persistor = persistStore(store);
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
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
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
