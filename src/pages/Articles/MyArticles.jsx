import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";

const MyArticles = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const userEmail = user.email;
    const [declinedReason, setDeclinedReason] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        data: articles = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["myArticles", userEmail],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/user/articles?userEmail=${userEmail}`
            );
            return res.data.articles;
        },
    });

    const handleDelete = async (articleId) => {
        const confirmDelete = await Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete your article.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        });

        if (confirmDelete.isConfirmed) {
            try {
                await axiosSecure.delete(`/articles/${articleId}`);
                Swal.fire(
                    "Deleted!",
                    "Your article has been deleted.",
                    "success"
                );
                refetch();
            } catch (error) {
                Swal.fire(
                    "Error!",
                    error.message ||
                        "An error occurred while deleting the article.",
                    "error"
                );
            }
        }
    };

    const handleUpdate = (articleId) => {
        window.location.href = `/articles/update/${articleId}`;
    };

    const handleOpenModal = (reason) => {
        setDeclinedReason(reason);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setDeclinedReason(null);
    };
    return (
        <div className="container p-6 mx-auto">
            <h1 className="mb-6 text-3xl font-bold text-center">My Articles</h1>

            {isLoading ? (
                <p className="text-center">Loading...</p>
            ) : articles.length === 0 ? (
                <p className="text-center">No articles found.</p>
            ) : (
                <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-md">
                    <Table className="min-w-full">
                        {/* Table Header */}
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Details</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Premium</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody>
                            {articles.map((article, index) => (
                                <TableRow
                                    key={article._id}
                                    className="hover:bg-gray-50"
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{article.title}</TableCell>
                                    <TableCell>
                                        <Link
                                            to={`/articleDetails/${article._id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Details
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {article.isApproved ? (
                                            <span className="px-2 py-1 text-sm font-medium text-white bg-green-500 rounded">
                                                Approved
                                            </span>
                                        ) : article.declineReason ? (
                                            <div className="flex items-center space-x-2">
                                                <span className="px-2 py-1 text-sm font-medium text-white bg-red-500 rounded">
                                                    Declined
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleOpenModal(
                                                            article.declineReason
                                                        )
                                                    }
                                                >
                                                    Reason
                                                </Button>
                                            </div>
                                        ) : (
                                            <span className="px-2 py-1 text-sm font-medium text-gray-700 bg-yellow-400 rounded">
                                                Pending
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {article.isPremium ? (
                                            <span className="px-2 py-1 text-sm font-medium text-white bg-purple-500 rounded">
                                                Yes
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded">
                                                No
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="default"
                                            size="sm"
                                            className="mr-2"
                                            onClick={() =>
                                                handleUpdate(article._id)
                                            }
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() =>
                                                handleDelete(article._id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Modal for declined reason */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Decline Reason</DialogTitle>
                    </DialogHeader>
                    <p>{declinedReason}</p>
                    <DialogFooter>
                        <Button variant="default" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MyArticles;
