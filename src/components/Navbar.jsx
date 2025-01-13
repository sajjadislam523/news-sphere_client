const Navbar = () => {
    return (
        <nav className="p-4 border-b bg-secondary text-primary border-border">
            <div className="container flex justify-between mx-auto">
                <a href="/" className="text-2xl font-bold font-poppins">
                    NewsSphere
                </a>
                <div className="space-x-4">
                    <a href="/" className="hover:underline">
                        Home
                    </a>
                    <a href="/login" className="hover:underline">
                        Login
                    </a>
                    <a href="/register" className="hover:underline">
                        Register
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
