// 项目中api接口较多时，需要对他们进行统一管理，放在一个文件中
import requests from './requests.js'
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })
