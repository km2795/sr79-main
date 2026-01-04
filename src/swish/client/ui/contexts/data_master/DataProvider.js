import React, { createContext, useContext, useState } from "react";

const DataMasterContext = createContext({
  chatHistory: [],
  setChatHistory: () => {},
  authCredentials: { id: "", password: "" },
  setAuthCredentials: () => {},
  userName: "",
  setUserName: () => {},
  currentRecipeint: "",
  setCurrentRecipient: () => {}
});

export function DataProvider({ children }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [authCredentials, setAuthCredentials] = useState(null);
  const [userName, setUserName] = useState("");
  const [currentRecipient, setCurrentRecipient] = useState("");
  
  return (
    <DataMasterContext.Provider value={{ 
      chatHistory,
      authCredentials,
      userName,
      currentRecipient,
      setChatHistory,
      setAuthCredentials,
      setUserName,
      setCurrentRecipient
    }}>

      {children}

    </DataMasterContext.Provider>
  );
}

export function useChatHistory() {
  return useContext(DataMasterContext).chatHistory;
}

export function useSetChatHistory() {
  return useContext(DataMasterContext).setChatHistory;
}

export function useAuthCredentials() {
  return useContext(DataMasterContext).authCredentials;
}

export function useSetAuthCredentials() {
  return useContext(DataMasterContext).setAuthCredentials;
}

export function useUserName() {
  return useContext(DataMasterContext).userName;
}

export function useSetUserName() {
  return useContext(DataMasterContext).setUserName;
}

export function useCurrentRecipient() {
  return useContext(DataMasterContext).currentRecipient;
}

export function useSetCurrentRecipient() {
  return useContext(DataMasterContext).setCurrentRecipient;
}
