import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";

const AllPublishers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: publishers = [], isLoading } = useQuery({
        queryKey: ["publishers"],
        queryFn: async () => {
            const res = await axiosSecure.get("/publishers");
            return res.data;
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="py-6">
            <h2 className="mb-4 text-2xl font-bold">All Publishers</h2>
            <div className="grid grid-cols-3 gap-4">
                {publishers.map((publisher) => (
                    <div
                        key={publisher._id}
                        className="p-4 text-center border rounded-md shadow-sm"
                    >
                        <img
                            src={publisher.logo}
                            alt={publisher.name}
                            className="w-24 h-24 mx-auto mb-4"
                        />
                        <h3 className="text-lg font-semibold">
                            {publisher.name}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllPublishers;
