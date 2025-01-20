import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import AllPublishers from "./AllPublishers.jsx";
import Plans from "./Plans.jsx";
import Statistics from "./Statistics.jsx";
import TrendingArticles from "./TrendingArticles.jsx";

const Home = () => {
    // Typewriter effect for the heading
    const [text] = useTypewriter({
        words: [
            "Welcome to Our News Platform!",
            "Stay Updated with Trending News",
            "Join Us for Premium Content",
        ],
        loop: true,
        typeSpeed: 60,
        deleteSpeed: 30,
        delaySpeed: 1500,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsModalOpen(true);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    const handleSubscriptionClick = () => {
        setIsModalOpen(false);
        navigate("/subscription");
    };

    return (
        <div className="container px-6 mx-auto">
            <div className="py-6 text-center">
                <h1 className="text-xl font-extrabold text-gray-800 md:text-4xl font-merriweather">
                    <span>{text}</span>
                    <Cursor cursorStyle="|" />
                </h1>
                <p className="mt-4 text-sm text-gray-600 md:text-lg font-poppins">
                    Discover the latest articles, news, and more.
                </p>
            </div>
            <TrendingArticles />
            <AllPublishers />
            <Statistics />
            <Plans />
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="max-w-sm p-6 text-center bg-white rounded-lg shadow-lg">
                        <h2 className="mb-4 text-xl font-bold font-merriweather">
                            Subscribe Now!
                        </h2>
                        <p className="mb-6 text-sm text-gray-600 font-poppins">
                            Enjoy unlimited access to premium content with our
                            subscription plan.
                        </p>
                        <button
                            onClick={handleSubscriptionClick}
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            Go to Subscription
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
