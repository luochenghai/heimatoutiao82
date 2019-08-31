import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 1.0
import ElementUI from 'element-ui' // 引入element-UI ;
import 'element-ui/lib/theme-chalk/index.css'// 引入element-ui ces样式;

// 2.0  引入通信用的axios,并添加到Vue.prototype 原型上
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值基础地址
Vue.prototype.$axios = axios // 添加到vue 的原型上

// 1.1使用
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
