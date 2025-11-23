import { io } from "socket.io-client";

// Socket object.
let socket = null;
let created = false;

/**
 * Socket creation helper.
 */
export function createSocket(auth) {
  if (socket && socket.connected)
    return socket;
  
  socket = io(window.location.origin, {
    path: "/swish/user/chat",
    transports: ["websocket", "polling"],
    autoConnect: false,
    auth
  });
  
  socket.on("connect", () => console.log("socket connected", socket.id));
  socket.on("connect_error", (err) => console.error("socket connect_error", err));
  created = true;
  
  if (!socket.connected) {
    socket.connect();
  }
  
  return socket;
}

/**
 * Return the socket object.
 */
export function getSocket() {
  return socket;
}

/**
 * Disconnect socket.
 */
export function disconnectSocket() {
  if (!socket)
    return;
  
  socket.disconnect();
  socket = null;
  created = false;
}
