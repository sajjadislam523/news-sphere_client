import { Button } from "@/components/ui/button";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
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
        1: 100, // 1 minute = $1
        7200: 500, // 5 days = $5
        14400: 1000, // 10 days = $10
    };

    const handleSubscription = async () => {
        if (!stripe || !elements) {
            Swal.fire("Error", "Stripe is not initialized.", "error");
            return;
        }

        setLoading(true);

        try {
            // Request payment intent from the backend
            const { data } = await axiosSecure.post("/create-payment-intent", {
                amount: prices[period],
            });

            const clientSecret = data.clientSecret;

            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                Swal.fire("Error", "Please enter card details.", "error");
                setLoading(false);
                return;
            }

            // Confirm the payment
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
                Swal.fire("Payment Error", result.error.message, "error");
            } else if (result.paymentIntent.status === "succeeded") {
                // Update subscription in the database
                await axiosSecure.patch(`/users/subscribe/${user?.email}`, {
                    period,
                });

                Swal.fire(
                    "Success",
                    "You have successfully subscribed to the premium plan!",
                    "success"
                );
            }
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>NewsSphere - Subscription</title>
            </Helmet>

            <div className="container p-6 mx-auto">
                <h1 className="mb-4 text-4xl font-extrabold text-center text-gray-900">
                    Choose Your Subscription Plan
                </h1>
                <h2 className="mb-12 text-lg font-semibold text-center text-gray-700">
                    Select a plan that suits your needs and get started
                    instantly.
                </h2>

                <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-2">
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
                                className="w-full p-3 bg-white border rounded-lg"
                            >
                                <option value={1}>1 Minute - $1</option>
                                <option value={7200}>5 Days - $5</option>
                                <option value={14400}>10 Days - $10</option>
                            </select>
                        </div>

                        <div className="w-full max-w-md p-6 bg-white border rounded-lg shadow-md">
                            <h2 className="mb-6 text-xl font-semibold text-gray-800">
                                Enter Your Payment Details
                            </h2>
                            <CardElement className="px-2 py-4 my-4 border rounded-md" />
                            <Button
                                variant="outline"
                                className="w-full px-6 py-3 text-lg font-semibold bg-white border-2 rounded-lg hover:bg-black hover:text-white"
                                onClick={handleSubscription}
                                disabled={loading || !stripe || !elements}
                            >
                                {loading ? "Processing..." : "Subscribe Now"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Subscription;
