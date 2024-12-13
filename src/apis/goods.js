import request from "@/utiles/request";
export function getGoodsDetail(proid){
    return request.get('/pro/detail/'+proid)
}
export function getRecommendGoods(count,limitNum){
    return request.get('/pro/recommendlist',{params:{count,limitNum}})
}