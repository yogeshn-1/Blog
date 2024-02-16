import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/AuthLayout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route
              path="/login"
              element={
                <AuthLayout authentication={false}>
                  <Login />
                </AuthLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthLayout authentication={false}>
                  <Signup />
                </AuthLayout>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
