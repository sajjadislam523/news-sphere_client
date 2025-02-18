import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth.jsx";

const axiosSecure = axios.create({
    baseURL: "https://news-sphere-server.vercel.app",
});
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    axiosSecure.interceptors.request.use(
        function (config) {
            const token = localStorage.getItem("access-token");
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    axiosSecure.interceptors.response.use(
        function (response) {
            return response;
        },
        async (error) => {
            const status = error?.response?.status;
            console.log("Status error in the interceptor", status);
            // for 401 or 403 logout the user
            if (status === 401 || status === 403) {
                await logOut();
                navigate("/login");
            }
            return Promise.reject(error);
        }
    );
    return axiosSecure;
};

export default useAxiosSecure;
