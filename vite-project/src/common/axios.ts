import axios, { AxiosInstance } from "axios";

const accessToken:string = import.meta.env.VITE_QIITA_API_ACCESS_TOKEN;
const qiitaApiURL:string = import.meta.env.VITE_QIITA_API_URL;

console.log(qiitaApiURL);

export const apiClient: AxiosInstance = axios.create({
  // APIのURI
    baseURL: qiitaApiURL,
  // リクエストヘッダ
    headers: {
        "Authorization": `Bearer ${accessToken}`,
    },
});