import { Button } from "@/components/ui/button.jsx";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAdmin from "../hooks/useAdmin.jsx";
import useAuth from "../hooks/useAuth.jsx";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const links = (
        <>
            <Link to="/" className="hover:underline">
                Home
            </Link>
            <Link to="/addArticles" className="hover:underline">
                Add Articles
            </Link>
            <Link to="/allArticles" className="hover:underline">
                All Articles
            </Link>
            <Link to="/subscription" className="hover:underline">
                Subscription
            </Link>
            {user && isAdmin ? (
                <Link to="/dashboard/home" className="hover:underline">
                    Dashboard
                </Link>
            ) : null}
            <Link to="/myArticles" className="hover:underline">
                My Articles
            </Link>
            <Link to="/premiumArticles" className="hover:underline">
                Premium Articles
            </Link>
        </>
    );

    const handleMenuToggle = () => {
        setIsMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        if (isMenuOpen) {
            // GSAP animation for opening
            gsap.fromTo(
                menuRef.current,
                { opacity: 0, y: -20, display: "none" },
                {
                    opacity: 1,
                    y: 0,
                    display: "block",
                    duration: 0.5,
                    ease: "power3.out",
                }
            );
        } else {
            // GSAP animation for closing
            gsap.to(menuRef.current, {
                opacity: 0,
                y: -20,
                display: "none",
                duration: 0.5,
                ease: "power3.in",
            });
        }
    }, [isMenuOpen]);

    return (
        <nav className="sticky top-0 z-50 p-4 border-b shadow-lg bg-secondary text-primary border-border">
            <div className="container flex items-center justify-between mx-auto">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold font-poppins">
                    NewsSphere
                </Link>

                {/* Hamburger Button */}
                <button
                    className="text-2xl lg:hidden"
                    onClick={handleMenuToggle}
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Desktop Links */}
                <div className="items-center hidden gap-6 lg:flex font-poppins">
                    {links}
                    {user ? (
                        <>
                            <Link to="/profile">
                                <div className="w-10 h-10">
                                    <img
                                        src={user.photoURL}
                                        className="object-cover w-full h-full rounded-full"
                                        alt={user?.displayName}
                                    />
                                </div>
                            </Link>
                            <Button
                                className="transition-all duration-300 ease-in-out rounded-full hover:bg-black hover:text-white"
                                variant="outline"
                                onClick={logOut}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button
                                    className="transition-all duration-300 ease-in-out rounded-full hover:bg-black hover:text-white"
                                    variant="outline"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button className="transition-all duration-300 ease-in-out rounded-full hover:bg-white hover:text-black">
                                    Register
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                ref={menuRef}
                className="absolute left-0 right-0 z-40 hidden gap-6 p-6 top-16 bg-secondary md:flex md:flex-col md:items-center font-poppins lg:hidden"
            >
                <div className="flex flex-col items-center gap-3">
                    {links}
                    {user ? (
                        <>
                            <Link to="/profile">
                                <div className="w-16 h-16">
                                    <img
                                        src={user.photoURL}
                                        className="object-cover w-full h-full rounded-full"
                                        alt={user?.displayName}
                                    />
                                </div>
                            </Link>
                            <Button
                                className="transition-all duration-300 ease-in-out rounded-full hover:bg-black hover:text-white"
                                variant="outline"
                                onClick={logOut}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:underline">
                                Login
                            </Link>
                            <Link to="/register" className="hover:underline">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
