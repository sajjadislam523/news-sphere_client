import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Plans = () => {
    const navigate = useNavigate();

    return (
        <div className="py-6">
            <h2 className="mb-4 text-2xl font-bold font-poppins">Our Plans</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 font-poppins">
                {/* Plans card */}
                <Card className="flex flex-col justify-between border border-gray-300">
                    <CardHeader className="bg-gray-100">
                        <CardTitle className="text-lg font-semibold text-gray-700 font-poppins">
                            Free Plan
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                        <p className="mb-4 text-xl font-bold text-gray-700">
                            $0<span className="text-sm">/month</span>
                        </p>
                        <ul className="mb-6 space-y-2 text-sm">
                            <li>Access to limited articles</li>
                            <li>Ads included</li>
                        </ul>
                        <div className="mt-auto">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => navigate("/subscription")}
                            >
                                Get Free Plan
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Premium Individual Plan */}
                <Card className="flex flex-col justify-between border border-blue-400">
                    <CardHeader className="bg-blue-50">
                        <CardTitle className="text-lg font-semibold text-blue-700 font-poppins">
                            Premium Individual
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                        <p className="mb-4 text-xl font-bold text-blue-700">
                            $9.99<span className="text-sm">/month</span>
                        </p>
                        <ul className="mb-6 space-y-2 text-sm">
                            <li>Access to all articles</li>
                            <li>No ads</li>
                            <li>Exclusive content</li>
                            <li>Personalized experience</li>
                        </ul>
                        <div className="mt-auto">
                            <Button
                                variant="default"
                                className="w-full text-white bg-blue-500 hover:bg-blue-400"
                                onClick={() => navigate("/subscription")}
                            >
                                Get Individual Plan
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Premium Family Plan */}
                <Card className="flex flex-col justify-between border border-green-400">
                    <CardHeader className="bg-green-50">
                        <CardTitle className="text-lg font-semibold text-green-700 font-poppins">
                            Premium Family
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                        <p className="mb-4 text-xl font-bold text-green-700">
                            $19.99<span className="text-sm">/month</span>
                        </p>
                        <ul className="mb-6 space-y-2 text-sm">
                            <li>Access to all articles</li>
                            <li>No ads</li>
                            <li>Exclusive content</li>
                            <li>Up to 4 family members</li>
                        </ul>
                        <div className="mt-auto">
                            <Button
                                variant="default"
                                className="w-full text-white bg-green-500 hover:bg-green-400"
                                onClick={() => navigate("/subscription")}
                            >
                                Get Family Plan
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Plans;
