import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
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

            {/* Headline-style scrolling */}
            <Marquee gradient={false} speed={50} className="py-4 bg-secondary">
                {publishers.map((publisher) => (
                    <div
                        key={publisher._id}
                        className="flex items-center justify-center gap-3 px-6 py-2 mx-4 text-center transition-shadow duration-300 bg-white border rounded-lg shadow-lg hover:shadow-xl"
                    >
                        <img
                            src={publisher.logo}
                            alt={publisher.name}
                            className="object-cover w-10 h-10 mx-auto mb-2 rounded-full"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 font-poppins">
                            {publisher.name}
                        </h3>
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default AllPublishers;
