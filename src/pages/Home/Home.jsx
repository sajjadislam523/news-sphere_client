import AllPublishers from "./AllPublishers.jsx";
import Plans from "./Plans.jsx";
import Statistics from "./Statistics.jsx";
import TrendingArticles from "./TrendingArticles.jsx";

const Home = () => {
    return (
        <div className="container px-6 mx-auto">
            <TrendingArticles />
            <AllPublishers />
            <Statistics />
            <Plans />
        </div>
    );
};

export default Home;
