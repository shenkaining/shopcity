import axios from 'axios'
// 引入 nprogress进度条插件
import nprogress from 'nprogress'
// 还需要引入进度条的样式
import '../../node_modules/nprogress/nprogress.css'
// 引入包含 uuid 的仓库
import { detail } from '@/store/detail'
// 引入包含用户登录token的仓库
import user from '@/store/user'

// 对 axios 二次封装
const requests = axios.create({
  // 配置基础路径
  baseURL: '/api',
  // 请求超时时间5s
  timeout: 5000
})

// 请求拦截,在发送请求前触发，可以进行一些操作
requests.interceptors.request.use((config) => {
  // 在请求拦截器中开始进度条
  nprogress.start()
  // 配置请求头，将游客临时uuid加入请求头发送给后端
  // 请求头为键值对格式，命名必须和后端保持一致
  if (detail.state.uuid) {
    config.headers.userTempId = detail.state.uuid
  }
  // token校验
  if (user.state.token) {
    config.headers.token = user.state.token
  }
  // 参数config：配置对象，其中有一个很重要的属性，请求体header
  return config
})
// 响应拦截
requests.interceptors.response.use((res) => {
  // 在响应拦截器中结束进度条
  nprogress.done()
  // console.log(res)
  // 响应成功的回调
  return res.data
}, (error) => {
  // 响应失败的回调，使用reject结束回调并抛出错误
  return Promise.reject(error)
})
export default requests
