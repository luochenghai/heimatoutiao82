import axios from 'axios'
import router from '../permission'
import { Message } from 'element-ui'

// 引入json-bigint包
import jsonBigInt from 'json-bigint'
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值基础地址/** ***************黑马头条PC-接口访问-axios拦截器-统一处理请求token*****************/
// da4
axios.defaults.transformResponse = [function (data) {
  // 对 data 进行任意转换处理
  return data ? jsonBigInt.parse(data) : {}
}]
// 请求拦截
axios.interceptors.request.use(function (config) {
  // config 是axios 的默认请求配置 和 传入的配置的  结合出来的
  // 必须将config 如return 出去
  // 返回去之前，将token 加进去
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}`

  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  // 异常统一处理
  // 先获取错错误装态
  let status = error.response.status
  let message = ''

  switch (status) {
    case 400:
      message = '请求参数错误'
      break

    case 403:
      message = '用户非实名认证用户，无权登录'
      break

    case 507:
      message = '服务器或数据库异常'
      break

    case 404:
      message = '手机号不正确'
      break
    case 401:
      window.localStorage.clear() // token 可能过期了 清楚垃圾
      router.push('/login')
      break

    default:
      message = '未知错误'
      break
  }
  Message({ type: 'warning', message })
  // 如果 在异常函数里处理错误 但是没有将当前的错误给截止掉, 那么依然不会进入到then,还需要catch捕获
  return new Promise(function () { })// 直接返回一个promise对象，表示错误已经被处理掉
})

// 导出的是 是一个对象，在main.js 中可以通过 Vue.sue()的方式使用
export default {
  install: function (Vue) {
    axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值基础地址
    Vue.prototype.$axios = axios // 给vue 的原型属性 赋值
  }

}
