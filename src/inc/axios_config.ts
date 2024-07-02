import * as axios from "axios";
import { global } from "@/inc/global.ts";

const instance = axios.default.create({
  baseURL: global.apiUrl,
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true
})

export default instance