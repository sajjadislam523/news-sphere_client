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
            <div className="mb-8">
                <h2 className="mb-2 text-2xl font-bold text-center font-merriweather">
                    All Publishers
                </h2>
                <p className="font-medium text-center text-gray-600 font-merriweather">
                    See all the renowned news publishers across the globe.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {publishers.map((publisher) => (
                    <div
                        key={publisher._id}
                        className="p-6 text-center transition-shadow duration-300 bg-white border rounded-lg shadow-lg hover:shadow-xl"
                    >
                        <img
                            src={publisher.logo}
                            alt={publisher.name}
                            className="object-cover w-20 h-20 mx-auto mb-4 rounded-full"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 font-poppins">
                            {publisher.name}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllPublishers;
