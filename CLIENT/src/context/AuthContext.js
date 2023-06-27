/* 
This file is not currently in use, but might be implemented for a 
more global access to auth states
*/

import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();

//call this to access any auth context values
// export function useAuth() {
//   return useContext(AuthContext);
// }

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
    console.log(userValue);
  }, [userValue]);

  /* // TODO: FIND A BETTER WAY
  useEffect(() => {
    if (userValue) {
      setUserValue(null);

      localStorage.removeItem("token");
      localStorage.removeItem("auth");
    }
  }, []); */

  return (
    <AuthContext.Provider value={{ userValue, setValues }}>
      {children}
    </AuthContext.Provider>
  );
}
