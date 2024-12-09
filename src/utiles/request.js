import axios from "axios";
const request = axios.create({
    baseURL:'http://121.89.205.189:3000/api',
    headers:{"Content-Type":'application/x-www-form-urlencoded','token':localStorage.getItem('token')}
})
export default request;