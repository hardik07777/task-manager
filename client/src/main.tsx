import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <AuthProvider>
<Toaster
    position="top-center"
  containerStyle={{
    top: 15,
  }}
  toastOptions={{
    duration: 3000,

    style: {
      background: "#111827",
      color: "#ffffff",
      borderRadius: "12px",
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow:
        "0 12px 32px rgba(0,0,0,0.25)",
    },

    success: {
      iconTheme: {
        primary: "#22c55e",
        secondary: "#111827",
      },
    },

    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "#111827",
      },
    },
  }}
/>
  <App />
</AuthProvider>
);