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

    if (isLoading) return <div>Loading...</div>;

    const totalUsers = users.length;
    const normalUsers = users.filter((user) => !user.isPremium).length;
    const premiumUsers = users.filter((user) => user.isPremium).length;

    return (
        <div className="py-10 bg-gray-100 min-h-60">
            <h2 className="mb-8 text-3xl font-extrabold text-center text-gray-800">
                Statistics
            </h2>
            <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* All Users */}
                <div className="p-6 transition bg-white rounded-lg shadow-lg hover:shadow-xl">
                    <h3 className="mb-2 text-xl font-bold text-gray-700">
                        All Users
                    </h3>
                    <CountUp
                        className="text-4xl font-extrabold text-indigo-600"
                        end={totalUsers}
                        duration={2}
                    />
                </div>

                {/* Normal Users */}
                <div className="p-6 transition bg-white rounded-lg shadow-lg hover:shadow-xl">
                    <h3 className="mb-2 text-xl font-bold text-gray-700">
                        Normal Users
                    </h3>
                    <CountUp
                        className="text-4xl font-extrabold text-green-600"
                        end={normalUsers}
                        duration={2}
                    />
                </div>

                {/* Premium Users */}
                <div className="p-6 transition bg-white rounded-lg shadow-lg hover:shadow-xl">
                    <h3 className="mb-2 text-xl font-bold text-gray-700">
                        Premium Users
                    </h3>
                    <CountUp
                        className="text-4xl font-extrabold text-yellow-500"
                        end={premiumUsers}
                        duration={2}
                    />
                </div>
            </div>
        </div>
    );
};

export default Statistics;
