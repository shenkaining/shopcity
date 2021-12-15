import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Regist from '@/views/Regist'
import Search from '@/views/Search'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { showFooter: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { showFooter: false }
  },
  {
    path: '/regist',
    name: 'regist',
    component: Regist,
    meta: { showFooter: false }
  },
  {
    path: '/search/:keyword?', // params占位使用 ? 代表可传可不传
    name: 'search',
    component: Search,
    meta: { showFooter: true }
  }
]
// 将在原型上的 push 方法先备份一下
const originPush = VueRouter.prototype.push
// console.log(originPush)
// 再对 push方法进行修改
// 判断函数中 resolve和reject回调是否为真，为真就调用，不为真就在每次调用push方法时加上两个回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}
const router = new VueRouter({
  routes
})

export default router
