import { Button } from "@/components/ui/button.jsx";
import { Link } from "react-router-dom";
import useAdmin from "../hooks/useAdmin.jsx";
import useAuth from "../hooks/useAuth.jsx";
const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();

    const links = (
        <div className="flex items-center gap-3 font-poppins">
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
            {user ? (
                <>
                    {" "}
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
                    <Link to="/login" className="hover:underline">
                        Login
                    </Link>
                    <Link to="/register" className="hover:underline">
                        Register
                    </Link>
                </>
            )}
        </div>
    );

    return (
        <nav className="p-4 border-b bg-secondary text-primary border-border">
            <div className="container flex justify-between mx-auto">
                <Link to="/" className="text-2xl font-bold font-poppins">
                    NewsSphere
                </Link>
                {links}
            </div>
        </nav>
    );
};

export default Navbar;
