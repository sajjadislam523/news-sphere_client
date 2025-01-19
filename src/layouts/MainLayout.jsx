import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

const MainLayout = () => {
    const location = useLocation();
    const noNavFooter =
        location.pathname.includes("/login") ||
        location.pathname.includes("/register");
    return (
        <div>
            {noNavFooter || <Navbar />}
            <div className="min-h-screen">
                <Outlet />
            </div>
            {noNavFooter || <Footer />}
        </div>
    );
};

export default MainLayout;
