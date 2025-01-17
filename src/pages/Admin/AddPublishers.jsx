import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const imageHostingKey = import.meta.env.VITE_image_upload_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddPublishers = () => {
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const name = form.name.value;
        const logoFile = form.logo.files[0];

        if (!name || !logoFile) {
            Swal.fire({
                title: "Error",
                text: "Please provide both the publisher name and logo.",
                icon: "error",
            });
            setLoading(false);
            return;
        }

        try {
            // Upload the logo to ImgBB
            const formData = new FormData();
            formData.append("image", logoFile);

            const imgRes = await axiosPublic.post(imageHostingApi, formData);
            if (imgRes.data.success) {
                const logoUrl = imgRes.data.data.display_url;

                // Save publisher data
                const publisherData = { name, logo: logoUrl };

                const res = await axiosSecure.post(
                    "/publishers",
                    publisherData
                );

                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Success",
                        text: "Publisher added successfully!",
                        icon: "success",
                        timer: 1500,
                    });
                    form.reset();
                }
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to upload the logo. Please try again.",
                    icon: "error",
                });
            }
        } catch (err) {
            Swal.fire({
                title: "Error",
                text: err.message || "An error occurred. Please try again.",
                icon: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Dashboard - Add Publishers</title>
            </Helmet>
            <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100 sm:px-6 lg:px-8 font-poppins">
                <div className="w-full max-w-md">
                    <Card>
                        <CardHeader className="p-4">
                            <CardTitle className="text-2xl text-center">
                                Add Publisher
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label
                                        htmlFor="name"
                                        className="text-sm font-semibold"
                                    >
                                        Publisher Name
                                    </Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Enter publisher name"
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <Label
                                        htmlFor="logo"
                                        className="text-sm font-semibold"
                                    >
                                        Publisher Logo
                                    </Label>
                                    <Input
                                        type="file"
                                        name="logo"
                                        accept="image/*"
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-3 text-white ${
                                        loading
                                            ? "bg-gray-400"
                                            : "bg-black hover:bg-gray-800"
                                    } rounded-md`}
                                >
                                    {loading ? "Adding..." : "Add Publisher"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default AddPublishers;
