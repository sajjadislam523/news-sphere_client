import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import Loading from "../../components/Loading.jsx";
import useAxiosPublic from "../../hooks/useAxiosPublic.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";

const image_hosting_key = import.meta.env.VITE_image_upload_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateArticle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const [tags, setTags] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [selectedPublisher, setSelectedPublisher] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        imageUrl: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                value: publisher.name,
                label: publisher.name,
                logo: publisher.logo,
            }));
            setPublishers(options);
        });
    }, [axiosSecure]);

    // Fetch article details
    const { isLoading: isFetchingArticle } = useQuery({
        queryKey: ["article", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/articles/${id}`);
            return res.data;
        },
        onSuccess: (data) => {
            setFormData({
                title: data.title,
                description: data.description,
                imageUrl: data.imageUrl || "",
            });
            setTags(data.tags.map((tag) => ({ value: tag, label: tag })));
            setSelectedPublisher({
                value: data.publisher,
                label: data.publisher,
                logo: data.publisherLogo,
            });
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { title, description } = formData;
        const imageFile = e.target.image.files[0];

        if (!title || !description || !selectedPublisher || tags.length === 0) {
            Swal.fire({
                title: "Error",
                text: "Please fill out all required fields.",
                icon: "error",
            });
            return;
        }

        try {
            setIsSubmitting(true);
            let imageUrl = formData.imageUrl;

            if (imageFile) {
                const imageForm = new FormData();
                imageForm.append("image", imageFile);
                const imgRes = await axiosPublic.post(
                    image_hosting_api,
                    imageForm
                );
                if (imgRes.data.success) {
                    imageUrl = imgRes.data.data.display_url;
                } else {
                    throw new Error("Image upload failed");
                }
            }

            const updatedData = {
                title,
                description,
                tags: tags.map((tag) => tag.value),
                publisher: selectedPublisher.value,
                publisherLogo: selectedPublisher.logo,
                imageUrl,
                updatedAt: new Date(),
            };

            await axiosSecure.put(`/articles/update/${id}`, updatedData);
            Swal.fire({
                title: "Success",
                text: "Article updated successfully!",
                icon: "success",
                timer: 1500,
            });
            navigate("/myArticles");
        } catch (err) {
            Swal.fire({
                title: "Error",
                text:
                    err.message || "Failed to update article. Try again later.",
                icon: "error",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isFetchingArticle) {
        return <Loading />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 font-poppins">
            <div className="w-full max-w-2xl">
                <Card>
                    <CardHeader className="p-4">
                        <CardTitle className="text-2xl text-center">
                            Update Article
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
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter article title"
                                    required
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
                                {formData.imageUrl && (
                                    <img
                                        src={formData.imageUrl}
                                        alt="Current"
                                        className="mt-4 rounded-lg"
                                    />
                                )}
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
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Write the article description..."
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full py-3 text-white bg-black rounded-md hover:bg-gray-800"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? "Updating..."
                                    : "Update Article"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UpdateArticle;
