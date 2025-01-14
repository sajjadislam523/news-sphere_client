import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic.jsx";

const AddArticle = () => {
    const [tags, setTags] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [selectedPublisher, setSelectedPublisher] = useState("");
    const axiosPublic = useAxiosPublic();

    // Static options for tags
    const tagOptions = [
        { value: "technology", label: "Technology" },
        { value: "business", label: "Business" },
        { value: "health", label: "Health" },
        { value: "science", label: "Science" },
        { value: "sports", label: "Sports" },
    ];

    // Fetch publishers from the backend (example API call)
    React.useEffect(() => {
        axiosPublic.get("/publishers").then((response) => {
            const options = response.data.map((publisher) => ({
                value: publisher.id,
                label: publisher.name,
            }));
            setPublishers(options);
        });
    }, [axiosPublic]);

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

        // Upload image to imgbb
        const formData = new FormData();
        formData.append("image", imageFile);

        const imgbbAPI = "https://api.imgbb.com/1/upload";
        const apiKey = "your-imgbb-api-key"; // Replace with your imgbb API key

        const imageUpload = await fetch(`${imgbbAPI}?key=${apiKey}`, {
            method: "POST",
            body: formData,
        });

        const imageResponse = await imageUpload.json();
        const imageUrl = imageResponse.data.display_url;

        // Prepare article data
        const articleData = {
            title,
            description,
            tags: tags.map((tag) => tag.value),
            publisher: selectedPublisher.value,
            imageUrl,
            isApproved: false, // Default to false, admin will approve it
        };

        // Submit article data to the backend
        axiosPublic.post("/articles", articleData).then(() => {
            Swal.fire({
                title: "Success",
                text: "Article submitted successfully! Waiting for admin approval.",
                icon: "success",
            });
            form.reset();
            setTags([]);
            setSelectedPublisher(null);
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100 sm:px-6 lg:px-8 font-poppins">
            <div className="w-full max-w-3xl">
                <Card>
                    <CardHeader className="p-4">
                        <CardTitle className="text-2xl text-center">
                            Add New Article
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title */}
                            <div>
                                <Label htmlFor="title" className="text-sm">
                                    Article Title
                                </Label>
                                <Input
                                    type="text"
                                    name="title"
                                    placeholder="Enter article title"
                                    className="w-full"
                                />
                            </div>

                            {/* Image */}
                            <div>
                                <Label htmlFor="image" className="text-sm">
                                    Upload Image
                                </Label>
                                <Input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    className="w-full"
                                />
                            </div>

                            {/* Publisher */}
                            <div>
                                <Label htmlFor="publisher" className="text-sm">
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
                                <Label htmlFor="tags" className="text-sm">
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

                            {/* Description */}
                            <div>
                                <Label
                                    htmlFor="description"
                                    className="text-sm"
                                >
                                    Description
                                </Label>
                                <Textarea
                                    name="description"
                                    placeholder="Write the article description..."
                                    className="w-full"
                                />
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full text-white bg-black hover:bg-gray-800"
                            >
                                Submit Article
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AddArticle;
