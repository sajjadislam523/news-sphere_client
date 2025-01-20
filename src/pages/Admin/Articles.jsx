import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaCheck, FaStar, FaTimes, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
const Articles = () => {
    const axiosSecure = useAxiosSecure();

    const { data: articles = [], refetch } = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const response = await axiosSecure.get("/articles");
            return response.data.articles;
        },
    });

    const handleApproveArticle = async (id) => {
        try {
            const res = await axiosSecure.patch(`articles/${id}`);
            if (res.data.modifiedCount > 0) {
                Swal.fire(
                    "Success",
                    "Article approved successfully",
                    "success"
                );
                refetch();
            }
        } catch (err) {
            Swal.fire(err.message, "Failed to approve article", "error");
        }
    };

    const handleDeclineArticle = async (id) => {
        const { value: reason } = await Swal.fire({
            title: "Decline Article",
            input: "textarea",
            inputPlaceholder: "Enter decline reason",
            showCancelButton: true,
            confirmButtonText: "Decline",
            cancelButtonText: "Cancel",
            inputValidator: (value) => {
                if (!value) {
                    return "You need to provide a reason!";
                }
            },
        });

        if (reason) {
            try {
                const res = await axiosSecure.patch(`/articles/${id}/decline`, {
                    declineReason: reason,
                });
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Success", "Article declined!", "success");
                    refetch();
                }
            } catch (err) {
                Swal.fire("Error", err.message, "error");
            }
        }
    };

    const handleDeleteArticle = async (id) => {
        const conformation = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });
        if (conformation.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/articles/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire(
                        "Success",
                        "Article deleted successfully",
                        "success"
                    );
                    refetch();
                }
            } catch (err) {
                Swal.fire(err.message, "Failed to delete article", "error");
            }
        }
    };

    const handleMakePremium = async (id) => {
        try {
            const res = await axiosSecure.patch(`/articles/${id}/premium`);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", "Article made premium!", "success");
                refetch();
            }
        } catch (err) {
            Swal.fire(err.message, "Failed to make article premium", "error");
        }
    };

    return (
        <>
            <Helmet>
                <title>Dashboard - All Articles</title>
            </Helmet>
            <div className="p-4 font-poppins">
                <h1 className="mb-4 text-xl font-bold">Admin - All Articles</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Posted Date</TableHead>
                            <TableHead>Publisher</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {articles.map((article) => {
                            const isDeclined = !!article.declineReason;
                            const isApproved = article.isApproved;

                            return (
                                <TableRow key={article._id}>
                                    <TableCell>
                                        <div
                                            className="w-40 truncate"
                                            title={article.title}
                                        >
                                            {article.title}
                                        </div>
                                    </TableCell>
                                    <TableCell>{article.author}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            article.createdAt
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>{article.publisher}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-sm font-semibold ${
                                                isApproved
                                                    ? "bg-green-100 text-green-800"
                                                    : isDeclined
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                            }`}
                                        >
                                            {isApproved
                                                ? "Approved"
                                                : isDeclined
                                                ? "Declined"
                                                : "Pending"}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            {/* Approve Button */}
                                            <Button
                                                title="Approve Article"
                                                onClick={() =>
                                                    handleApproveArticle(
                                                        article._id
                                                    )
                                                }
                                                disabled={
                                                    isApproved || isDeclined
                                                }
                                                className={`rounded-full ${
                                                    isApproved
                                                        ? "text-green-600"
                                                        : "text-gray-600 hover:text-green-800"
                                                }`}
                                            >
                                                <FaCheck />
                                            </Button>

                                            {/* Decline Button */}
                                            <Button
                                                title="Decline Article"
                                                onClick={() =>
                                                    handleDeclineArticle(
                                                        article._id
                                                    )
                                                }
                                                disabled={
                                                    isApproved || isDeclined
                                                }
                                                className={`rounded-full ${
                                                    isDeclined
                                                        ? "text-red-600"
                                                        : "text-gray-600 hover:text-red-800"
                                                }`}
                                            >
                                                <FaTimes />
                                            </Button>

                                            {/* Delete Button */}
                                            <Button
                                                title="Delete Article"
                                                onClick={() =>
                                                    handleDeleteArticle(
                                                        article._id
                                                    )
                                                }
                                                className="text-gray-600 rounded-full hover:text-red-800"
                                            >
                                                <FaTrash />
                                            </Button>

                                            {/* Premium Button */}
                                            <Button
                                                title="Make Article Premium"
                                                onClick={() =>
                                                    handleMakePremium(
                                                        article._id
                                                    )
                                                }
                                                disabled={isDeclined}
                                                className={`rounded-full ${
                                                    article.isPremium
                                                        ? "text-yellow-500"
                                                        : "text-gray-600 hover:text-yellow-800"
                                                }`}
                                            >
                                                <FaStar />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default Articles;
