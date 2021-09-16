import axios from "axios";
// 创建axios实例
export const ajax = axios.create({
  // 自定义请求头
  headers: {
    // source: "h5",
    // icode: "JEBC09D9C496B7D3D",
    "Content-Type": "application/json"
  },
  // 默认携带上次的cookie
  withCredentials: true
});

// 在请求发出之前进行拦截
ajax.interceptors.request.use(
  function(config) {
    // 在发送请求前做些什么
    console.log("请求拦截到了");
    // 加载loading动画
    window.app.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner"
    });
    return config;
  },
  function(error) {
    // 对请求错误做什么
    // 清除loading动画
    window.app.$toast.clear();
    return Promise.reject(error);
  }
);

ajax.interceptors.response.use(
  function(response) {
    // 对响应数据做些什么
    console.log("响应拦截到了");
    window.app.$toast.clear();
    return response;
  },
  function(error) {
    if (error.response) {
      // 对错误响应做点什么
      // 统一的错误处理
      if (error.response.status === 401) {
        window.app.$notify({
          message: "未登录，已跳转到登录页面",
          type: "danger"
        });
        window.app.$router.replace({name: "AccountLogin"});
      } else if (error.response.status === 500) {
        // window.alert("服务器正忙，请稍后重试");
        window.app.$notify({
          message: "服务器正忙，请稍后重试",
          type: "danger"
        });
      }
    }
    window.app.$toast.clear();
    return Promise.reject(error);
  }
);
