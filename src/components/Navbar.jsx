import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
const Navbar = () => {
    const { user } = useAuth();

    const links = (
        <div className="space-x-4">
            <Link to="/" className="hover:underline">
                Home
            </Link>
            <Link to="/" className="hover:underline">
                Add Articles
            </Link>
            <Link to="/" className="hover:underline">
                All Articles
            </Link>
            <Link to="/" className="hover:underline">
                Subscription
            </Link>
            {user.isAdmin ? (
                <Link to="/" className="hover:underline">
                    Dashboard
                </Link>
            ) : null}

            <Link to="/" className="hover:underline">
                My Articles
            </Link>
            <Link to="/" className="hover:underline">
                Premium Articles
            </Link>
            {user ? (
                <div className="w-10 rounded-full">
                    <img src={user.photoURL} alt={user?.displayName} />
                </div>
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
