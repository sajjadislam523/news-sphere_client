import { Button } from "@/components/ui/button.jsx";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "../../components/Loading.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";

const TrendingArticles = () => {
    const axiosSecure = useAxiosSecure();

    const { data: articles = [], isLoading } = useQuery({
        queryKey: ["trendingArticles"],
        queryFn: async () => {
            const res = await axiosSecure.get("/articles", {
                params: {
                    isApproved: true,
                },
            });
            const sortedData = res.data.articles
                .sort((a, b) => b.views - a.views)
                .slice(0, 6);
            return sortedData;
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="py-6">
            <h2 className="mb-4 text-2xl font-bold font-poppins">
                Trending Articles
            </h2>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                breakpoints={{
                    480: { slidesPerView: 1, spaceBetween: 10 },
                    768: { slidesPerView: 2, spaceBetween: 15 },
                    1024: { slidesPerView: 3, spaceBetween: 20 },
                    1440: { slidesPerView: 4, spaceBetween: 25 },
                }}
            >
                {articles.map((article) => (
                    <SwiperSlide key={article._id}>
                        <div className="flex flex-col justify-between h-full p-4 bg-white border rounded-md shadow-md">
                            <div>
                                <img
                                    src={article.imageUrl}
                                    alt={article.title}
                                    className="object-cover w-full h-40 mb-4 rounded-md"
                                />
                                <h3 className="mb-2 text-lg font-semibold font-merriweather">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-gray-600 truncate font-poppins">
                                    {article.description}
                                </p>
                            </div>
                            <div className="mt-4 text-right">
                                <Link to={`/articleDetails/${article._id}`}>
                                    <Button
                                        variant="outline"
                                        className="text-sm font-poppins hover:underline"
                                    >
                                        Details
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TrendingArticles;
