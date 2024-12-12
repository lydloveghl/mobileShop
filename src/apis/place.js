import request from "@/utiles/request";
export function getPlaceList(userid){
    return request.get('/address/list',{params:{userid}})
}