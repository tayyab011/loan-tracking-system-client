import axios from "axios";
import { use, useEffect } from "react";

import { useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthContext";

const axiosSecure = axios.create({
  baseURL: "https://loan-tracking-system-server.vercel.app",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, logout } = use(AuthContext);

  useEffect(() => {
    // only add interceptor when token exists
    if (!user?.accessToken) return;

    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        return config;
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        const statusCode = error?.status;

        if (statusCode === 401 || statusCode === 403) {
          alert("Forbidden user detected");

          await logout();
          navigate("/login");
        }

        console.log("Axios Secure Error:", error);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user?.accessToken, logout, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
