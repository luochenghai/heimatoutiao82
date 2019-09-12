/** *********************全局注册，在main.js中引入使用*****************************/

// index.js建在components 文件下
import layoutAside from './home/layout-aside.vue'
import layoutHeader from './home/layout-header.vue'

// day3 引入面包屑组件
import breadCrumb from './common/bread-crumb.vue'

// require styles 注册富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 引入富文本编辑器   quillEditor  这个名字不能随便改，哟用人家推荐的
import { quillEditor } from 'vue-quill-editor'

// 引入 自定义组件
import coverImage from '../components/publish/cover-image'
import selectImage from '../components/publish/select-image'

// 所有自定义插件的注册
export default {
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('quill-editor', quillEditor)
    Vue.component('cover-image', coverImage)
    Vue.component('select-image', selectImage)
  }
}
