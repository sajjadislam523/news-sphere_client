import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { createContext } from "react";
import useAuth from "../hooks/useAuth.jsx";
import useAxiosPublic from "../hooks/useAxiosPublic.jsx";

export const SubscriptionContext = createContext();
const SubscriptionsProvider = ({ children }) => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: subscriptionStatus } = useQuery({
        queryKey: ["subscriptionStatus", user?.email],
        queryFn: async () => {
            if (user?.email) {
                const res = await axiosPublic.get(
                    `users/subscription-status/${user?.email}`
                );
                return res.data.isSubscribed;
            }
        },
    });

    return (
        <SubscriptionContext.Provider value={subscriptionStatus}>
            {children}
        </SubscriptionContext.Provider>
    );
};

SubscriptionsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SubscriptionsProvider;
