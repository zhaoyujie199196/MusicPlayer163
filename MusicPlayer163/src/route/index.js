import { createRouter, createWebHashHistory} from 'vue-router'

//router路由：https://vue3.chengpeiquan.com/router.html
const home =()=>import('../views/home.vue')

//声明路由记录
const routes = [
    { path: "/", redirect:"/home" },
    { path: '/home', name: "home", component: home }
]

//创建路由
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})



