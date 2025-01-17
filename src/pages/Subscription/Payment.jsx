import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Subscription from "./Subscription.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_payment_key);
const Payment = () => {
    return (
        <div className="container mx-auto">
            <Elements stripe={stripePromise}>
                <Subscription />
            </Elements>
        </div>
    );
};

export default Payment;
