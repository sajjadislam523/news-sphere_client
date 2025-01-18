import { useQuery } from "@tanstack/react-query";
import ArticleCard from "../../components/ArticleCard.jsx";
import Loading from "../../components/Loading.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import useSubscription from "../../hooks/useSubscription.jsx";

const PremiumArticles = () => {
    const axiosSecure = useAxiosSecure();
    const subscriptionStatus = useSubscription();

    const {
        data: articles = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const res = await axiosSecure.get("/articles");
            console.log("All articles:", res.data);
            return res.data.articles;
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <p>Failed to load articles: {error.message}</p>;
    }

    // Filter premium articles client-side
    const premiumArticles = articles.filter((article) => article.isPremium);

    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold text-center font-merriweather">
                Premium Articles
            </h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {premiumArticles.length === 0 ? (
                    <p>No premium articles available.</p>
                ) : (
                    premiumArticles.map((article) => (
                        <ArticleCard
                            key={article._id}
                            article={article}
                            subscriptionStatus={subscriptionStatus}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default PremiumArticles;
