import React, { createContext, useContext, useState } from "react";

const DataMasterContext = createContext({
  chatHistory: [],
  setChatHistory: () => { }
});

export function DataProvider({ children }) {
  const [chatHistory, setChatHistory] = useState([]);
  
  return (
    <DataMasterContext.Provider value={{ chatHistory, setChatHistory }}>
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
