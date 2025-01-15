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
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";

const Articles = () => {
    const axiosSecure = useAxiosSecure();

    const { data: articles = [], refetch } = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const response = await axiosSecure.get("/articles");
            console.log(response.data.articles);
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
        });

        if (reason) {
            try {
                const res = await axiosSecure.patch(`/articles/${id}`, {
                    declineReason: reason,
                });
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Success", "Article declined!", "success");
                    refetch();
                }
            } catch (err) {
                Swal.fire(err.message, "Failed to decline article", "error");
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
            const res = await axiosSecure.patch(`/articles/${id}`);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", "Article made premium!", "success");
                refetch();
            }
        } catch (err) {
            Swal.fire(err.message, "Failed to make article premium", "error");
        }
    };

    return (
        <div className="p-4">
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
                    {articles.map((article) => (
                        <TableRow key={article._id}>
                            <TableCell>{article.title}</TableCell>
                            <TableCell>{article.author}</TableCell>
                            <TableCell>
                                {new Date(
                                    article.createdAt
                                ).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{article.publisher}</TableCell>
                            <TableCell>
                                {article.isApproved ? "Approved" : "Pending"}
                            </TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    {!article.isApproved && (
                                        <Button
                                            onClick={() =>
                                                handleApproveArticle(
                                                    article._id
                                                )
                                            }
                                            className="text-green-600"
                                        >
                                            Approve
                                        </Button>
                                    )}
                                    {!article.isApproved && (
                                        <Button
                                            onClick={() =>
                                                handleDeclineArticle(
                                                    article._id
                                                )
                                            }
                                            className="text-red-600"
                                        >
                                            Decline
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() =>
                                            handleDeleteArticle(article._id)
                                        }
                                        className="text-gray-600"
                                    >
                                        Delete
                                    </Button>
                                    {!article.isPremium && (
                                        <Button
                                            onClick={() =>
                                                handleMakePremium(article._id)
                                            }
                                            className="text-yellow-600"
                                        >
                                            Make Premium
                                        </Button>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Articles;
