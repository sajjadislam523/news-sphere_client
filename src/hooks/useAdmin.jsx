import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth.jsx";
import useAxiosSecure from "./useAxiosSecure.jsx";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, "isAdmin"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            return res.data?.admin;
        },
    });
    return [isAdmin, isAdminLoading];
};

export default useAdmin;
