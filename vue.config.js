const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
 //  publicPath: '/test/',  // 设置部署应用包时的基本URL
  publicPath: process.env.NODE_ENV === 'production' ? '/test/' : './', // 开发环境与生产环境的区分
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  // devServer: {
  //   port: '1111',
  //   lintOnSave: true, // 在保存时校验格式
  //   // proxy: 'http://localhost:8080'  //告诉开发服务器将任何未知请求 (没有匹配到静态文件的请求) 代理到http://localhost:8080。
  //   proxy: {
  //     '/api': {
  //       //要访问的跨域的域名
  //       target: 'http://localhost:8080',
  //       ws: true, // 是否启用websockets
  //       secure:false, // 使用的是http协议则设置为false，https协议则设置为true
  //       changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
  //       pathRewrite: {
  //           '^/api': ''
  //       }
  //     }
  //   }
  // },
  pages:{
    index: {
      // page 的入口
      entry: 'examples/main.js',
      // 模板来源
      template: 'public/index.html',
      // 输出文件名
      filename: 'index.html'
    }
  },
  chainWebpack: config => {
    /* 自动导入公共文件*/
    // const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    // types.forEach(
    //   type => addStyleResource(config.module.rule('scss').oneOf(type))
    // )

    /* 添加别名*/
    config.resolve.alias
      .set('@title', resolve ('src/assets/commonPublic/title.vue'))
  }
}

