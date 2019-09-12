import Vue from 'vue'
import App from './App.vue'
// import router from './router'  // 对router做了处理后 引入permision
import router from './permission'
// 1.0
import ElementUI from 'element-ui' // 引入element-UI ;
import Component from './components' // 引入所有自定义组件
import 'element-ui/lib/theme-chalk/index.css'// 引入element-ui ces样式;
import './style/index.less' // 引入初始化样式 包括 margin padding li
// 2.0  引入通信用的axios,并添加到Vue.prototype 原型上
// import axios from 'axios' // 添加到vue 的原型上(在axios.config.js 中加入了axios 拦截器，将token放入请求头中了)

import axios from './utils/axios.config'

// 统一放在axios.config.js 中处理
// Axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值基础地址
// Vue.prototype.$axios = axios
Vue.config.productionTip = false // vscode 提示的浏览器生产环境提示
// 1.1使用
Vue.use(ElementUI) // 全局注册elementUI组件 任意位置都可以使用
Vue.use(Component) // 全局注册自定义组件
Vue.use(axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
