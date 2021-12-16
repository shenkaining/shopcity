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
