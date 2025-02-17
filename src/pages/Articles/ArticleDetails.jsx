import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { Helmet } from "react-helmet-async";
import { FaFacebook, FaLinkedin, FaRegClock, FaTwitter } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
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

    const { data: author } = useQuery({
        queryKey: ["author", article?.author],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${article.author}`);
            console.log(
                "this might be the author of an article",
                res.data.email
            );
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
        // <>
        //     <Helmet>
        //         <title>Article Details - My News Platform</title>
        //     </Helmet>

        //     <div className="container px-8 py-10 mx-auto bg-white rounded-lg shadow-lg lg:px-8">
        //         <Helmet>
        //             <title>{article.title} | My News Platform</title>
        //             <meta name="description" content={article.description} />
        //         </Helmet>
        //         <h2 className="mb-6 text-3xl font-extrabold text-center text-gray-800 font-merriweather">
        //             {article.title}
        //         </h2>
        //         <div className="flex flex-col items-center mb-8">
        //             <div className="relative w-full overflow-hidden bg-gray-200 rounded-lg md:w-4/5 lg:w-3/5">
        //                 <img
        //                     src={article.imageUrl}
        //                     alt={article.title}
        //                     className="object-cover w-full rounded-lg h-80"
        //                 />
        //                 <div className="absolute bottom-0 left-0 right-0 px-4 py-2 text-sm font-medium text-white bg-black rounded-b-lg bg-opacity-60 font-poppins">
        //                     Published by: {article.publisher}
        //                 </div>
        //             </div>
        //         </div>
        //         {/* Article Description */}
        //         <div className="mx-auto prose prose-lg text-justify text-gray-700 max-w-none font-poppins md:w-4/5 lg:w-3/5">
        //             <p>{article.description}</p>
        //         </div>
        //     </div>
        // </>

        <>
            <Helmet>
                <title>{article.title} | NewsSphere</title>
                <meta name="description" content={article.description} />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.description} />
                <meta property="og:image" content={article.imageUrl} />
            </Helmet>

            <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <article className="lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-8">
                        <header className="mb-8">
                            <div className="flex items-center mb-4 text-sm text-gray-500">
                                <span className="inline-flex items-center mr-4">
                                    <FaRegClock className="mr-1" />
                                    {article?.createdAt
                                        ? format(
                                              parseISO(article.createdAt),
                                              "MMM dd, yyyy"
                                          )
                                        : "Date not available"}
                                </span>
                                <span className="mr-4">•</span>
                                <span className="font-medium">
                                    {article.category}
                                </span>
                            </div>

                            <h1 className="mb-4 text-4xl font-bold text-gray-900 font-merriweather">
                                {article.title}
                            </h1>

                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <div>
                                        <p className="font-medium text-gray-900 font-merriweather">
                                            {/* {article.author} */}
                                            {author?.email === article.author
                                                ? author.name
                                                : "Author not available"}
                                        </p>
                                        <p className="text-sm text-gray-500 font-poppins">
                                            {article.publisher}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3 text-gray-500">
                                    <Link
                                        to="/linkedin.com"
                                        className="p-2 hover:text-blue-600"
                                    >
                                        <FaLinkedin size={20} />
                                    </Link>
                                    <Link
                                        to="/twitter.com"
                                        className="p-2 hover:text-blue-600"
                                    >
                                        <FaTwitter size={20} />
                                    </Link>
                                    <Link
                                        to="/facebook.com"
                                        className="p-2 hover:text-blue-600"
                                    >
                                        <FaFacebook size={20} />
                                    </Link>
                                </div>
                            </div>
                        </header>

                        <div className="relative mb-8 overflow-hidden rounded-lg shadow-lg">
                            <img
                                src={article.imageUrl}
                                alt={article.title}
                                className="object-cover w-full h-96"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80">
                                <p className="text-sm text-white font-poppins">
                                    {article.imageCaption ||
                                        "Source: " + article.publisher}
                                </p>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none lg:prose-xl">
                            <div className="text-lg leading-relaxed text-gray-700 font-poppins">
                                {(article?.description || "")
                                    .split("\n")
                                    .map((paragraph, index) => (
                                        <p
                                            key={index}
                                            className="mb-2 text-base"
                                        >
                                            {paragraph || "\u00A0"}{" "}
                                        </p>
                                    ))}
                            </div>

                            <div className="flex flex-wrap gap-2 mt-4">
                                {article.tags?.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-2.5 uppercase py-0.5 text-sm font-medium bg-gray-700 text-gray-300 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <aside className="mt-12 lg:col-span-4 lg:mt-0 lg:pl-8">
                        <div className="p-6 bg-gray-100 border border-gray-200 rounded-lg shadow-sm">
                            <h3 className="mb-4 text-lg font-bold text-gray-900 font-merriweather">
                                Related Articles
                            </h3>
                            {article.related?.map((related) => (
                                <a
                                    key={related.id}
                                    href={`/articles/${related.id}`}
                                    className="block p-3 mb-4 transition-all border border-transparent rounded-lg group hover:bg-white hover:shadow-sm hover:border-gray-200"
                                >
                                    <p className="font-medium text-gray-900 group-hover:text-gray-800">
                                        {related.title}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {format(
                                            parseISO(related.date),
                                            "MMM dd, yyyy"
                                        )}
                                    </p>
                                </a>
                            ))}
                        </div>

                        <div className="p-6 mt-8 text-center bg-gray-100 border border-gray-200 rounded-lg">
                            <h3 className="mb-2 text-xl font-bold text-gray-900 font-merriweather">
                                Stay Informed
                            </h3>
                            <p className="mb-4 text-sm text-gray-600 font-poppins">
                                Subscribe to our daily newsletter for the latest
                                updates
                            </p>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 mb-3 border rounded-lg focus:outline-none focus:ring-0 focus:ring-gray-800 focus:border-gray-800"
                            />
                            <button className="w-full px-6 py-2 font-medium text-white transition bg-gray-900 rounded-lg hover:bg-gray-800">
                                Subscribe
                            </button>
                        </div>
                    </aside>
                </article>
            </main>
        </>
    );
};

export default ArticleDetails;
