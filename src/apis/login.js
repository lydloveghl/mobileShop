import request from '@/utiles/request';
export function loginCheck(userid){
    return request.get('/user/info',{params:{userid}})
}
export function sendCode(phoneNumber){
    return request.post('/user/dosendmsgcode',{tel:phoneNumber})
}
export function login(loginname,password){
    return request.post('/user/login',{loginname,password})
}