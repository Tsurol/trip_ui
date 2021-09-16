// module.exports表示node.js中的模块
module.exports = {
  // 例如要访问http://localhost:8080/api/system/slider/list/ => 代理http://127.0.0.1:8000/system/slider/list/
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
