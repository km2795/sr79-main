import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SocketProvider } from "./contexts/socket/SocketProvider";
import { DataProvider } from "./contexts/data_master/DataProvider";

createRoot(
  document.getElementById("root")
).render(
  <SocketProvider>
    <DataProvider>
      <App />
    </DataProvider>
  </SocketProvider>
);
