import * as axios from "axios";
import { global } from "@/inc/global.ts";

const instance = axios.default.create({
  baseURL: global.apiUrl,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true
})

export default instance