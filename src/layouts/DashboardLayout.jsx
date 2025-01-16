import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
    const routes = [
        { path: "/", label: "Home" },
        { path: "home", label: "Dashboard" },
        { path: "all-users", label: "All Users" },
        { path: "all-articles", label: "All Articles" },
        { path: "add-publishers", label: "Add Publishers" },
    ];

    return (
        <div className="flex min-h-screen">
            <div className="w-64 min-h-screen text-white bg-gray-800">
                <h2 className="p-4 text-lg text-center font-poppins">
                    Admin Dashboard
                </h2>
                <ul>
                    {routes.map((route, idx) => (
                        <li key={idx}>
                            <NavLink
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-md ${
                                        isActive
                                            ? "bg-gray-700"
                                            : "hover:bg-gray-700"
                                    }`
                                }
                                to={route.path}
                            >
                                {route.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
