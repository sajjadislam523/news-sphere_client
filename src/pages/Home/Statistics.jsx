import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";

const Statistics = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = {}, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const totalUsers = users.length;
    const normalUsers = users.filter((user) => !user.isPremium).length;
    const premiumUsers = users.filter((user) => user.isPremium).length;

    return (
        <div className="py-10 bg-gray-100">
            <div className="mb-8">
                <h2 className="mb-2 text-3xl font-extrabold text-center font-merriweather">
                    Statistics
                </h2>
                <p className="mb-8 text-sm text-center text-gray-600 font-merriweather">
                    Data That Matters The Most
                </p>
            </div>
            <div className="grid max-w-6xl grid-cols-1 gap-6 px-4 mx-auto sm:grid-cols-2 lg:grid-cols-3">
                {/* All Users */}
                <div className="p-6 text-center transition bg-white rounded-lg shadow-lg hover:shadow-xl">
                    <h3 className="mb-2 text-xl font-bold text-gray-700 font-merriweather">
                        All Users
                    </h3>
                    <CountUp
                        className="text-4xl font-extrabold text-indigo-600 font-poppins"
                        end={totalUsers}
                        duration={2}
                    />
                </div>

                {/* Normal Users */}
                <div className="p-6 text-center transition bg-white rounded-lg shadow-lg hover:shadow-xl">
                    <h3 className="mb-2 text-xl font-bold text-gray-700 font-merriweather">
                        Normal Users
                    </h3>
                    <CountUp
                        className="text-4xl font-extrabold text-green-600 font-poppins"
                        end={normalUsers}
                        duration={2}
                    />
                </div>

                {/* Premium Users */}
                <div className="p-6 text-center transition bg-white rounded-lg shadow-lg hover:shadow-xl">
                    <h3 className="mb-2 text-xl font-bold text-gray-700 font-merriweather">
                        Premium Users
                    </h3>
                    <CountUp
                        className="text-4xl font-extrabold text-yellow-500 font-poppins"
                        end={premiumUsers}
                        duration={2}
                    />
                </div>
            </div>
        </div>
    );
};

export default Statistics;
