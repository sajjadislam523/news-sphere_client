import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";

const ArticleDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const {
        data: article,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["article", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/articles/${id}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Helmet>
                <title>Article Details - My News Platform</title>
            </Helmet>

            <div className="container px-8 py-10 mx-auto bg-white rounded-lg shadow-lg lg:px-8">
                <Helmet>
                    <title>{article.title} | My News Platform</title>
                    <meta name="description" content={article.description} />
                </Helmet>
                <h2 className="mb-6 text-3xl font-extrabold text-center text-gray-800 font-merriweather">
                    {article.title}
                </h2>
                <div className="flex flex-col items-center mb-8">
                    <div className="relative w-full overflow-hidden bg-gray-200 rounded-lg md:w-4/5 lg:w-3/5">
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="object-cover w-full rounded-lg h-80"
                        />
                        <div className="absolute bottom-0 left-0 right-0 px-4 py-2 text-sm font-medium text-white bg-black rounded-b-lg bg-opacity-60 font-poppins">
                            Published by: {article.publisher}
                        </div>
                    </div>
                </div>
                {/* Article Description */}
                <div className="mx-auto prose prose-lg text-justify text-gray-700 max-w-none font-poppins md:w-4/5 lg:w-3/5">
                    <p>{article.description}</p>
                </div>
            </div>
        </>
    );
};

export default ArticleDetails;
