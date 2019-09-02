/** *********************全局注册，在main.js中引入使用*****************************/

// index.js建在components 文件下
import layoutAside from './home/layout-aside.vue'
import layoutHeader from './home/layout-header.vue'
// 所有自定义插件
export default {
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
  }
}
