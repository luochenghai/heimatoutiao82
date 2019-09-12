import Vue from 'vue'
import Router from 'vue-router'

// 1.0引人主页和登录页的路由组件
import Home from './views/home'
import Login from './views/login'
import Main from './views/home/main'
import Notfindpage from './views/404.vue'

// 二级组件不需要在这里在引入
// import './views/comment/index.vue'
// import './views/material/index.vue'
// import './views/artiles/index.vue'

Vue.use(Router)

export default new Router({
  // 1.1注册路由表
  routes: [
    {
      path: '*',
      component: Notfindpage
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/home' // 强行指向home组件
    },
    {
      path: '/home',
      component: Home,

      children: [{
        path: '', // 默认的二级路由  的地址 path为空串
        component: Main
      },
      {
        path: 'comment', // 前面不加
        component: () => import('./views/comment')
      },
      {
        path: 'material', // 前面不加/
        component: () => import('./views/material')
      },
      {
        path: 'articles', // 前面不加/
        component: () => import('./views/articles')
      },

      {
        path: 'publish', // 前面不加/
        component: () => import('./views/publish')
      },
      {
        // 修改文章
        path: 'publish/:articleId', // 定义动态路由参数
        component: () => import('./views/publish')
      },
      {
        // 账户管理
        path: 'account', // 定义动态路由参数
        component: () => import('./views/account')
      }

      ]

    }

    // {
    //    route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
