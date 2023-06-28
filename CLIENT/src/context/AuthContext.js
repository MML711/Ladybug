import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();

// This is the wrapper for the app that houses the context
export function AuthProvider({ children }) {
  const [userValue, setUserValue] = useState(
    JSON.parse(localStorage.getItem("bug_user")) || null
  );

  const setValues = (first, last, pic) => {
    setUserValue({
      first_name: first,
      last_name: last,
      profile_picture: pic,
    });
  };

  useEffect(() => {
    localStorage.setItem("bug_user", JSON.stringify(userValue));
  }, [userValue]);

  return (
    <AuthContext.Provider value={{ userValue, setValues }}>
      {children}
    </AuthContext.Provider>
  );
}
