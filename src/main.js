import router from './router'
import '@/assets/reset.css'
import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/base.css'
import { Tabbar, TabbarItem } from 'vant';
const app = createApp(App)
app.use(router)
app.use(Tabbar)
app.use(TabbarItem)
app.mount('#app')
