import { Button } from "@components/ui";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ArticleCard = ({ article, subscriptionStatus }) => {
    const navigate = useNavigate();

    return (
        <div
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
                    article.isPremium && !subscriptionStatus
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                }`}
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
        </div>
    );
};

ArticleCard.propTypes = {
    article: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        publisher: PropTypes.string.isRequired,
        isPremium: PropTypes.bool.isRequired,
    }).isRequired,
    subscriptionStatus: PropTypes.bool.isRequired,
};

export default ArticleCard;
