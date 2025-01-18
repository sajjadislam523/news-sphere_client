import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import signupGif from "../../assets/auth/signupGif.gif";
import useAuth from "../../hooks/useAuth.jsx";
import useAxiosPublic from "../../hooks/useAxiosPublic.jsx";

const Register = () => {
    const { register, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [error, setError] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        setError("");

        const form = e.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;

        if (!name || !email || !password) {
            setError("All fields are required.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        const verifyPass = /^(?=.*[A-Z])(?=.*[a-z]).*$/;
        if (!verifyPass.test(password)) {
            setError(
                "Password must contain at least one uppercase letter and one lowercase letter."
            );
            return;
        }

        const getErrorMessage = (errorCode) => {
            switch (errorCode) {
                case "auth/email-already-in-use":
                    return "Email already in use.";
                case "auth/invalid-email":
                    return "Invalid email format.";
                default:
                    return "An error occurred while registering.";
            }
        };

        register(email, password).then(() => {
            updateUserProfile(name, photoURL).then(() => {
                const userInfo = {
                    name: name,
                    email: email,
                    isAdmin: false,
                    photoURL: photoURL,
                    isSubscribed: false,
                    subscriptionEnd: null,
                };
                axiosPublic
                    .post("/users", userInfo)
                    .then((res) => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Registration Successful",
                                text: "You have successfully registered!",
                                icon: "success",
                                timer: 1500,
                            });
                            navigate("/");
                        }
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Registration Failed",
                            text: getErrorMessage(err.code),
                            timer: 1500,
                        });
                    });
            });
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 py-4 bg-gray-100 sm:px-6 lg:px-8 font-poppins">
            <div className="flex flex-col items-center w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row">
                {/* Left Section: Registration Form */}
                <div className="w-full p-4 sm:p-8 md:w-1/2">
                    <Card>
                        <CardHeader className="p-4">
                            <CardTitle className="text-2xl text-center ">
                                Create Your Account
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={handleRegister}
                                className="space-y-6"
                            >
                                {/* Name Field */}
                                <div>
                                    <Label htmlFor="name" className="text-sm">
                                        Full Name
                                    </Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your full name"
                                        className="w-full"
                                    />
                                </div>
                                {/* Photo URL */}
                                <div>
                                    <Label
                                        htmlFor="photoURL"
                                        className="text-sm"
                                    >
                                        Photo URL
                                    </Label>
                                    <Input
                                        type="text"
                                        name="photoURL"
                                        placeholder="Enter your photo URL"
                                        className="w-full"
                                    />
                                </div>
                                {/* Email Field */}
                                <div>
                                    <Label htmlFor="email" className="text-sm">
                                        Email Address
                                    </Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className="w-full"
                                    />
                                </div>
                                {/* Password Field */}
                                <div>
                                    <Label
                                        htmlFor="password"
                                        className="text-sm"
                                    >
                                        Password
                                    </Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Create a password"
                                        className="w-full"
                                    />
                                    {error && (
                                        <p className="pt-1 text-xs text-red-500">
                                            {error}
                                        </p>
                                    )}
                                </div>
                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full text-white bg-black hover:bg-gray-800"
                                >
                                    Register
                                </Button>
                            </form>
                            {/* Login Link */}
                            <p className="mt-4 text-sm text-center">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-blue-500 hover:underline"
                                >
                                    Login here
                                </Link>
                            </p>
                        </CardContent>
                    </Card>
                </div>
                {/* Right Section: GIF */}
                <div className="hidden w-full md:block md:w-1/2">
                    <img
                        src={signupGif}
                        alt="Register Illustration"
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
