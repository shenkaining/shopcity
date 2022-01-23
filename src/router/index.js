import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由规则
import routes from './routes'
// 引入 user仓库
import store from '@/store'

Vue.use(VueRouter)

// 编程式导航$router.push/$router.replace 连续多次点击会在控制台报错
// 编程式导航结果是Promise，需要加上 resolve、reject回调
// 将在原型上的 push 方法先备份一下
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// console.log(originPush)
// 再对 push/replace 方法进行修改
// 判断函数中 resolve和reject回调是否为真，为真就调用，不为真就在每次调用push方法时加上两个回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => {}, () => {})
  }
}
const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    // 路由跳转后滚动条在最顶部
    return { y: 0 }
  }
})

// 全局导航守卫
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  const name = store.state.user.userInfo.name
  // console.log(store)
  if (token) {
    // token 为真，代表用户已登录，路由不应该能跳转到 login/register
    if (to.path === '/login' || to.path === '/register') {
      // 登录后如果要跳转到登录页面/注册页面，就会定向跳转到首页
      next('/home')
    } else {
    // 如果要跳转到其他页面都会放行
      next()
    }

    // token为真，那每次路由跳转都应该获取 用户信息并存入仓库
    if (name) {
      // name为真，代表仓库中已经有用户信息，可以直接放行
      next()
    } else {
      // name为假，仓库中就没有用户信息，要派发actions，向服务器请求信息
      try {
        // 派发请求
        await store.dispatch('user/getUserInfo') // 这里派发actions 需要引入 整个store仓库
        // 请求成功后放行
        next()
      } catch (error) {
        // 这里token为真但请求失败，代表token过期失效了，需要退出登录
        await store.dispatch('user/userLogout') // 这里派发actions 需要引入 整个store仓库
        // 跳转到登录页
        next('/login')
      }
    }
  } else {
    // token为假，代表用户未登录
    // 未登录的状态下不能前往 订单页（trade）、支付页（pay|paySuccess）、个人中心（center）
    const toPath = to.path
    // 当目标路由的路径中包含这些字符串，就会跳转到登录页
    if (toPath.indexOf('trade') !== -1 || toPath.indexOf('pay') !== -1 || toPath.indexOf('center') !== -1) {
      // 将想要前往的路由地址以query参数的形式绑定在lgoin后面，一登录成功就跳转到想要前往的路由
      next('/login?redirect=' + toPath)
    } else {
      next()
    }
  }
})

export default router
