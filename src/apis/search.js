import request from '@/utiles/request'
export function hotSearch(){
    return request.get('/pro/hotword')
}