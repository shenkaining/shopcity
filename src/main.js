import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'

// 引入运行 mockServer.js
import '@/mock/mockServer.js'

// 引入swiper轮播图的样式
import 'swiper/css/swiper.min.css'

Vue.component(TypeNav.name, TypeNav)
// 全局注册轮播图组件
Vue.component(Carousel.name, Carousel)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
