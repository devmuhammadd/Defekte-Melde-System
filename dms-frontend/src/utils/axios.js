import axios from "axios";
import applyCaseMiddleware from 'axios-case-converter';

const axiosInstance = applyCaseMiddleware(axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "",
}));

export default axiosInstance;
