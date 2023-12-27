import { createApp } from 'vue'
import { router } from './route'
import App from './App.vue'
import './assets/main.css'
import 'virtual:svg-icons-register'
import '@/assets/global.scss'
import SvgIcon from '@/components/SvgIcon.vue'

const app = createApp(App)
app.use(router)  //使用路由
app.component('svg-icon', SvgIcon)
app.mount('#app')
