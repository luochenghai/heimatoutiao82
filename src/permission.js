/** ************************前置导航守卫****************************/
// 本质：在这里单独导入这个router之后，在router里面加入限制条件，在将其导出，在main.js中用permision 替换掉 router
import router from './router'

// 路由发生变化时的进度条
// 引入nprogress
import nprogress from 'nprogress'
// 引入nprogress 的样式文件
import 'nprogress/nprogress.css'
router.beforeEach(function (to, from, next) {
  nprogress.start() // 开启进度条
  // 如果要去的地址以/home 为开始，就需要判断当前是不是登录 状态 判断token 是否存在
  if (to.path.startsWith('/home')) {
    // 获取token
    let token = window.localStorage.getItem('user-token')
    if (token) {
      // token 存在，放行
      next()
    } else {
      next('/login')
    }
  } else {
    // 不是以/home 开头的不用管它，放行
    next()
  }
})

// 后置守卫
router.afterEach(function () {
  nprogress.done() // 结束进度条
})

// 导出router
export default router
