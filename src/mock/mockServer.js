// 引入 Mock对象
import Mock from 'mockjs'
// 导入 banner.json、floor.json文件中数据，json文件是默认暴露的
import banner from './banner.json'
import floor from './floor.json'

// 调用Mock对象中mock()方法，第一个参数为：模拟服务器的接口，第二个参数为：模拟响应成功返回对象
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })
