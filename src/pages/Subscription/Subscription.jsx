import { Button } from "@/components/ui/button";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
import subscriptionGif from "../../assets/subscriptionsGif.gif";
import useAuth from "../../hooks/useAuth.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";

const Subscription = () => {
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();

    const [loading, setLoading] = useState(false);
    const [period, setPeriod] = useState(1);

    const prices = {
        1: 100,
        7200: 500,
        14400: 1000,
    };

    const handleSubscription = async () => {
        if (!stripe || !elements) {
            Swal.fire({
                title: "Payment Error",
                text: "Please install the Stripe plugin in your browser to proceed with the payment.",
                icon: "error",
            });
        }

        setLoading(true);

        try {
            const timezoneOffset = 360;

            const adjustedPeriod = period + timezoneOffset;

            const { data } = await axiosSecure.post("/create-payment-intent", {
                amount: prices[period],
            });

            const clientSecret = data.clientSecret;

            const cardElement = elements.getElement(CardElement);

            if (!cardElement) {
                Swal.fire({
                    title: "Error",
                    text: "Card details are not entered.",
                    icon: "error",
                });
                setLoading(false);
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email,
                    },
                },
            });

            if (result.error) {
                Swal.fire({
                    title: "Payment Error",
                    text: result.error.message,
                    icon: "error",
                });
            } else if (result.paymentIntent.status === "succeeded") {
                await axiosSecure.patch(`/users/subscribe/${user?.email}`, {
                    period: adjustedPeriod,
                });
                console.log("Sent adjusted period:", adjustedPeriod);

                Swal.fire({
                    title: "Subscription Successful",
                    text: "You have successfully subscribed to the premium plan!",
                    icon: "success",
                });
                setLoading(false);
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
            });
            setLoading(false);
        }
    };

    return (
        <div className="container p-6 mx-auto">
            <h1 className="mb-4 text-4xl font-extrabold text-center text-gray-900">
                Choose Your Subscription Plan
            </h1>

            <h2 className="mb-12 text-xl font-semibold text-center text-gray-700">
                Select a plan that suits your needs and get started instantly.
            </h2>

            <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-2">
                {/* GIF Section */}
                <div className="flex justify-center">
                    <img
                        src={subscriptionGif}
                        alt="Subscription Banner"
                        className="w-full rounded-lg shadow-md lg:w-3/4"
                    />
                </div>

                <div className="flex flex-col items-center space-y-8">
                    <div className="w-full max-w-md">
                        <label
                            htmlFor="period"
                            className="block mb-4 text-lg font-semibold text-gray-700"
                        >
                            Subscription Period:
                        </label>
                        <select
                            id="period"
                            value={period}
                            onChange={(e) =>
                                setPeriod(parseInt(e.target.value))
                            }
                            className="w-full p-3 transition duration-300 ease-in-out bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none hover:bg-gray-100"
                        >
                            <option value={1}>1 Minute - $1</option>
                            <option value={7200}>5 Days - $5</option>
                            <option value={14400}>10 Days - $10</option>
                        </select>
                    </div>

                    <div className="w-full max-w-md p-6 bg-white border border-gray-300 shadow-lg rounded-xl">
                        <h2 className="mb-6 text-xl font-semibold text-gray-800">
                            Enter Your Payment Details
                        </h2>

                        <div className="mb-6">
                            <CardElement options={{ hidePostalCode: true }} />
                        </div>

                        <Button
                            variant="outline"
                            className="w-full px-6 py-3 text-lg font-semibold text-black transition duration-300 ease-in-out bg-white border-2 border-black rounded-lg shadow-md hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black active:bg-gray-800"
                            onClick={handleSubscription}
                            disabled={loading || !stripe || !elements}
                        >
                            {loading ? "Processing..." : "Subscribe Now"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
