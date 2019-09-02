import Vue from 'vue'
import App from './App.vue'
// import router from './router'  // 对router做了处理后 引入permision
import router from './permission'
// 1.0
import ElementUI from 'element-ui' // 引入element-UI ;
import 'element-ui/lib/theme-chalk/index.css'// 引入element-ui ces样式;

// 2.0  引入通信用的axios,并添加到Vue.prototype 原型上
// import axios from 'axios' // 添加到vue 的原型上(在axios.config.js 中加入了axios 拦截器，将token放入请求头中了)

import axios from './utils/axios.config'
// 引入自定义插件
import Component from './components'
// 统一放在axios.config.js 中处理
// Axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值基础地址
// Vue.prototype.$axios = axios

// 1.1使用
Vue.use(ElementUI)
Vue.use(Component)
Vue.use(axios)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
