import request from "@/utiles/request";
export function phoneCheck(tel){
    return request.post('/user/docheckphone',{tel})
}
export function codeCheck(tel,telcode){
    return request.post('/user/docheckcode',{tel,telcode})
}
export function register(tel,password){
    return request.post('/user/dofinishregister',{tel,password})
}