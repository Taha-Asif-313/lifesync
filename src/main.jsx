import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { TodoProvider } from "./context/todoContext.jsx";
import { AuthProvider } from "./context/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <TodoProvider>
        <div className="w-full min-h-screen">
          <App />
        </div>
      </TodoProvider>
    </AuthProvider>
  </React.StrictMode>
);
