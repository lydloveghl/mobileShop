import request from "@/utiles/request";
export function getGoodsDetail(proid){
    return request.get('/pro/detail/'+proid)
}