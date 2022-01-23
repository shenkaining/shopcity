// 自定义插件
// 输出的必须是一个对象
const myPlugins = {}

// 一旦 Vue.use(myPlugins) 就会调用对象中的 install方法
myPlugins.install = function (Vue, option) { // 接收到的第一个形参为Vue，第二个形参为 use()传过来的配置项
  // console.log(option)
  // Vue.component()
  // Vue.filter()
  // Vue.prototype.$bus
  // ....  这些方法都可以在这使用
  // 配合Vue自定义指令
  Vue.directive(option.name, (element, params) => {
    // element代表使用自定义指令的元素、params代表存有/v-指令="参数"/参数的对象
    element.innerHTML = params.value.toUpperCase()
  })
}

export default myPlugins
