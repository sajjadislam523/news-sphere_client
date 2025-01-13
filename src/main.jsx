import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import routes from "./router/Routes.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={routes} />
        </AuthProvider>
    </StrictMode>
);
