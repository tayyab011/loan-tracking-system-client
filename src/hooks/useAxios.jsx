import axios from "axios";

const instance = axios.create({
  baseURL: "https://loan-tracking-system-server.vercel.app",
});
const useAxios = () => {
  return instance;
};

export default useAxios;
