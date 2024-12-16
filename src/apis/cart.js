import request from "@/utiles/request";
export function addCart(userid,proid,num){
    return request.post('/cart/add',{userid,proid,num})
}
export function getCart(userid){
    return request.post('/cart/list',{userid})
}
export function changeFlag(cartid,flag){
    return request.post('/cart/selectone',{cartid,flag})
}
export function changeCartNum(cartid,num){
    return request.post('/cart/updatenum',{cartid,num})
}
export function removeCart(cartid){
    return request.post('/cart/remove',{cartid})
}
export function isAll(userid,type){
    return request.post('/cart/selectall',{userid,type})
}