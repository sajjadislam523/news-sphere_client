import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/Loading.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";

const Dashboard = () => {
    const [publicationsData, setPublicationsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axiosSecure.get("/articles");
                const articles = response.data.articles;
                console.log(articles);

                const publishers = articles.reduce((acc, article) => {
                    acc[article.publisher] = (acc[article.publisher] || 0) + 1;
                    return acc;
                }, {});

                const publicationsArray = Object.entries(publishers).map(
                    ([name, count]) => ({ name, articles: count })
                );

                setPublicationsData(publicationsArray);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching articles:", error);
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, [axiosSecure]);

    if (isLoading) {
        return <Loading />;
    }

    if (publicationsData.length === 0) {
        return <div>No articles available.</div>;
    }

    // Calculate total articles and pie chart data
    const totalArticles = publicationsData.reduce(
        (sum, pub) => sum + pub.articles,
        0
    );

    const pieChartData = [
        ["Publisher", "Percentage"],
        ...publicationsData.map((pub) => [
            pub.name,
            (pub.articles / totalArticles) * 100,
        ]),
    ];

    // Static Line Chart data (example)
    const lineChartData = [
        ["Month", "Views"],
        ["January", 1000],
        ["February", 1170],
        ["March", 660],
        ["April", 1030],
    ];

    // Static Bar Chart data (example)
    const barChartData = [
        ["Year", "Articles Published"],
        ["2020", 30],
        ["2021", 40],
        ["2022", 50],
        ["2023", 70],
    ];

    return (
        <>
            <Helmet>
                <title>NewsSphere Admin Dashboard</title>
            </Helmet>
            <div className="max-w-6xl p-6 mx-auto">
                <h1 className="mb-6 text-3xl font-bold text-center">
                    Admin Dashboard
                </h1>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Dynamic Pie Chart */}
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <h2 className="mb-4 text-xl font-bold text-center">
                            Articles by Publisher (%)
                        </h2>
                        <Chart
                            chartType="PieChart"
                            width="100%"
                            height="300px"
                            data={pieChartData}
                            options={{
                                title: "Articles Distribution",
                                pieHole: 0.4,
                                is3D: true,
                            }}
                        />
                    </div>

                    {/* Static Line Chart */}
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <h2 className="mb-4 text-xl font-bold text-center">
                            Monthly Views
                        </h2>
                        <Chart
                            chartType="LineChart"
                            width="100%"
                            height="300px"
                            data={lineChartData}
                            options={{
                                title: "Views Over Months",
                                hAxis: { title: "Month" },
                                vAxis: { title: "Views" },
                                legend: { position: "bottom" },
                            }}
                        />
                    </div>
                </div>

                {/* Static Bar Chart */}
                <div className="p-4 mt-8 bg-white rounded-lg shadow-md">
                    <h2 className="mb-4 text-xl font-bold text-center">
                        Yearly Articles Published
                    </h2>
                    <Chart
                        chartType="BarChart"
                        width="100%"
                        height="300px"
                        data={barChartData}
                        options={{
                            chart: {
                                title: "Articles Published Over Years",
                            },
                            hAxis: {
                                title: "Year",
                            },
                            vAxis: {
                                title: "Articles",
                            },
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
