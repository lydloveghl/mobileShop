import axios from "axios";
const user = JSON.parse(localStorage.getItem('user')) || {}
console.log(user)
const token = user.token || ''
console.log(token)

const request = axios.create({
    baseURL:'http://121.89.205.189:3000/api',
    headers:{"Content-Type":'application/x-www-form-urlencoded','token':token}
})
export default request;