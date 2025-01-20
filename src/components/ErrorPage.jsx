import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import errImg from "../assets/error.jpg";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center ">
            <div className="max-w-md px-8 py-4 text-center bg-white rounded-lg shadow-lg">
                <img
                    src={errImg}
                    alt="Error Illustration"
                    className="object-contain w-2/3 mx-auto my-2"
                />
                <h2 className="my-4 text-2xl font-semibold text-gray-800 font-poppins">
                    Oops! Page Not Found
                </h2>
                <p className="my-2 text-gray-600 font-poppins">
                    The page you&apos;re looking for doesn&apos;t exist or has
                    been moved.
                </p>

                <Link to="/">
                    <Button className="px-6 py-2 text-white transition duration-300 ease-in-out ">
                        Go Back Home
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
