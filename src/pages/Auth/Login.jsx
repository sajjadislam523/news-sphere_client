import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import loginImg from "../../assets/login/loginGif.gif";
import useAuth from "../../hooks/useAuth.jsx";

const Login = () => {
    const { logIn, googleSignIn } = useAuth(); // Assuming `googleSignIn` is a method in your useAuth hook

    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);

        logIn(email, password).then((res) => {
            console.log(res);
        });
    };

    const handleGoogleLogin = () => {
        googleSignIn()
            .then((res) => {
                console.log("Google Login Success:", res);
            })
            .catch((err) => {
                console.error("Google Login Failed:", err);
            });
    };

    return (
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
                            <form onSubmit={handleLogin} className="space-y-6">
                                {/* Email Field */}
                                <div className="space-y-1">
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
                                <p className="px-4 text-sm text-gray-500">OR</p>
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
    );
};

export default Login;
