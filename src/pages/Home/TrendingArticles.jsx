import { useQuery } from "@tanstack/react-query";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ArticleCard from "../../components/ArticleCard.jsx";
import Loading from "../../components/Loading.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import useSubscription from "../../hooks/useSubscription.jsx";

const TrendingArticles = () => {
    const axiosSecure = useAxiosSecure();
    const subscriptionStatus = useSubscription();

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
            <h2 className="my-4 text-2xl font-bold text-center font-merriweather">
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
                    <SwiperSlide
                        key={article._id}
                        className="flex items-center justify-center"
                    >
                        <div className="w-[400px] h-[450px]">
                            <ArticleCard
                                article={article}
                                subscriptionStatus={subscriptionStatus}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TrendingArticles;
