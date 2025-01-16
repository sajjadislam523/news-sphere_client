import { Cursor, useTypewriter } from "react-simple-typewriter";
import AllPublishers from "./AllPublishers.jsx";
import Plans from "./Plans.jsx";
import Statistics from "./Statistics.jsx";
import TrendingArticles from "./TrendingArticles.jsx";

const Home = () => {
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
        </div>
    );
};

export default Home;
