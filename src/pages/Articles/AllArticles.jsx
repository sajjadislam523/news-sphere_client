import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";

const AllArticles = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [publisherFilter, setPublisherFilter] = useState("");
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const isSubscribed = false;

    const { data: articlesData, isLoading: articlesLoading } = useQuery({
        queryKey: ["articles", page, limit, publisherFilter, searchQuery],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(
                    `/articles?page=${page}&limit=${limit}&isApproved=true&publisher=${publisherFilter}&title=${searchQuery}`
                );
                return response.data.articles;
            } catch (error) {
                console.error("Failed to fetch articles:", error);
                throw error;
            }
        },
    });

    const { data: publishers, isLoading: publishersLoading } = useQuery({
        queryKey: ["publishers"],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get("/publishers");
                return response.data;
            } catch (error) {
                console.error("Failed to fetch publishers:", error);
                throw error;
            }
        },
    });

    const articles = articlesData || [];
    const total = articlesData?.total || 0;

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setPage(1);
    };

    const handleFilterChange = (e) => {
        setPublisherFilter(e.target.value);
        setPage(1);
    };

    return (
        <div className="container px-4 py-6 mx-auto">
            <h1 className="mb-6 text-3xl font-bold text-center font-merriweather">
                All Articles
            </h1>

            <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
                <input
                    type="text"
                    placeholder="Search articles by title"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full px-4 py-2 border rounded-md shadow-sm md:w-1/2"
                />
                <select
                    value={publisherFilter}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 border rounded-md shadow-sm md:w-1/4"
                >
                    <option value="">All Publishers</option>
                    {publishersLoading ? (
                        <option>Loading...</option>
                    ) : (
                        publishers?.map((publisher) => (
                            <option key={publisher._id} value={publisher.name}>
                                {publisher.name}
                            </option>
                        ))
                    )}
                </select>
            </div>

            {articlesLoading ? (
                <div className="text-center">Loading articles...</div>
            ) : articles.length === 0 ? (
                <div className="text-center text-gray-500">
                    No articles found.
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <div
                            key={article._id}
                            className={`p-4 border rounded-md shadow-sm ${
                                article.isPremium
                                    ? "border-yellow-400 bg-yellow-50"
                                    : "border-gray-300"
                            }`}
                        >
                            <img
                                src={article.imageUrl}
                                alt={article.title}
                                className="object-cover w-full h-40 mb-4 rounded-md"
                            />
                            <h3 className="mb-2 text-lg font-bold font-merriweather">
                                {article.title}
                            </h3>
                            <p className="mb-4 text-sm text-gray-600">
                                {article.description.slice(0, 100)}...
                            </p>
                            <p className="mb-4 text-xs text-gray-500">
                                Publisher: {article.publisher}
                            </p>
                            <Button
                                variant="outline"
                                className={`w-full ${
                                    article.isPremium && !isSubscribed
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                                onClick={() =>
                                    !article.isPremium || isSubscribed
                                        ? navigate(
                                              `/articleDetails/${article._id}`
                                          )
                                        : null
                                }
                                disabled={article.isPremium && !isSubscribed}
                            >
                                {article.isPremium && !isSubscribed
                                    ? "Subscribe to View"
                                    : "Details"}
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-6">
                <Button
                    variant="outline"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </Button>
                <span className="text-sm font-medium text-gray-600">
                    Page {page} of {Math.ceil(total / limit)}
                </span>
                <Button
                    variant="outline"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page === Math.ceil(total / limit)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default AllArticles;
