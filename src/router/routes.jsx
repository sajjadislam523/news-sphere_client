import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import AddPublishers from "../pages/Admin/AddPublishers.jsx";
import AllUsers from "../pages/Admin/AllUsers.jsx";
import Articles from "../pages/Admin/Articles.jsx";
import Dashboard from "../pages/Admin/Dashboard.jsx";
import AddArticle from "../pages/Articles/AddArticle.jsx";
import AllArticles from "../pages/Articles/AllArticles.jsx";
import ArticleDetails from "../pages/Articles/ArticleDetails.jsx";
import MyArticles from "../pages/Articles/MyArticles.jsx";
import PremiumArticles from "../pages/Articles/PremiumArticles.jsx";
import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";
import Home from "../pages/Home/Home.jsx";
import Payment from "../pages/Subscription/Payment.jsx";
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
                path: "/allArticles",
                element: <AllArticles />,
            },
            {
                path: "/subscription",
                element: (
                    <PrivateRoute>
                        <Payment />,
                    </PrivateRoute>
                ),
            },
            {
                path: "/myArticles",
                element: (
                    <PrivateRoute>
                        <MyArticles />,
                    </PrivateRoute>
                ),
            },
            {
                path: "/premiumArticles",
                element: (
                    <PrivateRoute>
                        <PremiumArticles />,
                    </PrivateRoute>
                ),
            },
            {
                path: "/articleDetails/:id",
                element: (
                    <PrivateRoute>
                        <ArticleDetails />
                    </PrivateRoute>
                ),
            },
            {
                path: "*",
                element: <div>404 Not Found</div>,
            },
        ],
    },
    {
        path: "dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                path: "home",
                element: <Dashboard />,
            },
            {
                path: "all-users",
                element: <AllUsers />,
            },
            {
                path: "all-articles",
                element: <Articles />,
            },
            {
                path: "add-publishers",
                element: <AddPublishers />,
            },
        ],
    },
]);

export default routes;
