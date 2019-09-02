import Vue from 'vue'
import Router from 'vue-router'

// 1.0引人主页和登录页的路由组件
import Home from './views/home/index.vue'
import Main from './views/home/main.vue'
import Login from './views/login/index.vue'

Vue.use(Router)

export default new Router({
  // 1.1注册路由表
  routes: [
    {
      path: '/',
      redirect: '/home' // 强行指向home组件
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [{
        path: '', // 默认的二级路由  的地址 path为空串
        component: Main
      }]

    }

    // {
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
