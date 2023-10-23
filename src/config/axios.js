import axios from "axios";


const clienteAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_BACKEND,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }

});

export default clienteAxios

