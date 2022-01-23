module.exports = {
  // 生产模式打包 不生成map文件
  productionSourceMap: false,
  // 关闭eslint校验
  lintOnSave: false,
  // 代理服务器，解决跨域请求
  devServer: {
    proxy: {
      '/api': { // 前缀，加了前缀就不会匹配前端资源了
        target: 'http://39.98.123.211', // 代理目标的基础路径
        // pathRewrite: { '^/api': '' }, // 因为路径包含 /api 所以不用重写
        ws: true, // 用于支持 websocket
        changeOrigin: true // 用于欺骗 被请求的服务器 原来请求头中host为 localhost:8080，但服务器收到的是 localhost:5000
      }
    }
  }
}
