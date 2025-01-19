import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="py-6 mt-12 text-white bg-gray-800">
            <div className="container px-6 mx-auto">
                {/* Header Section */}
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold font-merriweather">
                        NewsSphere
                    </h2>
                    <p className="mt-2 text-sm font-poppins">
                        Your go-to platform for the latest news
                    </p>
                </div>

                {/* Social Media Links */}
                <div className="flex justify-center mb-6 space-x-6">
                    <a href="#" className="text-white hover:text-gray-400">
                        <FaFacebookF size={24} />
                    </a>
                    <a href="#" className="text-white hover:text-gray-400">
                        <FaTwitter size={24} />
                    </a>
                    <a href="#" className="text-white hover:text-gray-400">
                        <FaInstagram size={24} />
                    </a>
                    <a href="#" className="text-white hover:text-gray-400">
                        <FaLinkedinIn size={24} />
                    </a>
                </div>

                {/* Copyright Section */}
                <div className="mb-4 text-sm text-center font-poppins">
                    <p>
                        &copy; {new Date().getFullYear()} NewsHub. All rights
                        reserved.
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="text-center">
                    <ul className="flex flex-wrap justify-center mb-6 space-x-6 text-sm">
                        <li>
                            <Link
                                to="/"
                                className="text-white hover:text-gray-400"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="text-white hover:text-gray-400"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="text-white hover:text-gray-400"
                            >
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="text-white hover:text-gray-400"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
