// 项目中api接口较多时，需要对他们进行统一管理，放在一个文件中
import requests from './ajax.js'
import mockRequests from './mockAjax'
// 分别暴露
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')
export const reqBannerList = () => mockRequests.get('/banner')
export const reqFloorList = () => mockRequests.get('/floor')
