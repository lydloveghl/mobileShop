import {createRouter,createWebHashHistory} from 'vue-router'

const routes = [
    {path:'/',redirect:'/index'},
    {path:'/index',component:() => import('@/views/index/Index.vue')},
    {path:'/category',component:() => import('@/views/category/Category.vue')},
    {path:'/cart',component:() => import('@/views/cart/Cart.vue')}
]
const router = createRouter({
    history:createWebHashHistory(),
    routes
})
export default router