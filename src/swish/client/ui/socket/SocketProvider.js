import React, { createContext, useContext, useState } from "react";

/**
 * Global socket context for the whole application.
 */
const SocketContext = createContext({
  socket: null,
  setSocket: () => { }
});

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  // Initially 'null' would be provided, to avoid,
  // creating multiple connections.
  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
}

/**
 * Helper function for retreiving the socket.
 */
export function useSocket() {
  return useContext(SocketContext).socket;
}

/**
 * Helper function for updating the socket object.
 */
export function useSetSocket() {
  return useContext(SocketContext).setSocket;
}
