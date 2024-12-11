import axios from "axios";

// 获取用户信息并解析，增加错误处理
/* let user, token;
try {
    user = JSON.parse(localStorage.getItem('user')) || {};
    token = user.token || '';
} catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    user = {};
    token = '';
} */

// 创建axios实例
const request = axios.create({
    baseURL: 'http://121.89.205.189:3000/api',
    headers: {
        "Content-Type": 'application/x-www-form-urlencoded'
    }
});

// 添加请求拦截器
request.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        const updatedUser = JSON.parse(localStorage.getItem('user')) || {};
        const updatedToken = updatedUser.token || '';

        // 更新请求头中的 token
        config.headers['token'] = updatedToken;

        console.log("Request Config with updated token:", config);
        return config;
    },
    error => {
        // 对请求错误做些什么
        console.error("Request Error:", error);
        return Promise.reject(error);
    }
);

export default request;
