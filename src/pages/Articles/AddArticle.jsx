import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Select from "react-select";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth.jsx";
import useAxiosPublic from "../../hooks/useAxiosPublic.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";

const image_hosting_key = import.meta.env.VITE_image_upload_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddArticle = () => {
    const [tags, setTags] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [selectedPublisher, setSelectedPublisher] = useState([]);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    const tagOptions = [
        { value: "technology", label: "Technology" },
        { value: "business", label: "Business" },
        { value: "health", label: "Health" },
        { value: "science", label: "Science" },
        { value: "sports", label: "Sports" },
        { value: "tragedy", label: "Tragedy" },
        { value: "trending", label: "Trending" },
        { value: "politics", label: "Politics" },
    ];

    useEffect(() => {
        axiosSecure.get("/publishers").then((res) => {
            const options = res.data.map((publisher) => ({
                logo: publisher.logo,
                label: publisher.name,
            }));
            setPublishers(options);
        });
    }, [axiosSecure]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const imageFile = form.image.files[0];

        if (
            !title ||
            !description ||
            !imageFile ||
            !selectedPublisher ||
            tags.length === 0
        ) {
            Swal.fire({
                title: "Error",
                text: "Please fill out all required fields.",
                icon: "error",
            });
            return;
        }

        try {
            setIsLoading(true);
            // Upload image to imgbb
            const imageForm = new FormData();
            imageForm.append("image", imageFile);

            const imgRes = await axiosPublic.post(image_hosting_api, imageForm);

            if (imgRes.data.success) {
                const img = imgRes.data.data.display_url;

                const articleData = {
                    title,
                    description,
                    tags: tags.map((tag) => tag.value),
                    publisher: selectedPublisher.label,
                    publisherLogo: selectedPublisher.logo,
                    imageUrl: img,
                    isApproved: false,
                    isPremium: false,
                    author: user.email,
                    createdAt: new Date(),
                    views: 0,
                };

                const response = await axiosSecure.post(
                    "/articles",
                    articleData
                );
                if (response.data.insertedId) {
                    Swal.fire({
                        title: "Success",
                        text: "Article submitted successfully! Waiting for admin approval.",
                        icon: "success",
                        timer: 1500,
                    });
                    form.reset();
                    setTags([]);
                    setSelectedPublisher(null);
                }
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to submit article. Please try again later.",
                    icon: "error",
                });
            }
        } catch (err) {
            Swal.fire({
                title: "Error",
                text:
                    err.message ||
                    "Failed to submit article. Please try again later.",
                icon: "error",
            });
        }
        setIsLoading(false);
    };

    return (
        <>
            <Helmet>
                <title>Add New Article - NewsSphere</title>
            </Helmet>

            <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 font-poppins">
                <div className="w-full max-w-2xl">
                    <Card>
                        <CardHeader className="p-4">
                            <CardTitle className="text-2xl text-center">
                                Add New Article
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={handleSubmit}
                                className="w-full max-w-3xl mx-auto space-y-6"
                            >
                                {/* Title */}
                                <div>
                                    <Label
                                        htmlFor="title"
                                        className="text-sm font-semibold"
                                    >
                                        Article Title
                                    </Label>
                                    <Input
                                        type="text"
                                        name="title"
                                        placeholder="Enter article title"
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <Label
                                        htmlFor="image"
                                        className="text-sm font-semibold"
                                    >
                                        Upload Image
                                    </Label>
                                    <Input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Publisher and Tags */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Publisher */}
                                    <div>
                                        <Label
                                            htmlFor="publisher"
                                            className="text-sm font-semibold"
                                        >
                                            Publisher
                                        </Label>
                                        <Select
                                            options={publishers}
                                            value={selectedPublisher}
                                            onChange={setSelectedPublisher}
                                            placeholder="Select a publisher"
                                            className="mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Tags */}
                                    <div>
                                        <Label
                                            htmlFor="tags"
                                            className="text-sm font-semibold"
                                        >
                                            Tags
                                        </Label>
                                        <Select
                                            isMulti
                                            options={tagOptions}
                                            value={tags}
                                            onChange={setTags}
                                            placeholder="Select tags"
                                            className="mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <Label
                                        htmlFor="description"
                                        className="text-sm font-semibold"
                                    >
                                        Description
                                    </Label>
                                    <Textarea
                                        name="description"
                                        placeholder="Write the article description..."
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full py-3 text-white bg-black rounded-md hover:bg-gray-800"
                                >
                                    {isLoading ? (
                                        <span>Uploading...</span>
                                    ) : (
                                        "Submit Article"
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default AddArticle;
