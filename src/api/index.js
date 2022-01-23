// 项目中api接口较多时，需要对他们进行统一管理，放在一个文件中
import requests from './ajax.js'
import mockRequests from './mockAjax'
// 分别暴露
// home路由组件
// 获取商品列表的请求
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')
// 获取轮播图的 mock模拟请求
export const reqBannerList = () => mockRequests.get('/banner')
// 获取楼层数据的 mock模拟请求
export const reqFloorList = () => mockRequests.get('/floor')

// search路由组件
// 获取搜索信息的请求，发送请求时params至少要是一个 空对象“{}”，否则会失败
export const reqSearchInfo = (params) => requests.post('/list', params)

// detail路由组件
// 通过商品ID获取商品详情
export const reqGoodsInfo = (skuId) => requests.get(`/item/${skuId}`)

// 向购物车添加商品、修改商品数量
export const reqAddCart = (skuId, skuNum) => requests.post(`/cart/addToCart/${skuId}/${skuNum}`)

// shopCart路由组件
// 获取购物车中列表信息
export const reqShopCartList = () => requests.get('/cart/cartList')

// shopCart路由组件
// 删除某件商品
export const reqDeleteGoods = (skuId) => requests.delete(`/cart/deleteCart/${skuId}`)
// 切换商品选中状态
export const reqCheckedState = (skuId, isChecked) => requests.get(`/cart/checkCart/${skuId}/${isChecked}`)

// register路由组件
// 获取验证码
export const reqCode = (phone) => requests.get(`/user/passport/sendCode/${phone}`)
// 完成注册
export const reqRegister = (data) => requests.post('/user/passport/register', data)

// login路由组件
// 登录
export const reqLogin = (data) => requests.post('/user/passport/login', data)
// 登录后获取用户信息填充到 header中
export const reqUserInfo = () => requests.get('/user/passport/auth/getUserInfo')

// header组件
// 退出登录
export const reqLogout = () => requests.get('/user/passport/logout')

// trade组件
// 获取订单交易页用户地址信息
export const reqUserAddressList = () => requests.get('/user/userAddress/auth/findUserAddressList')
// 获取订单商品信息
export const reqOrderInfo = () => requests.get('/order/auth/trade')
// 提交订单，需要将商品列表、用户姓名、电话、收件地址、订单编号发送给服务器
export const reqSubmitOrder = (tradeNo, data) => requests.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data)

// pay组件
// 根据 路径中query参数的orderId 获取支付信息
export const reqPayInfo = (orderId) => requests.get(`/payment/weixin/createNative/${orderId}`)
// 获取订单支付状态
export const reqPayStatus = (orderId) => requests.get(`/payment/weixin/queryPayStatus/${orderId}`)

// center组件
// 获取个人中心 我的订单
export const reqMyOrderList = (page, limit) => requests.get(`/order/auth/${page}/${limit}`)
