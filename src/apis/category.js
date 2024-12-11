import request from '@/utiles/request'
export function getCategoryList(){
    return request.get('/pro/categorylist')
}
export function getCategoryBrand(category){
    return request.get('/pro/categorybrandlist',{params:{category}})
}