import {createRouter,createWebHashHistory} from 'vue-router'

const routes = [
    {path:'/',redirect:'/index'},
    {path:'/index',components:{
        default:() => import('@/views/index/Index.vue'),
        footer:() => import('@/components/FooterNav.vue')
    }},
    {path:'/index/search',components:{
        default:() => import('@/views/index/Search.vue'),
    }},
    {path:'/category',components:{
        default:() => import('@/views/category/Category.vue'),
        footer:() => import('@/components/FooterNav.vue')
    }},
    {path:'/cart',components:{
        default:() => import('@/views/cart/Cart.vue'),
        footer:() => import('@/components/FooterNav.vue')
    }},
    {path:'/login',components:{
        default:() => import('@/views/login/Login.vue')
    }},
    {path:'/register',components:{
        default:() => import('@/views/register/register.vue')
    }},
    {path:'/detail/:proid',name:'detail',components:{
        default:() => import('@/views/goods/Detail.vue')
    }}
]
const router = createRouter({
    history:createWebHashHistory(),
    routes
})
export default router