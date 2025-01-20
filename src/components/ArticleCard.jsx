import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ArticleCard = ({ article, subscriptionStatus }) => {
    const navigate = useNavigate();

    return (
        <Card
            className={`flex flex-col h-full transition-all shadow-sm hover:shadow-md ${
                article.isPremium
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-gray-200 bg-white"
            }`}
        >
            {/* Image */}
            <CardHeader className="p-0">
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="object-cover w-full h-40 rounded-t-md"
                />
            </CardHeader>

            <CardContent className="p-4 space-y-3">
                <CardTitle className="text-lg font-bold font-merriweather">
                    {article.title}
                </CardTitle>

                <CardDescription className="text-sm text-gray-700 font-poppins line-clamp-3">
                    {article.description.slice(0, 100)}...
                </CardDescription>

                <p className="text-xs text-gray-500 font-poppins">
                    Publisher: {article.publisher}
                </p>
            </CardContent>

            <CardFooter className="p-4 mt-auto">
                <Button
                    variant={
                        article.isPremium && !subscriptionStatus
                            ? "secondary"
                            : "outline"
                    }
                    className={`w-full ${
                        article.isPremium && !subscriptionStatus
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                    } cursor-pointer`}
                    onClick={() =>
                        !article.isPremium || subscriptionStatus
                            ? navigate(`/articleDetails/${article._id}`)
                            : null
                    }
                    disabled={article.isPremium && !subscriptionStatus}
                >
                    {article.isPremium && !subscriptionStatus
                        ? "Subscribe to View"
                        : "Details"}
                </Button>
            </CardFooter>
        </Card>
    );
};

ArticleCard.propTypes = {
    article: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        publisher: PropTypes.string,
        isPremium: PropTypes.bool.isRequired,
    }).isRequired,
    subscriptionStatus: PropTypes.bool,
};

export default ArticleCard;
