
export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home'),
    meta: { showFooter: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: { showFooter: false }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register'),
    meta: { showFooter: false }
  },
  {
    path: '/search/:keyword?', // params占位使用 ? 代表可传可不传
    name: 'search',
    component: () => import('@/views/Search'),
    meta: { showFooter: true }
  },
  {
    path: '/detail/:skuId',
    name: 'detail',
    component: () => import('@/views/Detail'),
    meta: { showFooter: true }
  },
  {
    path: '/addCartSuccess',
    name: 'addCartSuccess',
    component: () => import('@/views/AddCartSuccess'),
    meta: { showFooter: true }
  },
  {
    path: '/shopCart',
    name: 'shopCart',
    component: () => import('@/views/ShopCart'),
    meta: { showFooter: true }
  },
  {
    path: '/trade',
    name: 'trade',
    component: () => import('@/views/Trade'),
    meta: { showFooter: true },
    // 订单结算页面 只能从购物车shopCart进入
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path === '/shopCart') {
        next()
      } else {
        // 不是从shopCart跳转，就停留在原路由
        next(false)
      }
    }
  }, {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/Pay'),
    meta: { showFooter: true },
    // 支付页面 只能从订单结算页面trade进入
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') {
        next()
      } else {
        // 不是从shopCart跳转，就停留在原路由
        next(false)
      }
    }
  }, {
    path: '/paySuccess',
    name: 'paySuccess',
    component: () => import('@/views/PaySuccess/'),
    meta: { showFooter: true }
  }, {
    path: '/center',
    name: 'center',
    redirect: '/center/myorder',
    component: () => import('@/views/Center'),
    meta: { showFooter: true },
    children: [{
      path: 'myorder',
      name: 'myorder',
      component: () => import('@/views/Center/MyOrder')
    }, {
      path: 'grouporder',
      name: 'grouporder',
      component: () => import('@/views/Center/GroupOrder')
    }]
  }
]
