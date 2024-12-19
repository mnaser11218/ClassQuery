import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(() => {
    const storedUser = localStorage.getItem('currentLoggedInUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (currentLoggedInUser) {
      localStorage.setItem('currentLoggedInUser', JSON.stringify(currentLoggedInUser));
    } else {
      localStorage.removeItem('currentLoggedInUser');
    }
  }, [currentLoggedInUser]);

  return (
    <UserContext.Provider value={{ currentLoggedInUser, setCurrentLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);