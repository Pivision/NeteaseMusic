import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/main/index.vue'
import Home from '../views/home/index.vue'
import Search from '../views/search/index.vue'
import Play from '../views/play/index.vue'
import List from '../views/list/index.vue'
import NoFound from '../views/no_found/index.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        // 重定向
        redirect: '/main',
    },
    {
        path: '/main',
        name: 'Main',
        redirect: '/main/home',
        component: Main,
        children: [
            {
                path: 'home',
                name: 'Home',
                component: Home,
            },
            {
                path: 'search',
                name: 'Search',
                component: Search
            },
        ]
    },
    {
        path: '/play/:id',
        name: 'Play',
        component: Play
    },
    {
        path: '/list/:id',
        name: 'List',
        component: List
    },
    {
        path: '*',
        component: NoFound
    }
]

const router = new VueRouter({
    routes
})

export default router
