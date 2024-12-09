import request from '@/utiles/request';
export function loginCheck(userid){
    return request.get('/user/info',{params:{userid}})
}