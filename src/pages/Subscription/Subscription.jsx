import { Button } from "@/components/ui/button";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
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
            <h1 className="mb-6 text-3xl font-bold text-center">
                Choose Your Subscription Plan
            </h1>
            <div className="flex flex-col items-center space-y-4">
                {/* Subscription Period Selection */}
                <div className="w-full max-w-sm">
                    <label htmlFor="period" className="block mb-2 text-lg">
                        Subscription Period:
                    </label>
                    <select
                        id="period"
                        value={period}
                        onChange={(e) => setPeriod(parseInt(e.target.value))}
                        className="w-full p-2 border rounded"
                    >
                        <option value={1}>1 Minute - $1</option>
                        <option value={7200}>5 Days - $5</option>
                        <option value={14400}>10 Days - $10</option>
                    </select>
                </div>

                {/* Payment Form */}
                <div className="w-full max-w-md p-4 border rounded shadow">
                    <h2 className="mb-4 text-lg font-semibold">
                        Enter Your Payment Details
                    </h2>
                    <div className="mb-4">
                        <CardElement options={{ hidePostalCode: true }} />
                    </div>
                    <Button
                        variant="primary"
                        className="w-full"
                        onClick={handleSubscription}
                        disabled={loading || !stripe || !elements}
                    >
                        {loading ? "Processing..." : "Subscribe Now"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
