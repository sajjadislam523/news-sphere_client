import CountUp from "react-countup";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const Home = () => {
    const trendingArticles = [
        {
            id: 1,
            title: "Breaking News: Tech Innovation",
            views: 1000,
            image: "/images/article1.jpg",
        },
        {
            id: 2,
            title: "Health Tips for 2025",
            views: 850,
            image: "/images/article2.jpg",
        },
        {
            id: 3,
            title: "Political Debate: What’s Next?",
            views: 700,
            image: "/images/article3.jpg",
        },
        {
            id: 4,
            title: "Global Economy Insights",
            views: 1200,
            image: "/images/article4.jpg",
        },
        {
            id: 5,
            title: "Education: The Future of Learning",
            views: 950,
            image: "/images/article5.jpg",
        },
        {
            id: 6,
            title: "Sports Highlights: Top Players",
            views: 500,
            image: "/images/article6.jpg",
        },
    ];

    // Slick slider settings
    const sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="min-h-screen bg-secondary text-primary">
            {/* Trending Articles */}
            <section className="p-6">
                <h2 className="mb-4 text-3xl font-bold font-poppins">
                    Trending Articles
                </h2>
                <Slider {...sliderSettings}>
                    {trendingArticles.map((article) => (
                        <div
                            key={article.id}
                            className="p-4 border rounded-md border-border"
                        >
                            <img
                                src={article.image}
                                alt={article.title}
                                className="object-cover w-full h-48 rounded-md"
                            />
                            <h3 className="mt-4 text-xl font-bold">
                                {article.title}
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Views: {article.views}
                            </p>
                        </div>
                    ))}
                </Slider>
            </section>

            {/* All Publishers */}
            <section className="p-6 bg-accent">
                <h2 className="mb-4 text-3xl font-bold font-poppins">
                    All Publishers
                </h2>
                <div className="grid grid-cols-3 gap-6">
                    {/* Example publishers */}
                    <div className="p-4 border rounded-md border-border">
                        <h3 className="text-xl font-bold">Publisher A</h3>
                        <p className="text-gray-600">News Articles</p>
                    </div>
                    <div className="p-4 border rounded-md border-border">
                        <h3 className="text-xl font-bold">Publisher B</h3>
                        <p className="text-gray-600">Tech News</p>
                    </div>
                    <div className="p-4 border rounded-md border-border">
                        <h3 className="text-xl font-bold">Publisher C</h3>
                        <p className="text-gray-600">World News</p>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="p-6">
                <h2 className="mb-4 text-3xl font-bold font-poppins">
                    Statistics
                </h2>
                <div className="flex space-x-6">
                    <div className="text-center">
                        <h3 className="text-xl font-bold">Users</h3>
                        <CountUp
                            start={0}
                            end={1000}
                            duration={2}
                            className="text-3xl"
                        />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold">Premium Users</h3>
                        <CountUp
                            start={0}
                            end={500}
                            duration={2}
                            className="text-3xl"
                        />
                    </div>
                </div>
            </section>

            {/* Plans Section */}
            <section className="p-6 bg-accent">
                <h2 className="mb-4 text-3xl font-bold font-poppins">Plans</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 border rounded-md border-border">
                        <h3 className="text-xl font-bold">Free Plan</h3>
                        <ul className="mt-4 list-disc list-inside">
                            <li>Access to basic news</li>
                            <li>Ads supported</li>
                        </ul>
                    </div>
                    <div className="p-4 border rounded-md border-border">
                        <h3 className="text-xl font-bold">Premium Plan</h3>
                        <ul className="mt-4 list-disc list-inside">
                            <li>No ads</li>
                            <li>Access to premium articles</li>
                            <li>Exclusive news updates</li>
                        </ul>
                        <Link
                            to="/subscription"
                            className="inline-block px-4 py-2 mt-4 rounded-md bg-primary text-secondary hover:bg-black hover:text-white"
                        >
                            Subscribe Now
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
