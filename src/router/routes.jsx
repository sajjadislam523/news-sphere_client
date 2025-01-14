import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import AddArticle from "../pages/Articles/AddArticle.jsx";
import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";
import Home from "../pages/Home/Home.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

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
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/addArticles",
                element: (
                    <PrivateRoute>
                        <AddArticle />
                    </PrivateRoute>
                ),
            },
            {
                path: "*",
                element: <div>404 Not Found</div>,
            },
        ],
    },
]);

export default routes;
