import router from './router'
import 'maz-ui/styles' // or import 'maz-ui/css/main.css'
import '@/assets/reset.css'
import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/base.css'
import { Icon } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { createPinia } from 'pinia'
import { Col, Row } from 'vant';

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Icon)
app.use(Col)
app.use(Row)
app.mount('#app')
