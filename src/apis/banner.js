import request from '@/utiles/request'
export function getBanner(){
    return request.get('/banner/list')
}