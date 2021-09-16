import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import SightList from "../views/sight/SightList.vue";
import SightDetail from "../views/sight/SightDetail.vue";
import SightInfo from "../views/sight/SightInfo.vue";
import SightComment from "../views/sight/SightComment.vue";
import SightImage from "../views/sight/SightImage.vue";
import AccountLogin from "../views/accounts/Login.vue";
import AccountRegister from "../views/accounts/Register.vue";
import Mine from "../views/accounts/Mine.vue";
import OrderSubmit from "../views/order/Submit.vue";
import OrderPay from "../views/order/OrderPay.vue";
import OrderList from "../views/order/OrderList.vue";

Vue.use(VueRouter);

const routes = [
  // 首页
  {
    path: "/",
    name: "Home",
    component: Home
  },
  // 景点列表
  {
    path: "/sight/list",
    name: "SightList",
    component: SightList
  },
  // 景点搜索
  {
    path: "/search",
    name: "Search",
    component: Search
  },
  // 景点详情
  {
    path: "/sight/detail/:id",
    name: "SightDetail",
    component: SightDetail
  },
  // 景点介绍
  {
    path: "/sight/info/:id",
    name: "SightInfo",
    component: SightInfo
  },
  // 景点评论
  {
    path: "/sight/comment/:id",
    name: "SightComment",
    component: SightComment
  },
  // 景点图片
  {
    path: "/sight/image/:id",
    name: "SightImage",
    component: SightImage
  },
  // 用户登录
  {
    path: "/accounts/login",
    name: "AccountLogin",
    component: AccountLogin
  },
  // 用户注册
  {
    path: "/accounts/register",
    name: "AccountRegister",
    component: AccountRegister
  },
  // 个人中心
  {
    path: "/mine",
    name: "Mine",
    component: Mine
  },
  // 提交订单
  {
    path: "/order/submit/:id",
    name: "OrderSubmit",
    component: OrderSubmit
  },
  // 确定订单并支付
  {
    path: "/order/pay/:sn",
    name: "OrderPay",
    component: OrderPay
  },
  // 我的订单列表
  {
    path: "/order/list/:status",
    name: "OrderList",
    component: OrderList
  }
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  routes
});

// router.beforeEach(async(to, from, next) => {
//   if (to?.meta?.is_login && !window.localStorage.getItem("token")) {
//     window.alert("未登录，即将跳转到登录页面");
//     return next("/accounts/login");
//     // return next();
//   }
//   // next();
//   return next();
// });

export default router;
