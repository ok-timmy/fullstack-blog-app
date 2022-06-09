import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: "https://jigi-project.herokuapp.com/api"
});