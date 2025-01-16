import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import Loading from "../../components/Loading.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";

const TrendingArticles = () => {
    const axiosSecure = useAxiosSecure();

    const { data: articles = [], isLoading } = useQuery({
        queryKey: ["trendingArticles"],
        queryFn: async () => {
            const res = await axiosSecure.get("/articles");
            const sortedData = res.data.articles
                .sort((a, b) => b.views - a.views)
                .slice(0, 6);
            console.log(sortedData);
            return sortedData;
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    return (
        <div className="py-6">
            <h2 className="mb-4 text-2xl font-bold">Trending Articles</h2>
            <Slider {...sliderSettings}>
                {articles.map((article) => (
                    <div key={article._id} className="p-4">
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="mb-2 rounded-md"
                        />
                        <h3 className="text-lg font-semibold">
                            {article.title}
                        </h3>
                        <p>{article.summary}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default TrendingArticles;
