import axios from "axios";
import { QueryClient } from "react-query";

//const link = "http://localhost:3000/";
const link = "https://duleo-api.herokuapp.com/";

export const api = axios.create({
    baseURL: link,
    //baseURL: "https://duleo-api.herokuapp.com/",
})

export const url = link

export const queryClient = new QueryClient();
