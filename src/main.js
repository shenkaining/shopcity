import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/pagination'
// 引入vue-lazyload
import VueLazyload from 'vue-lazyload'
// 引入懒加载的图片
import lazyImg from '@/assets/images/load.jpg'
// 统一引入 api.js中所有接口
import * as API from '@/api'
// 按需引入 elementUI
import { Button, MessageBox } from 'element-ui'
// 引入运行 mockServer.js
import '@/mock/mockServer.js'
// 引入swiper轮播图的样式
import 'swiper/css/swiper.min.css'
import myPlugins from './utils/myPlugins'
// 引入配置后的vee-validate文件
import '@/utils/validate.js'

// 全局注册elementUI组件
Vue.component(Button.name, Button)
// 还可以将 element-ui组件挂载到vue原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
// 全局注册商品列表
Vue.component(TypeNav.name, TypeNav)
// 全局注册轮播图组件
Vue.component(Carousel.name, Carousel)
// 全局注册分页器
Vue.component(Pagination.name, Pagination)
// 使用 懒加载插件,配置懒加载默认显示的图片
Vue.use(VueLazyload, {
  loading: lazyImg
})
Vue.use(myPlugins, {
  name: 'zidingyi'
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate () {
    // 绑定全局事件总线
    Vue.prototype.$bus = this
    // 将所有api方法绑定到 Vue原型上，所有组件都可以调用
    Vue.prototype.$API = API
  },
  render: (h) => h(App)
}).$mount('#app')
