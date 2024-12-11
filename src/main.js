import router from './router'
import 'maz-ui/styles' // or import 'maz-ui/css/main.css'
import '@/assets/reset.css'
import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/base.css'
import { Icon,List,Button,Col,Row,Tabbar,TabbarItem,BackTop,Toast,showFailToast,showSuccessToast} from 'vant';
import { createPinia } from 'pinia'
import { Swiper, SwiperItem,PullRefresh,Category, CategoryPane} from '@nutui/nutui'
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(Tabbar)
app.use(showSuccessToast)
app.use(Button)
app.use(TabbarItem)
app.use(Icon)
app.use(Col)
app.use(Row)
app.use(Swiper)
app.use(SwiperItem)
app.use(PullRefresh)
app.use(List)
// app.use(Backtop)
app.use(BackTop)
app.use(Category)
app.use(CategoryPane)
app.use(Toast)
app.use(showFailToast)
app.mount('#app')
