// vue.config.js
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  //项目根路径(不要与axios的baseURL混),
  /**相当于webpack.base.conf.js里边的publicPath*/
  // publicPath: process.env.NODE_ENV === 'production' ? '/bjdiantai/' : '/',
  //需要根据实际项目的后台文件路径设置，涉及到页面css、js的文件加载路径，/则为后台根路径
  //可以为相对路径'./'，这样所有资源都会按照相对路径来读取，根据实际项目设置
  publicPath: '/',
  //打包输出文件夹,默认dist
  outputDir: 'dist',

  //配置代理、端口等配置操作
  devServer: {
    open: true, // 是否自动打开浏览器页面
    host: '0.0.0.0', // 指定使用一个 host。默认是 localhost, 0.0.0.0可以被其他电脑访问，以ip形式出现
    hot: true, //热更新
    port: 9000, // 端口地址
    https: false, // 使用https提供服务
    //代理配置
    /* proxy: {
      '/DataCenter': {
        target: 'http://192.168.1.87:18091/rbc', // 接口的域名
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/DataCenter': ''
        }
      } */

    //... 支持所有的 webpack-dev-server中的其它选项
  },
  //路径别名
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('static', resolve('src/static'))
      .set('common', resolve('src/common'))
      .set('style', resolve('src/common/style'))
  }
}