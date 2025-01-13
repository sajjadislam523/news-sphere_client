import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const MainLayout = () => {
    const location = useLocation();
    const noNavFooter =
        location.pathname.includes("/login") ||
        location.pathname.includes("/register");
    return (
        <div>
            {noNavFooter || <Navbar />}
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
