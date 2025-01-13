import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [],
    },
]);

export default routes;
