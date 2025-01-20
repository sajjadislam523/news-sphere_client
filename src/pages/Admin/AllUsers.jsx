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
import Swal from "sweetalert2";
import Loading from "../../components/Loading.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: users = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const handleMakeAdmin = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to make this user an admin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!",
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/users/${id}`);
                    if (res.data.modifiedCount > 0) {
                        Swal.file(
                            "Success",
                            "User has been made an admin.",
                            "success"
                        );
                        refetch();
                    } else {
                        Swal.fire(
                            "Error",
                            "Failed to make user an admin.",
                            "error"
                        );
                    }
                } catch (err) {
                    Swal.fire("Error", err.message, "error");
                }
            }
        });
    };

    return (
        <>
            <Helmet>
                <title>Dashboard - All Users</title>
            </Helmet>
            <div className="p-4 font-poppins">
                <h1 className="mb-4 text-xl font-bold font-poppins">
                    All Users
                </h1>
                {isLoading ? (
                    <Loading />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Profile Picture</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.name || "N/A"}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <img
                                            src={
                                                user.photoUrl ||
                                                "/default-avatar.png"
                                            }
                                            alt={user.name}
                                            className="w-8 h-8 rounded-full"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {user.isAdmin ? (
                                            <p className="font-semibold">
                                                Admin
                                            </p>
                                        ) : (
                                            <Button
                                                type="button"
                                                size="sm"
                                                className="mr-2"
                                                disabled={user.isAdmin}
                                                onClick={() =>
                                                    handleMakeAdmin(user._id)
                                                }
                                            >
                                                Make Admin
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </>
    );
};

export default AllUsers;
