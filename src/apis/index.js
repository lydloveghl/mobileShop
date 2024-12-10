import request from '@/utiles/request'
export function getSecKill(count,limitNum){
    return request.get('/pro/seckilllist',{params:{count,limitNum}})
}