import React, { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // Dummy user for MVP
  const [user, setUser] = useState({
    id: "mvp-user",
    email: "guest@example.com",
    name: "Guest Explorer",
    full_name: "Guest Explorer",
    quiz_completed: true,
    personalityTag: "Adventurer"
  });
  const [token, setToken] = useState("mvp-token");

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loading: false,
        login: async () => ({ user: { id: "mvp-user" }, token: "mvp-token" }),
        signup: async () => ({ user: { id: "mvp-user" }, token: "mvp-token" }),
        logout: () => {
          console.log("Logout called (MVP mode)");
        },
        refreshUser: () => {},
        loginWithGoogle: async () => ({ user: { id: "mvp-user" }, token: "mvp-token" }),
        setUser,
        setPersonality: () => {},
        updatePreferences: () => {},
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);