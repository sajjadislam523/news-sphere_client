import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/Home/Home.jsx";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/news",
                element: <div>News</div>,
            },
            {
                path: "/about",
                element: <div>About</div>,
            },
            {
                path: "*",
                element: <div>404 Not Found</div>,
            },
        ],
    },
]);

export default routes;
