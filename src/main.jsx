import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import SubscriptionsProvider from "./providers/SubscriptionsProvider.jsx";
import routes from "./router/Routes.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <SubscriptionsProvider>
                        <RouterProvider router={routes} />
                    </SubscriptionsProvider>
                </AuthProvider>
            </QueryClientProvider>
        </HelmetProvider>
    </StrictMode>
);
