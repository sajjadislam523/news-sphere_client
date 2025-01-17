import { useContext } from "react";
import { SubscriptionContext } from "../providers/SubscriptionsProvider.jsx";

const useSubscription = () => {
    const context = useContext(SubscriptionContext);
    return context;
};

export default useSubscription;
