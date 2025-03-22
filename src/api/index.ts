import { cookies } from "next/headers";
import axios from "axios";

import { apiURL } from "@/config/env";

const api = axios.create({
  baseURL: apiURL,
  withCredentials: true
});

api.interceptors.request.use(async (config) => {
  if (typeof window === 'undefined') {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  
  return config;
});

export { api };