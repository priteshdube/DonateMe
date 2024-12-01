import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "./context";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Sepolia } from "@thirdweb-dev/chains";

const clientId = "6ff3fb0b2e948a7376ca93fdfbe3d44a";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider 
      activeChain={Sepolia} 
      clientId={clientId}
    > 
      <Router>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);