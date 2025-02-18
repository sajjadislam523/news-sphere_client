import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import Loading from "../../components/Loading.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";

const Profile = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name || "",
    });
    const axiosSecure = useAxiosSecure();
    console.log(user.photoURL);

    const { data: userData, isLoading } = useQuery({
        queryKey: ["userData", user.email],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/${user.email}`);
                return res.data;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
        staleTime: 1000 * 60 * 5,
    });

    if (isLoading) {
        return <Loading />;
    }

    const subscriptionStatus = userData.isSubscribed
        ? `Active (Ends on ${dayjs(user.subscriptionEnd).format(
              "MMMM DD, YYYY"
          )})`
        : "Inactive";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosSecure.patch(`/users/${user.email}`, {
                name: formData.name,
            });
            console.log(res);

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Success",
                    text: "Your profile has been updated!",
                    icon: "success",
                    timer: 1500,
                });
                setIsEditing(false);
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: error.message || "Failed to update your profile.",
                icon: "error",
            });
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({ name: user.name });
    };

    return (
        <>
            <Helmet>
                <title>My Profile - NewsSphere</title>
            </Helmet>

            <div className="container p-6 mx-auto">
                <h1 className="mb-6 text-3xl font-bold text-center font-merriweather">
                    My Profile
                </h1>

                {/* Profile Card */}
                <div className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-md">
                    {/* Profile Image Section */}
                    <div className="flex justify-center mb-4">
                        <img
                            src={user.photoURL || "/default-avatar.png"}
                            alt="Profile Photo"
                            className="object-cover w-24 h-24 rounded-full"
                        />
                    </div>

                    {/* Profile Form */}
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <Label htmlFor="name" className="font-poppins">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                value={userData.name}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="font-poppins"
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="email" className="font-poppins">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={userData.email}
                                disabled
                                className="font-poppins"
                            />
                            <p className="mt-1 text-sm text-gray-500 font-poppins">
                                Email cannot be changed.
                            </p>
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="isAdmin" className="font-poppins">
                                Status
                            </Label>
                            <Input
                                id="isAdmin"
                                name="isAdmin"
                                type="text"
                                value={
                                    userData.isAdmin ? "Admin" : "Regular User"
                                }
                                disabled
                                className="font-poppins"
                            />
                        </div>
                        <div className="mb-4">
                            <Label
                                htmlFor="subscription"
                                className="font-poppins"
                            >
                                Subscription
                            </Label>
                            <Input
                                id="subscription"
                                name="subscription"
                                type="text"
                                value={subscriptionStatus}
                                disabled
                                className="font-poppins"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            {isEditing ? (
                                <>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleCancel}
                                        className="font-poppins"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="default"
                                        className="font-poppins"
                                    >
                                        Save Changes
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    type="button"
                                    variant="default"
                                    onClick={() => setIsEditing(true)}
                                    className="font-poppins"
                                >
                                    Edit Profile
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Profile;
