import request from '@/utiles/request'
export function getSecKill(count,limitNum){
    return request.get('/pro/seckilllist',{params:{count,limitNum}})
}
export function getGoodsList(count,limitNum){
    return request.get('/pro/list',{params:{count,limitNum}})
}