import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginImg from "../../assets/auth/loginGif.gif";
import useAuth from "../../hooks/useAuth.jsx";
import useAxiosPublic from "../../hooks/useAxiosPublic.jsx";

const Login = () => {
    const { logIn, googleSignIn } = useAuth();
    const { axiosPublic } = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case "auth/invalid-email":
                return "The email address is not valid. Please check and try again.";
            case "auth/user-not-found":
                return "No account found with this email. Please register first.";
            case "auth/wrong-password":
                return "The password is incorrect. Please try again.";
            case "auth/invalid-credential":
                return "Invalid email or password. Please try again.";
            default:
                return "An unknown error occurred. Please try again.";
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        logIn(email, password)
            .then((res) => {
                Swal.fire({
                    title: "Login Successful",
                    text: `${res.user.displayName} has successfully logged in`,
                    icon: "success",
                    timer: 1500,
                });
            })
            .catch((err) => {
                const errorMessage = getErrorMessage(err.code);
                Swal.fire({
                    icon: "error",
                    title: "An error occurred",
                    text:
                        errorMessage || "An Error occurred. Please try again.",
                });
            });
        navigate(from, { replace: true });
    };

    const handleGoogleLogin = () => {
        googleSignIn()
            .then((res) => {
                const userInfo = {
                    email: res.user?.email,
                    name: res.user?.displayName,
                };
                axiosPublic.post("/users", userInfo).then((res) => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Login Successful",
                            text: "You have successfully logged in!",
                            icon: "success",
                            timer: 1500,
                        });
                        navigate("/");
                    }
                });
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "An error occurred",
                    text:
                        err.message ||
                        "An error occurred while trying to log in with Google. Please try again.",
                    timer: 1500,
                });
            });
        navigate(from, { replace: true });
    };

    return (
        <>
            <Helmet>
                <title>Login - NewsSphere</title>
            </Helmet>
            <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100 sm:px-6 lg:px-8 font-poppins">
                <div className="flex flex-col items-center w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row">
                    {/* Left Section: GIF */}
                    <div className="hidden w-full md:block md:w-1/2">
                        <img
                            src={loginImg}
                            alt="Login Illustration"
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Right Section: Login Form */}
                    <div className="w-full p-6 sm:p-8 md:w-1/2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="mb-4 text-2xl text-center">
                                    Login to Your Account
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={handleLogin}
                                    className="space-y-6"
                                >
                                    {/* Email Field */}
                                    <div className="space-y-1">
                                        <Label
                                            htmlFor="email"
                                            className="text-sm"
                                        >
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
                                    <div className="space-y-1">
                                        <Label
                                            htmlFor="password"
                                            className="text-sm"
                                        >
                                            Password
                                        </Label>
                                        <Input
                                            type="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            className="w-full"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        className="w-full text-white bg-black hover:bg-gray-800"
                                    >
                                        Login
                                    </Button>
                                </form>

                                {/* Google Login Button */}
                                <div className="relative flex items-center my-4">
                                    <div className="w-full border-t border-gray-300"></div>
                                    <p className="px-4 text-sm text-gray-500">
                                        OR
                                    </p>
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <Button
                                    onClick={handleGoogleLogin}
                                    className="w-full text-white"
                                >
                                    <FaGoogle />
                                    Continue with Google
                                </Button>

                                {/* Register Link */}
                                <p className="mt-4 text-sm text-center">
                                    Don&apos;t have an account?{" "}
                                    <Link
                                        to="/register"
                                        className="text-blue-500 hover:underline"
                                    >
                                        Register here
                                    </Link>
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
