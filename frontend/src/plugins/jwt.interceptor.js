import axios from "axios";
const jwtInterceptor = axios.create({
  baseURL: 'http://localhost:3000',
});

jwtInterceptor.interceptors.request.use((config) => {
  const authToken=localStorage.getItem('accessToken')
  if (authToken) {
  config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});
 
jwtInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("errrorrrrrrrrrrr",error)
    return error
  }
);
 
export default jwtInterceptor;