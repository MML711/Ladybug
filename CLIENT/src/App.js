import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authLevel, setAuthLevel] = useState("");

  let token = localStorage.getItem("token");

  console.log(process.env.REACT_APP_SERVERURL);
  console.log(typeof process.env.REACT_APP_SERVERURL);

  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  useEffect(() => {
    if (token == null) {
      setIsAuthenticated(false);
    }

    console.log(duration);

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("auth");
      localStorage.removeItem("bug_user");
      setAuth(false);
      setAuthLevel("");
    }, duration);
  }, [token]);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  console.log(token);

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
