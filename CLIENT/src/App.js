import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authLevel, setAuthLevel] = useState("");

  let token = localStorage.getItem("token");

  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  useEffect(() => {
    if (token == null) {
      setIsAuthenticated(false);
    }

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("auth");
      localStorage.removeItem("bug_user");
      setAuth(false);
      setAuthLevel("");
    }, duration);
  }, [token, duration]);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/auth/*"
          element={
            !isAuthenticated && (
              <AuthLayout setAuth={setAuth} setAuthLevel={setAuthLevel} />
            )
          }
        />

        <Route
          exact
          path="/*"
          element={
            isAuthenticated && token !== null ? (
              <AdminLayout
                // {...props}
                setAuth={setAuth}
                authLevel={authLevel}
                setAuthLevel={setAuthLevel}
              />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />

        <Route path="*" element={<h1>404 No page found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
