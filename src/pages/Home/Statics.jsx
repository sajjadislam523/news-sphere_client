import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";

const Statistics = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ["statistics"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users/statistics");
            return res.data;
        },
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="py-6">
            <h2 className="mb-4 text-2xl font-bold">Statistics</h2>
            <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                    <h3 className="text-lg font-semibold">All Users</h3>
                    <CountUp end={stats.totalUsers} duration={2} />
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-semibold">Normal Users</h3>
                    <CountUp end={stats.normalUsers} duration={2} />
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-semibold">Premium Users</h3>
                    <CountUp end={stats.premiumUsers} duration={2} />
                </div>
            </div>
        </div>
    );
};

export default Statistics;
